from __future__ import annotations

import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from wiki_lang import flatten_lang, load_yaml, lookup, strip_format, ts_string, ts_string_list, write_ts_array

HG_WAR = Path(r"e:\mc\hg-war")
WEBSITE = Path(__file__).resolve().parents[1]
REGISTRY = HG_WAR / "src/main/kotlin/me/noryea/hgwar/accessories/items/AccessoryRegistry.kt"
LANG = HG_WAR / "src/main/resources/data/hgwar/lang/zh_cn.yml"
OUT = WEBSITE / "src/data/wiki/islandParts.ts"

REGISTER_HEAD = re.compile(
    r'register\(\s*"(?P<name>[^"]+)"\s*,\s*AccessoryApplicableTypes\.(?P<typ>[A-Z_]+)\s*,'
    r"\s*(?P<qmin>[0-9.]+)f\.\.(?P<qmax>[0-9.]+)f(?P<kwargs>[^{]*)\)\s*\{",
)
CONFLICT_CALL = re.compile(r"conflict\(([^)]*)\)")
KWARG = re.compile(r"(\w+)\s*=\s*([^,]+)")
EFFECT_CALL = re.compile(
    r"(?P<fn>float|percent|bool|fixedFloat|fixedPercent|upgrade)\(\s*Effect\.(?P<effect>[A-Z0-9_]+)"
    r"(?P<args>[^)]*)\)",
)

QUALITY_TIERS = [
    ("white", 0.25),
    ("green", 0.5),
    ("blue", 0.75),
    ("purple", 1.0 - 5e-5),
]


def matching_brace(text: str, open_index: int) -> int:
    depth = 0
    for index in range(open_index, len(text)):
        char = text[index]
        if char == "{":
            depth += 1
        elif char == "}":
            depth -= 1
            if depth == 0:
                return index
    raise ValueError("unbalanced braces")


def quality_id(value: float) -> str:
    clamped = min(max(value, 0.0), 1.0)
    for name, upper in QUALITY_TIERS:
        if clamped < upper:
            return name
    return "gold"


def parse_kwargs(raw: str) -> dict[str, str]:
    return {match.group(1): match.group(2).strip() for match in KWARG.finditer(raw)}


def parse_args(raw: str) -> tuple[list[str], dict[str, str]]:
    positional: list[str] = []
    kwargs: dict[str, str] = {}
    for part in raw.split(","):
        piece = part.strip()
        if not piece:
            continue
        if "=" in piece:
            key, value = piece.split("=", 1)
            kwargs[key.strip()] = value.strip()
        else:
            positional.append(piece)
    return positional, kwargs


def to_float(token: str) -> float:
    return float(token.strip().rstrip("fF"))


def format_number(value: float, percent: bool, force_minus: bool = False) -> str:
    sign = "-" if force_minus or value < 0 else "+"
    magnitude = abs(value)
    if percent:
        text = f"{magnitude * 100:.1f}".rstrip("0").rstrip(".")
        return f"{sign}{text}%"
    text = f"{magnitude:.2f}".rstrip("0").rstrip(".")
    return f"{sign}{text}"


def signed_value(value: float, kind: str) -> float:
    if kind in {"NEGATIVE", "REVERSED"}:
        return -value
    return value


def effect_text(lang: dict[str, str], effect: str, kind: str, percent: bool, fixed: bool) -> str:
    key = effect.lower()
    if kind == "bool":
        return lookup(lang, f"text.hgwar.accessory.effect.{key}.boolean", key)
    if kind == "upgrade":
        return lookup(lang, f"text.hgwar.accessory.effect.{key}.upgrade", "%s")
    type_name = "percentage" if percent else "float"
    candidates = [f"text.hgwar.accessory.effect.{key}"]
    if fixed:
        candidates.append(f"text.hgwar.accessory.effect.{key}.{type_name}.fixed")
    candidates.append(f"text.hgwar.accessory.effect.{key}.{type_name}")
    template = next((lang[item] for item in candidates if item in lang), f"{key}: %s")
    cleaned = (
        strip_format(template)
        .replace("%s秒", "")
        .replace("%sx", "")
        .replace("%s刻", "")
        .replace("%s", "")
    )
    return re.sub(r"\s+", " ", cleaned).strip(" :")


