#!/bin/bash
# Wrap the Safari-ready web extension in an Xcode project.
# Requires full Xcode (not just Command Line Tools).

set -euo pipefail
cd "$(dirname "$0")"

SRC="$PWD/safari-src"
OUT="$PWD/safari-app"

if ! xcrun --find safari-web-extension-converter >/dev/null 2>&1; then
  echo "error: safari-web-extension-converter not found."
  echo "Install Xcode from the App Store, then run:"
  echo "  sudo xcode-select -s /Applications/Xcode.app/Contents/Developer"
  exit 1
fi

rm -rf "$OUT"
mkdir -p "$OUT"

xcrun safari-web-extension-converter "$SRC" \
  --project-location "$OUT" \
  --app-name "Streaming Enhanced" \
  --bundle-identifier "com.local.streamingenhanced" \
  --macos-only \
  --no-prompt \
  --copy-resources

echo
echo "Xcode project written to: $OUT"
echo "Next: open it, set your signing team, and Run (Cmd+R)."
