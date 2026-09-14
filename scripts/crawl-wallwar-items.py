from __future__ import annotations

import json
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from wiki_lang import strip_format, ts_string, ts_string_list, write_ts_array

DATAPACK = Path(r"d:\minecraft\.minecraft\versions\1.21.11-Fabric 0.18.2\saves\战墙\datapacks\wallwar")
WEBSITE = Path(__file__).resolve().parents[1]
RECIPE_DIR = DATAPACK / "data/wallwar/recipe"
LOOT_DIR = DATAPACK / "data/wallwar/loot_table"
OUT = WEBSITE / "src/data/wiki/wallwarItems.ts"

CATEGORIES = {
    "mine": "采矿",
    "farm": "农业",
    "axe": "伐木",
    "fish": "渔业",
    "build": "建筑",
    "head": "猎头",
    "hunter": "猎人",
    "boss": "BOSS",
    "spawn": "召唤",
    "ride": "坐骑",
    "wither": "凋灵",
    "misc": "杂项",
    "dismantle": "拆解",
}

SKIP_LORE = {
    "在主手时：",
    "在副手时：",
    "装备时：",
    "手持时：",
}

SKIP_LORE_RE = re.compile(r"^\s*[\d.]+\s+攻击(伤害|速度)\s*$")


def load_json(path: Path) -> object | None:
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError):
        return None


def text_of(node: object) -> str:
    if isinstance(node, str):
        return strip_format(node).strip()
    if isinstance(node, dict):
        for key in ("translate", "text"):
            value = node.get(key)
            if isinstance(value, str):
                return strip_format(value).strip()
    return ""


def components_of(item: object) -> dict:
    if not isinstance(item, dict):
        return {}
    components = item.get("components")
    if isinstance(components, dict):
        return components
    return {}


def extract_from_components(components: dict) -> tuple[str, list[str]]:
    name = text_of(
        components.get("minecraft:item_name")
        or components.get("item_name")
        or components.get("minecraft:custom_name")
        or components.get("custom_name")
    )
    lore: list[str] = []
    raw = components.get("minecraft:lore") or components.get("lore") or []
    if isinstance(raw, list):
        for line in raw:
            text = text_of(line)
            if not text or text in SKIP_LORE or SKIP_LORE_RE.match(text):
                continue
            if text not in lore:
                lore.append(text)
    return name, lore


def walk_named_items(node: object) -> list[tuple[str, list[str]]]:
    found: list[tuple[str, list[str]]] = []
    if isinstance(node, dict):
        components = node.get("components")
        if isinstance(components, dict):
            name, lore = extract_from_components(components)
            if name:
                found.append((name, lore))
        for value in node.values():
            found.extend(walk_named_items(value))
    elif isinstance(node, list):
        for value in node:
            found.extend(walk_named_items(value))
    return found


def category_of(relative: Path) -> str:
    top = relative.parts[0] if relative.parts else "misc"
    return CATEGORIES.get(top, "杂项")


def slug(value: str) -> str:
    cleaned = re.sub(r"[^\w\u4e00-\u9fff]+", "-", value, flags=re.UNICODE).strip("-")
    return cleaned or "item"


def main() -> int:
    if not RECIPE_DIR.is_dir():
        raise SystemExit(f"未找到数据包配方目录：{RECIPE_DIR}")

    grouped: dict[tuple[str, str], dict] = {}

    for path in sorted(RECIPE_DIR.rglob("*.json")):
        data = load_json(path)
        if not isinstance(data, dict):
            continue
        relative = path.relative_to(RECIPE_DIR)
        category = category_of(relative)
        result = data.get("result")
        name, lore = extract_from_components(components_of(result))
        if not name:
            continue
        ident = slug(str(relative.with_suffix("")).replace("\\", "/"))
        key = (name, category)
        record = grouped.setdefault(
            key,
            {
                "id": ident,
                "name": name,
                "category": category,
                "effects": [],
            },
        )
        for effect in lore:
            if effect not in record["effects"]:
                record["effects"].append(effect)

    if LOOT_DIR.is_dir():
        existing_names = {name for name, _category in grouped}
        for path in sorted(LOOT_DIR.rglob("*.json")):
            data = load_json(path)
            if data is None:
                continue
            relative = path.relative_to(LOOT_DIR)
            category = category_of(relative)
            for name, lore in walk_named_items(data):
                if name in existing_names:
                    continue
                ident = slug(f"loot-{relative.with_suffix('').as_posix()}-{name}")
                key = (name, category)
                if key in grouped:
                    continue
                grouped[key] = {
                    "id": ident,
                    "name": name,
                    "category": category,
                    "effects": lore,
                }
                existing_names.add(name)

    items_ts: list[str] = []
    for record in sorted(
        grouped.values(),
        key=lambda item: (item["category"], item["name"]),
    ):
        items_ts.append(
            "  {\n"
            f"    id: {ts_string(record['id'])},\n"
            f"    name: {ts_string(record['name'])},\n"
            f"    category: {ts_string(record['category'])},\n"
            f"    effects: {ts_string_list(record['effects'])},\n"
            "  }"
        )

    write_ts_array(OUT, "WallwarItem", "wallwarItems", "WallwarItem", items_ts)
    print(f"wrote {len(items_ts)} items -> {OUT}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