def effect_range(
    lang: dict[str, str],
    effect: str,
    fn: str,
    min_v: float | None,
    max_v: float | None,
    kind: str,
    upgrade_value: str | None,
) -> str:
    key = effect.lower()
    percent = fn in {"percent", "fixedPercent"}
    fixed = fn in {"fixedFloat", "fixedPercent", "bool", "upgrade"}
    if fn == "bool":
        return ""
    if fn == "upgrade":
        return ""
    if min_v is None or max_v is None:
        return ""
    if fixed:
        display = signed_value(min_v, kind)
        type_name = "percentage" if percent else "float"
        display_key = f"{display:.2f}".rstrip("0").rstrip(".")
        specific = lang.get(f"text.hgwar.accessory.effect.{key}.{type_name}.fixed.{display_key}")
        if specific:
            return strip_format(specific)
        alt = lang.get(f"text.hgwar.accessory.effect.{key}.{type_name}.fixed.{min_v:g}")
        if alt:
            return strip_format(alt)
        if percent and abs(display) > 1:
            magnitude = f"{abs(display):.2f}".rstrip("0").rstrip(".")
            return f"×{magnitude}"
        return format_number(display, percent, kind in {"NEGATIVE", "REVERSED"} and display <= 0)
    left = format_number(signed_value(min_v, kind), percent, kind in {"NEGATIVE", "REVERSED"})
    right = format_number(signed_value(max_v, kind), percent, kind in {"NEGATIVE", "REVERSED"})
    if left == right:
        return left
    return f"{left} ~ {right}"


def parse_effects(body: str, lang: dict[str, str]) -> list[dict[str, str]]:
    effects: list[dict[str, str]] = []
    for match in EFFECT_CALL.finditer(body):
        fn = match.group("fn")
        effect = match.group("effect")
        positional, kwargs = parse_args(match.group("args"))
        kind = kwargs.get("kind", "EffectKind.POSITIVE").split(".")[-1]
        min_v = max_v = None
        upgrade_value = None
        if fn == "bool":
            pass
        elif fn == "upgrade":
            upgrade_value = positional[0].strip().strip('"') if positional else None
        elif fn in {"float", "percent"}:
            min_v = to_float(positional[0])
            max_v = to_float(positional[1])
        else:
            min_v = max_v = to_float(positional[0])
        percent = fn in {"percent", "fixedPercent"}
        if fn == "upgrade" and upgrade_value:
            text = lookup(
                lang,
                f"text.hgwar.accessory.effect.{effect.lower()}.upgrade.{upgrade_value}",
                upgrade_value,
            )
        else:
            text = effect_text(
                lang,
                effect,
                "bool" if fn == "bool" else "num",
                percent,
                fn.startswith("fixed"),
            )
        effects.append(
            {
                "text": text,
                "range": effect_range(lang, effect, fn, min_v, max_v, kind, upgrade_value),
            }
        )
    return effects


def parse_conflicts(source: str) -> dict[str, set[str]]:
    mapping: dict[str, set[str]] = {}
    for match in CONFLICT_CALL.finditer(source):
        names = re.findall(r'"([^"]+)"', match.group(1))
        for name in names:
            mapping.setdefault(name, set()).update(other for other in names if other != name)
    return mapping


def main() -> int:
    source = REGISTRY.read_text(encoding="utf-8")
    lang = flatten_lang(load_yaml(LANG))
    conflicts = parse_conflicts(source)
    parts: list[str] = []

    for match in REGISTER_HEAD.finditer(source):
        kwargs = parse_kwargs(match.group("kwargs"))
        if kwargs.get("enabled") == "false":
            continue
        name = match.group("name")
        open_brace = source.find("{", match.end() - 1)
        close_brace = matching_brace(source, open_brace)
        body = source[open_brace + 1 : close_brace]
        qmin = float(match.group("qmin"))
        qmax = float(match.group("qmax"))
        q_left = lookup(lang, f"text.hgwar.accessory.quality.{quality_id(qmin)}")
        q_right = lookup(lang, f"text.hgwar.accessory.quality.{quality_id(qmax)}")
        quality_range = q_left if q_left == q_right else f"{q_left} ~ {q_right}"
        attach = lookup(lang, f"text.hgwar.accessory.type.{match.group('typ').lower()}")
        conflict_names = [
            lookup(lang, f"item.hgwar.accessory.{item}", item) for item in sorted(conflicts.get(name, []))
        ]
        effects = parse_effects(body, lang)
        effect_ts = ", ".join(
            f"{{ text: {ts_string(item['text'])}, range: {ts_string(item['range'])} }}" for item in effects
        )
        parts.append(
            "  {\n"
            f"    id: {ts_string(name)},\n"
            f"    name: {ts_string(lookup(lang, f'item.hgwar.accessory.{name}', name))},\n"
            f"    attachTo: {ts_string_list([attach])},\n"
            f"    qualityRange: {ts_string(quality_range)},\n"
            f"    conflicts: {ts_string_list(conflict_names)},\n"
            f"    effects: [{effect_ts}],\n"
            "  }"
        )

    write_ts_array(OUT, "IslandPart", "islandParts", "IslandPart", parts)
    print(f"wrote {len(parts)} accessories -> {OUT}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
