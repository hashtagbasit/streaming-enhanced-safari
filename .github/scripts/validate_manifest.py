#!/usr/bin/env python3
"""Fail the build if the Safari extension manifest regresses to something Safari cannot load."""
import json
import os
import sys

root = sys.argv[1] if len(sys.argv) > 1 else "safari-src"
manifest_path = os.path.join(root, "manifest.json")

with open(manifest_path) as fh:
    m = json.load(fh)

errors = []


def must_exist(rel, why):
    if not os.path.isfile(os.path.join(root, rel)):
        errors.append(f"{why}: missing file {rel!r}")


if m.get("manifest_version") != 3:
    errors.append("manifest_version must be 3 for Safari")

for key in ("browser_action", "options_page", "background_page"):
    if key in m:
        errors.append(f"{key!r} is Manifest V2 only")

for perm in ("webRequest", "webRequestBlocking"):
    if perm in m.get("permissions", []):
        errors.append(f"{perm!r} is not usable in MV3/Safari")

# Safari refuses SVG icons.
for size, path in m.get("icons", {}).items():
    if path.lower().endswith(".svg"):
        errors.append(f"icons[{size}] is SVG; Safari requires PNG")
    must_exist(path, f"icons[{size}]")

action = m.get("action", {})
if "default_popup" in action:
    must_exist(action["default_popup"], "action.default_popup")
for size, path in action.get("default_icon", {}).items():
    if path.lower().endswith(".svg"):
        errors.append(f"action.default_icon[{size}] is SVG; Safari requires PNG")
    must_exist(path, f"action.default_icon[{size}]")

bg = m.get("background", {})
if "service_worker" not in bg:
    errors.append("background.service_worker is required in MV3")
else:
    must_exist(bg["service_worker"], "background.service_worker")

for i, cs in enumerate(m.get("content_scripts", [])):
    for js in cs.get("js", []):
        must_exist(js, f"content_scripts[{i}]")

if "options_ui" in m:
    must_exist(m["options_ui"]["page"], "options_ui.page")

war = m.get("web_accessible_resources", [])
if war and not isinstance(war[0], dict):
    errors.append("web_accessible_resources must use the MV3 object form")
for entry in war:
    for res in entry.get("resources", []):
        must_exist(res, "web_accessible_resources")

# Every host a content script runs on must also be declared, or Safari never
# offers the user a way to grant access to it.
declared = set(m.get("host_permissions", []))
for cs in m.get("content_scripts", []):
    for match in cs.get("matches", []):
        if match not in declared:
            errors.append(f"content script match {match!r} is not in host_permissions")

if errors:
    print(f"{len(errors)} problem(s) in {manifest_path}:")
    for e in errors:
        print("  -", e)
    sys.exit(1)

print(f"{manifest_path}: OK (MV3, {len(m.get('host_permissions', []))} hosts, all referenced files present)")
