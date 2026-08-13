from __future__ import annotations

import re
from pathlib import Path
from typing import Any


def load_yaml(path: Path) -> Any:
    try:
        import yaml  # type: ignore
    except ImportError as exc:
        raise SystemExit("请先安装 PyYAML：pip install pyyaml") from exc
    with path.open(encoding="utf-8") as handle:
        return yaml.safe_load(handle)


def flatten_lang(node: Any, prefix: str = "", out: dict[str, str] | None = None) -> dict[str, str]:
    if out is None:
        out = {}
    if isinstance(node, dict):
        if "." in node:
            flatten_lang(node["."], prefix, out)
        for key, value in node.items():
            if key == ".":
                continue
            child = f"{prefix}.{key}" if prefix else str(key)
            flatten_lang(value, child, out)
        return out
    if node is None:
        return out
    if prefix:
        out[prefix] = str(node)
    return out


def lookup(table: dict[str, str], key: str, default: str | None = None) -> str:
    if key in table:
        return strip_format(table[key])
    if default is not None:
        return strip_format(default)
    return key


def strip_format(value: str) -> str:
    return re.sub(r"§.", "", value)


def ts_string(value: str) -> str:
    escaped = (
        value.replace("\\", "\\\\")
        .replace("`", "\\`")
        .replace("${", "\\${")
        .replace("\r", "")
        .replace("\n", "\\n")
    )
    return f"`{escaped}`"


def ts_string_list(values: list[str]) -> str:
    if not values:
        return "[]"
    inner = ", ".join(ts_string(item) for item in values)
    return f"[{inner}]"


def write_ts_array(path: Path, import_type: str, export_name: str, type_name: str, items: list[str]) -> None:
    body = ",\n".join(items)
    content = (
        f"import type {{ {import_type} }} from '@/types/wiki'\n\n"
        f"export const {export_name}: {type_name}[] = [\n{body}\n]\n"
    )
    path.write_text(content, encoding="utf-8")
