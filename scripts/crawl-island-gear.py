from __future__ import annotations

import json
import re
import sys
from collections import defaultdict
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from wiki_lang import flatten_lang, load_yaml, lookup, ts_string, ts_string_list, write_ts_array

HG_WAR = Path(r"e:\mc\hg-war")
WEBSITE = Path(__file__).resolve().parents[1]
LANG = HG_WAR / "src/main/resources/data/hgwar/lang/zh_cn.yml"
SHOP_DIR = HG_WAR / "src/main/resources/data/hgwar/hgwar/shop_layer"
TAG_DIR = HG_WAR / "src/main/resources/data/hgwar/tags/hgwar/shop_layer"
OUT = WEBSITE / "src/data/wiki/islandGear.ts"

PLAYER_LAYERS = {
    "items_normal.json": "hgwar:items_normal",
    "items_crystal.json": "hgwar:items_crystal",
    "items_normal_solo.json": "hgwar:items_normal_solo",
    "items_basic_crystal.json": "hgwar:items_basic_crystal",
    "mini/simple.json": "hgwar:mini/simple",
}

TAG_MODE_NAMES = {
    "normal": "经典",
    "standard": "水晶",
    "forest": "森林",
    "normal_single": "单人",
    "mini_war": "MiniWar",
}

ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"]


def layer_modes() -> dict[str, list[str]]:
    mapping: dict[str, list[str]] = defaultdict(list)
    for tag_file in TAG_DIR.glob("*.json"):
        mode = TAG_MODE_NAMES.get(tag_file.stem)
        if not mode:
            continue
        data = json.loads(tag_file.read_text(encoding="utf-8"))
        for value in data.get("values", []):
            mapping[value].append(mode)
    return mapping


def upgrade_type_of(item: dict) -> str:
    explicit = item.get("upgrade_type")
    if isinstance(explicit, str) and explicit:
        return explicit
    command = str(item.get("value_command", ""))
    match = re.search(r"get\s+(\S+)", command)
    return match.group(1) if match else "unknown"


def collect_translates(node: object) -> list[str]:
    keys: list[str] = []
    if isinstance(node, dict):
        if isinstance(node.get("translate"), str):
            keys.append(node["translate"])
        for value in node.values():
            keys.extend(collect_translates(value))
    elif isinstance(node, list):
        for value in node:
            keys.extend(collect_translates(value))
    return keys


def format_costs(costs: dict, lang: dict[str, str]) -> str:
    parts: list[str] = []
    for material, amount in costs.items():
        label = lookup(lang, f"material.hgwar.{material}", str(material))
        parts.append(f"{label}×{amount}")
    return "、".join(parts) if parts else "免费"


CN_TIER = {"一": 1, "二": 2, "三": 3, "四": 4, "五": 5, "六": 6}


def roman(tier: int) -> str:
    if 1 <= tier <= len(ROMAN):
        return ROMAN[tier - 1]
    return str(tier)


def tier_from_name(name: str, fallback: int) -> int:
    match = re.search(r"[（(]([一二三四五六])阶[）)]", name)
    if match:
        return CN_TIER.get(match.group(1), fallback)
    return fallback


def extract_name_key(components: dict) -> str:
    for field in ("minecraft:custom_name", "minecraft:item_name"):
        node = components.get(field) or {}
        if isinstance(node, dict) and isinstance(node.get("translate"), str):
            return node["translate"]
    return ""


def resolve_name(lang: dict[str, str], name_key: str, upgrade_type: str, tier_num: int) -> tuple[str, int]:
    keys = []
    if name_key:
        keys.append(name_key)
        numbered = re.search(r"\.(\d+)\.name$", name_key)
        if numbered:
            tier_num = int(numbered.group(1))
    keys.extend(
        [
            f"text.hgwar.shop_layer.items_normal.{upgrade_type}.{tier_num}.name",
            f"text.hgwar.shop_layer.items_crystal.{upgrade_type}.{tier_num}.name",
            f"text.hgwar.shop_layer.items_normal_solo.{upgrade_type}.{tier_num}.name",
            f"text.hgwar.shop_layer.mini.simple.{upgrade_type}.{tier_num}.name",
        ]
    )
    for key in keys:
        value = lang.get(key)
        if value:
            return value, tier_num
    return "", tier_num


def main() -> int:
    lang = flatten_lang(load_yaml(LANG))
    modes_by_layer = layer_modes()
    grouped: dict[tuple[str, str, str], dict] = {}

    for relative, layer_id in PLAYER_LAYERS.items():
        path = SHOP_DIR / relative
        data = json.loads(path.read_text(encoding="utf-8"))
        mode_names = modes_by_layer.get(layer_id, [relative])
        for shop_item in data.get("items", []):
            if shop_item.get("type") != "dynamic_player":
                continue
            upgrade_type = upgrade_type_of(shop_item)
            for entry in shop_item.get("entries", []):
                item = entry.get("item") or {}
                costs = item.get("costs") or {}
                if not costs:
                    continue
                icon = item.get("icon") or {}
                components = icon.get("components") or {}
                name_key = extract_name_key(components)
                guessed_tier = int(entry.get("value", 0)) + 1
                name, tier_num = resolve_name(lang, name_key, upgrade_type, guessed_tier)
                if not name:
                    continue
                tier_num = tier_from_name(name, tier_num)
                lore_keys = collect_translates(components.get("minecraft:lore") or [])
                effects = [lookup(lang, key, key) for key in lore_keys if lookup(lang, key, "") not in {"", " "}]
                group_key = (upgrade_type, str(tier_num), name)
                ident = f"{upgrade_type}-{tier_num}"
                record = grouped.setdefault(
                    group_key,
                    {
                        "id": ident,
                        "name": name,
                        "tier": roman(tier_num),
                        "modes": {},
                        "effects": [],
                    },
                )
                price = format_costs(costs, lang)
                for mode in mode_names:
                    record["modes"][mode] = price
                for effect in effects:
                    if effect not in record["effects"]:
                        record["effects"].append(effect)

    # Stable unique ids when names collide on upgrade_type-tier
    seen_ids: dict[str, int] = {}
    items_ts: list[str] = []
    for (_upgrade, _tier, name), record in sorted(grouped.items(), key=lambda item: (item[0][0], int(item[0][1]), item[0][2])):
        ident = record["id"]
        seen_ids[ident] = seen_ids.get(ident, 0) + 1
        if seen_ids[ident] > 1:
            ident = f"{ident}-{seen_ids[ident]}"
        mode_ts = ", ".join(
            f"{{ name: {ts_string(mode)}, price: {ts_string(price)} }}"
            for mode, price in record["modes"].items()
        )
        items_ts.append(
            "  {\n"
            f"    id: {ts_string(ident)},\n"
            f"    name: {ts_string(record['name'])},\n"
            f"    tier: {ts_string(record['tier'])},\n"
            f"    modes: [{mode_ts}],\n"
            f"    effects: {ts_string_list(record['effects'])},\n"
            "  }"
        )

    write_ts_array(OUT, "IslandGear", "islandGear", "IslandGear", items_ts)
    print(f"wrote {len(items_ts)} upgrades -> {OUT}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
