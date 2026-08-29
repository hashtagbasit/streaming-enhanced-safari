# Streaming Enhanced — Safari port

A Safari-compatible build of [Netflix-Prime-Auto-Skip](https://github.com/Dreamlinerm/Netflix-Prime-Auto-Skip)
by Marvin Krebber (skips ads, intros and credits on Netflix, Prime Video, Disney+,
Crunchyroll, Max and Paramount+).

Upstream ships Chrome and Firefox builds but no Safari one. This repo takes the
published Firefox add-on (`netflix_prime_auto_skip-1.1.105.xpi`, Manifest V2),
converts it to a Safari-compatible Manifest V3 extension in [`safari-src/`](safari-src),
and wraps it in a macOS app on CI.

All site logic is upstream's, unmodified. Only the manifest, the loaders and the
polyfill guards were changed — see [Port changes](#port-changes).

## Getting a build

Every push runs [`.github/workflows/build.yml`](.github/workflows/build.yml) on a
macOS runner. Open the latest green run and download the artifacts:

| Artifact | What it is |
|---|---|
| `StreamingEnhanced-macOS-app` | The built `.app`, ad-hoc signed. Fastest path to trying it. |
| `StreamingEnhanced-xcodeproj` | The generated Xcode project, for signing with your own Apple ID. |
| `safari-src` | The unpacked MV3 extension on its own. |

You can also trigger a build by hand from the **Actions** tab → *Build Safari
extension* → **Run workflow**.

### Installing the CI `.app`

CI has no Apple signing certificate, so the app is **ad-hoc signed**. macOS will
refuse to open it as downloaded until you clear the quarantine flag:

```bash
unzip StreamingEnhanced-macOS.zip
xattr -dr com.apple.quarantine "Streaming Enhanced.app"
open "Streaming Enhanced.app"
```

Then, in Safari:

1. Settings → Advanced → check **Show features for web developers**.
2. Develop → **Allow Unsigned Extensions**. *(Safari resets this on every restart.)*
3. Settings → Extensions → enable **Streaming Enhanced**.
4. Click the toolbar icon → **Always Allow on Every Website**. Safari blocks content
   scripts until you grant access, and the extension looks dead until you do.

If you would rather not re-enable unsigned extensions after each Safari restart,
download the `StreamingEnhanced-xcodeproj` artifact, open it, set your Team under
Signing & Capabilities (a free Apple ID works), and press Cmd+R.

### Building locally

Requires full Xcode, not just Command Line Tools:

```bash
sudo xcode-select -s /Applications/Xcode.app/Contents/Developer
./build-safari.sh
```

## Port changes

| # | Change | Reason |
|---|--------|--------|
| 1 | `manifest_version` 2 → 3 | Safari's supported/forward-looking format. The bundled code was already MV3-aware (`browser.action \|\| browser.browserAction`). |
| 2 | `background.scripts` → `background.service_worker` (`type: module`) | MV3 form. Verified safe: nothing in the background import graph (`index.ts.js`, `storeTypes.js`, both polyfills, Vue `runtime-core`) touches `document`/`window` unguarded. |
| 3 | Dropped `webRequest` + `webRequestBlocking` | Blocking `webRequest` does not exist in MV3 and is unsupported in Safari. It was only used by the Firefox-for-Android user-agent spoof, which can never run on Safari. |
| 4 | Host patterns moved from `permissions` → `host_permissions` | MV3 split. Also added the streaming hosts that only appeared under `content_scripts` (netflix.\*, crunchyroll, paramountplus, hotstar/jio\*) — Safari grants site access per host, so they must be declared. |
| 5 | `browser_action` → `action` | MV3 key name. |
| 6 | `options_page` → `options_ui` (`open_in_tab: true`) | MV3 key. Safari has no menu entry for options — reach it from the popup's settings button, which already does `tabs.create(runtime.getURL(...))`. |
| 7 | SVG icons → PNG set (16–512) | **Safari does not accept SVG icons.** Rasterized from the original `NetflixAmazon Auto-Skip.svg` at 1024px, then downscaled. |
| 8 | `web_accessible_resources` → MV3 object form with `matches` | The content-script loaders `import()` these files at runtime; without this the extension silently does nothing on every site. |
| 9 | Deleted `META-INF/` | Mozilla's add-on signature, meaningless to Safari. |
| 10 | `index.ts.js`: `isFirefox = !!browser.webRequest` → real UA check | With `webRequest` gone the old test was already false, but this makes the intent explicit and immune to Safari exposing the namespace. |
| 11 | `*.ts-loader.js`: `chrome.runtime.getURL` → `(globalThis.browser ?? globalThis.chrome).runtime.getURL` | Prefers the standard namespace; `chrome` remains the fallback. |
| 12 | Both polyfills: alias `chrome` to `browser` if absent | webextension-polyfill hard-throws `"This script should only be loaded in a browser extension"` when `chrome.runtime.id` is missing. One guard line prevents a total failure if Safari ever drops the `chrome` alias. |
| 13 | Popup/options favicons → `icons/icon-32.png` | The popup pointed at `/vite.svg`, which was never shipped (404). |
| 14 | `browser_specific_settings.safari.strict_min_version: "16.4"` | First Safari with MV3 service workers and optional permissions. `gecko.id` kept so the tree still loads in Firefox. |

[`.github/scripts/validate_manifest.py`](.github/scripts/validate_manifest.py) runs on
every push and fails the build if any of these regress — SVG icons, MV2 keys,
`webRequest`, the MV2 `web_accessible_resources` form, a content-script host that
isn't in `host_permissions`, or a manifest entry pointing at a file that doesn't exist.

## Additions beyond upstream

### Video stretch

A shared `Video.stretch` setting, exposed as a dropdown in both the popup and the
options page, applying to all six services:

| Mode | CSS | Effect |
|---|---|---|
| Off | — | Untouched |
| Stretch to fill | `object-fit: fill` | Fills the player, distorts the picture |
| Zoom to fill | `object-fit: cover` | Fills by cropping the edges, keeps proportions |

Implemented as `applyStretch()` in `shared-functions.js`, called from each platform's
existing `MutationObserver` callback. Two things constrain the implementation:

- It styles through an injected stylesheet plus a class on the `<video>`, not inline
  styles — these players rewrite the video element's inline `style` continuously.
- It only touches `classList` when the class is actually wrong. It runs inside the
  observers, so an unconditional DOM write would retrigger them forever. A `watch` on
  the setting handles the paused case, where no mutations arrive to drive the observer.

**Limitation:** `object-fit` only helps when the black bars come from the player
letterboxing the video element. Bars *baked into the stream* — a 2.39:1 film encoded
inside a 16:9 frame — leave the element's aspect matching the stream's, and neither
mode changes anything. That case needs a `transform: scale()` crop instead.

English strings only; `fallbackLocale: "en"` covers the other twelve locales.

## Known Safari caveats

- **Site access is not automatic.** Safari defaults every host to "Ask"; nothing runs until you grant access.
- **The service worker is aggressively suspended.** The skip counter on the toolbar badge lives in a plain in-memory object, so it can reset. Cosmetic — settings and stats live in `browser.storage`.
- **No options-page entry point in Safari's UI.** Use the gear button in the popup.
- **Firefox-for-Android UA spoofing is gone** (change 3). Irrelevant on Safari.
- **`storage.sync`** is backed by iCloud in Safari and needs you signed in; it degrades to empty reads rather than throwing.
- The "rate this add-on" link in the options page still points at addons.mozilla.org — cosmetic; the in-page check `typeof polyfill !== "undefined"` is true in every browser.

## Status

The conversion is complete and statically validated, but **has not been run in Safari yet**
— it was prepared on a machine without Xcode. The CI build is what proves it compiles and
bundles; actually loading it and confirming ads get skipped is still an open step.

## Licence

Upstream code belongs to Marvin Krebber under the terms of the
[original project](https://github.com/Dreamlinerm/Netflix-Prime-Auto-Skip). This repo is a
compatibility port, not a re-release; check upstream's licence before redistributing.
