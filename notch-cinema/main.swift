import Cocoa
import WebKit

// A minimal WKWebView host whose Info.plist sets NSPrefersDisplaySafeAreaLayoutGuide
// to false, so in fullscreen the content extends into the band beside the notch
// instead of being inset below it - which is the thing Safari will not do.
final class AppDelegate: NSObject, NSApplicationDelegate, WKNavigationDelegate, WKUIDelegate {

	var window: NSWindow!
	var webView: WKWebView!
	var hud: NSTextField!
	var hudVisible = true
	let bridge = Bridge()
	let world = WKContentWorld.world(name: "streaming-enhanced")
	var injectedSite: String?

	// Which flattened bundle to inject for a given host.
	private static let siteForHost: [(match: String, site: String)] = [
		("netflix.", "netflix"),
		("primevideo.", "amazon"), ("amazon.", "amazon"),
		("disneyplus.", "disney"), ("hotstar.", "disney"), ("starplus.", "disney"),
		("jiostar.", "disney"), ("jiocinema.", "disney"),
		("max.com", "max"), ("hbomax.", "max"),
		("paramountplus.", "paramount"),
		("crunchyroll.", "crunchyroll"),
	]

	// Matches Safari so sites don't serve a degraded or blocked experience.
	private let safariUA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) " +
		"AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.6 Safari/605.1.15"

	private let startURL = URL(string: "https://www.netflix.com")!

	func applicationDidFinishLaunching(_ note: Notification) {
		let config = WKWebViewConfiguration()
		config.websiteDataStore = .default()          // persistent, so logins stick
		config.mediaTypesRequiringUserActionForPlayback = []
		config.preferences.javaScriptCanOpenWindowsAutomatically = true
		config.allowsAirPlayForMediaPlayback = true

		// WKWebView ships with the Fullscreen API off, which is why sites report
		// "your browser does not support fullscreen" and player buttons do nothing.
		// Set through KVC against both spellings so this compiles and works across
		// OS versions without betting on one property name.
		let prefs = config.preferences
		for key in ["elementFullscreenEnabled", "fullScreenEnabled"] {
			let setter = "set" + key.prefix(1).uppercased() + key.dropFirst() + ":"
			if prefs.responds(to: NSSelectorFromString(setter)) {
				prefs.setValue(true, forKey: key)
				NSLog("enabled WKPreferences.%@", key)
			}
		}

		// An isolated content world keeps the extension's globals away from the
		// site's own, the way a real content script is isolated, and sidesteps the
		// page CSP that would otherwise block what we inject.
		config.userContentController.addScriptMessageHandler(bridge, contentWorld: world, name: "se")

		webView = WKWebView(frame: NSRect(x: 0, y: 0, width: 1440, height: 900), configuration: config)
		webView.customUserAgent = safariUA
		webView.navigationDelegate = self
		webView.uiDelegate = self
		webView.autoresizingMask = [.width, .height]
		webView.setValue(false, forKey: "drawsBackground")

		window = NSWindow(
			contentRect: NSRect(x: 0, y: 0, width: 1440, height: 900),
			styleMask: [.titled, .closable, .miniaturizable, .resizable],
			backing: .buffered,
			defer: false)
		window.title = "Notch Cinema"
		window.backgroundColor = .black
		window.collectionBehavior.insert(.fullScreenPrimary)
		window.contentView = webView
		window.center()
		window.makeKeyAndOrderFront(nil)

		installHUD()
		buildMenu()

		let nc = NotificationCenter.default
		for name: NSNotification.Name in [
			NSWindow.didEnterFullScreenNotification,
			NSWindow.didExitFullScreenNotification,
			NSWindow.didResizeNotification,
		] {
			nc.addObserver(self, selector: #selector(updateHUD), name: name, object: window)
		}

		webView.load(URLRequest(url: startURL))
		NSApp.activate(ignoringOtherApps: true)
		updateHUD()
	}

	func applicationShouldTerminateAfterLastWindowClosed(_ s: NSApplication) -> Bool { true }

	// MARK: - Measurement
	// Whether this worked is a measurement, not an impression: in fullscreen the
	// window height should equal the screen height, and safeAreaInsets.top should
	// be non-zero (the notch is there) while we draw underneath it anyway.

	private func installHUD() {
		hud = NSTextField(labelWithString: "")
		hud.font = .monospacedSystemFont(ofSize: 11, weight: .regular)
		hud.textColor = .white
		hud.backgroundColor = NSColor.black.withAlphaComponent(0.75)
		hud.drawsBackground = true
		hud.isBezeled = false
		hud.isEditable = false
		hud.maximumNumberOfLines = 6
		hud.translatesAutoresizingMaskIntoConstraints = false
		webView.addSubview(hud)
		NSLayoutConstraint.activate([
			hud.leadingAnchor.constraint(equalTo: webView.leadingAnchor, constant: 8),
			hud.topAnchor.constraint(equalTo: webView.topAnchor, constant: 8),
		])
	}

	@objc func updateHUD() {
		guard let screen = window.screen else { return }
		let insets = webView.safeAreaInsets
		let full = window.styleMask.contains(.fullScreen)
		let coversNotch = full && abs(window.frame.height - screen.frame.height) < 1.0

		hud.stringValue = """
		fullscreen:   \(full)
		screen:       \(Int(screen.frame.width)) x \(Int(screen.frame.height))
		window:       \(Int(window.frame.width)) x \(Int(window.frame.height))
		webView:      \(Int(webView.frame.width)) x \(Int(webView.frame.height))
		safeAreaTop:  \(String(format: "%.1f", insets.top))
		usingNotchBand: \(coversNotch ? "YES" : "no")
		"""
		hud.sizeToFit()
		hud.isHidden = !hudVisible
	}

	// MARK: - Menu

	private func buildMenu() {
		let main = NSMenu()

		let appItem = NSMenuItem()
		let appMenu = NSMenu()
		appMenu.addItem(withTitle: "About Notch Cinema", action: #selector(NSApp.orderFrontStandardAboutPanel(_:)), keyEquivalent: "")
		appMenu.addItem(.separator())
		appMenu.addItem(withTitle: "Quit", action: #selector(NSApplication.terminate(_:)), keyEquivalent: "q")
		appItem.submenu = appMenu
		main.addItem(appItem)

		let viewItem = NSMenuItem()
		let viewMenu = NSMenu(title: "View")
		viewMenu.addItem(withTitle: "Open Location…", action: #selector(openLocation), keyEquivalent: "l")
		viewMenu.addItem(withTitle: "Reload", action: #selector(reload), keyEquivalent: "r")
		viewMenu.addItem(withTitle: "Back", action: #selector(goBack), keyEquivalent: "[")
		viewMenu.addItem(.separator())
		let fs = viewMenu.addItem(withTitle: "Enter Full Screen", action: #selector(NSWindow.toggleFullScreen(_:)), keyEquivalent: "f")
		fs.keyEquivalentModifierMask = [.control, .command]
		viewMenu.addItem(withTitle: "Toggle Measurements", action: #selector(toggleHUD), keyEquivalent: "d")
		viewMenu.addItem(.separator())
		let fit = viewMenu.addItem(withTitle: "Fill Window with Video", action: #selector(fillWindowFit), keyEquivalent: "F")
		fit.keyEquivalentModifierMask = [.command, .shift]
		let crop = viewMenu.addItem(withTitle: "Fill Window with Video (Crop)", action: #selector(fillWindowCrop), keyEquivalent: "G")
		crop.keyEquivalentModifierMask = [.command, .shift]
		viewItem.submenu = viewMenu
		main.addItem(viewItem)

		// Edit menu, so copy/paste works in login fields.
		let editItem = NSMenuItem()
		let editMenu = NSMenu(title: "Edit")
		editMenu.addItem(withTitle: "Cut", action: Selector(("cut:")), keyEquivalent: "x")
		editMenu.addItem(withTitle: "Copy", action: Selector(("copy:")), keyEquivalent: "c")
		editMenu.addItem(withTitle: "Paste", action: Selector(("paste:")), keyEquivalent: "v")
		editMenu.addItem(withTitle: "Select All", action: Selector(("selectAll:")), keyEquivalent: "a")
		editItem.submenu = editMenu
		main.addItem(editItem)

		NSApp.mainMenu = main
	}

	// Independent of the page's own fullscreen: pins the video to our window,
	// which already covers the notch band. Works even where a site's fullscreen
	// control is broken or its player refuses to cooperate.
	private func fillWindow(objectFit: String) {
		let js = """
		(function () {
		  const id = '__notch_fill__';
		  const existing = document.getElementById(id);
		  if (existing) { existing.remove(); return 'off'; }
		  if (!document.querySelector('video')) return 'no video found';
		  const s = document.createElement('style');
		  s.id = id;
		  s.textContent = `
		    video { position: fixed !important; inset: 0 !important;
		            width: 100vw !important; height: 100vh !important;
		            z-index: 2147483647 !important; background: #000 !important;
		            object-fit: \(objectFit) !important; }
		    html, body { overflow: hidden !important; background: #000 !important; }
		  `;
		  document.documentElement.appendChild(s);
		  return 'on';
		})()
		"""
		webView.evaluateJavaScript(js) { result, error in
			NSLog("fillWindow(%@) -> %@", objectFit, String(describing: error ?? result as Any))
		}
	}

	@objc func fillWindowFit() { fillWindow(objectFit: "contain") }
	@objc func fillWindowCrop() { fillWindow(objectFit: "cover") }

	@objc func toggleHUD() { hudVisible.toggle(); updateHUD() }
	@objc func reload() { webView.reload() }
	@objc func goBack() { webView.goBack() }

	@objc func openLocation() {
		let alert = NSAlert()
		alert.messageText = "Open URL"
		let field = NSTextField(frame: NSRect(x: 0, y: 0, width: 360, height: 24))
		field.stringValue = webView.url?.absoluteString ?? startURL.absoluteString
		alert.accessoryView = field
		alert.addButton(withTitle: "Go")
		alert.addButton(withTitle: "Cancel")
		if alert.runModal() == .alertFirstButtonReturn {
			var s = field.stringValue.trimmingCharacters(in: .whitespaces)
			if !s.contains("://") { s = "https://" + s }
			if let u = URL(string: s) { webView.load(URLRequest(url: u)) }
		}
	}

	// MARK: - Extension injection

	private func site(forHost host: String) -> String? {
		AppDelegate.siteForHost.first { host.contains($0.match) }?.site
	}

	// Swapped before the load commits, so the script still lands at document start.
	func installUserScript(forHost host: String) {
		let wanted = site(forHost: host)
		guard wanted != injectedSite else { return }
		injectedSite = wanted

		let ucc = webView.configuration.userContentController
		ucc.removeAllUserScripts()
		guard let wanted = wanted else { return }
		guard let url = Bundle.main.url(forResource: wanted + ".userscript", withExtension: "js"),
		      let source = try? String(contentsOf: url, encoding: .utf8) else {
			NSLog("no bundled userscript for %@", wanted); return
		}
		ucc.addUserScript(WKUserScript(source: source,
		                               injectionTime: .atDocumentStart,
		                               forMainFrameOnly: true,
		                               in: world))
		NSLog("injecting %@ userscript (%d bytes)", wanted, source.count)
	}

	func webView(_ w: WKWebView,
	             decidePolicyFor navigationAction: WKNavigationAction,
	             decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
		if navigationAction.targetFrame?.isMainFrame ?? true, let host = navigationAction.request.url?.host {
			installUserScript(forHost: host)
		}
		decisionHandler(.allow)
	}

	// MARK: - WKNavigationDelegate

	func webView(_ w: WKWebView, didFinish n: WKNavigation!) {
		window.title = "Notch Cinema — " + (w.title ?? "")
		updateHUD()
	}

	func webView(_ w: WKWebView, didFail n: WKNavigation!, withError e: Error) {
		NSLog("navigation failed: %@", e.localizedDescription)
	}
}


// MARK: - Native bridge

// Backs browser.storage and the ratings fetch. Storage goes to UserDefaults
// rather than localStorage so settings are shared across every streaming site
// instead of being siloed per origin, matching how the extension behaves.
// The fetch goes through native so the ratings lookups aren't subject to CORS.
final class Bridge: NSObject, WKScriptMessageHandlerWithReply {

	private func defaultsKey(_ area: String, _ key: String) -> String { "se.\(area).\(key)" }

	private func read(_ area: String, _ key: String) -> Any? {
		guard let data = UserDefaults.standard.data(forKey: defaultsKey(area, key)),
		      let wrapped = try? JSONSerialization.jsonObject(with: data) as? [String: Any]
		else { return nil }
		return wrapped["v"]
	}

	private func write(_ area: String, _ key: String, _ value: Any) {
		guard let data = try? JSONSerialization.data(withJSONObject: ["v": value]) else { return }
		UserDefaults.standard.set(data, forKey: defaultsKey(area, key))
	}

	private func allKeys(_ area: String) -> [String] {
		let prefix = "se.\(area)."
		return UserDefaults.standard.dictionaryRepresentation().keys
			.filter { $0.hasPrefix(prefix) }
			.map { String($0.dropFirst(prefix.count)) }
	}

	func userContentController(_ ucc: WKUserContentController,
	                           didReceive message: WKScriptMessage,
	                           replyHandler: @escaping (Any?, String?) -> Void) {
		guard let body = message.body as? [String: Any], let name = body["name"] as? String else {
			replyHandler(nil, "malformed message"); return
		}
		let payload = body["payload"] as? [String: Any] ?? [:]
		let area = payload["area"] as? String ?? "sync"

		switch name {
		case "storage.get":
			var out: [String: Any] = [:]
			let keys = (payload["keys"] as? [String]) ?? allKeys(area)
			for k in keys { if let v = read(area, k) { out[k] = v } }
			replyHandler(out, nil)

		case "storage.set":
			if let items = payload["items"] as? [String: Any] {
				for (k, v) in items { write(area, k, v) }
			}
			replyHandler(nil, nil)

		case "storage.remove":
			for k in (payload["keys"] as? [String] ?? []) {
				UserDefaults.standard.removeObject(forKey: defaultsKey(area, k))
			}
			replyHandler(nil, nil)

		case "storage.clear":
			for k in allKeys(area) { UserDefaults.standard.removeObject(forKey: defaultsKey(area, k)) }
			replyHandler(nil, nil)

		case "fetch":
			guard let urlString = payload["url"] as? String, let url = URL(string: urlString) else {
				replyHandler(nil, "bad url"); return
			}
			var request = URLRequest(url: url)
			request.setValue("application/json", forHTTPHeaderField: "accept")
			switch payload["type"] as? String {
			case "mal":
				request.setValue("75ee4314348f04a8eebde73db852b136", forHTTPHeaderField: "X-MAL-CLIENT-ID")
			case "tmdb":
				request.setValue("Bearer " + Self.tmdbToken, forHTTPHeaderField: "Authorization")
			default:
				break
			}
			URLSession.shared.dataTask(with: request) { data, _, error in
				if let error = error { replyHandler(nil, error.localizedDescription); return }
				guard let data = data,
				      let json = try? JSONSerialization.jsonObject(with: data) else {
					replyHandler(nil, "unparseable response"); return
				}
				replyHandler(json, nil)
			}.resume()

		default:
			replyHandler(nil, "unknown message \(name)")
		}
	}

	// Same public read-only token the extension ships with.
	private static let tmdbToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OWQyMWUxMmYzNjU1MjM4NzdhNTAwODVhMmVjYThiZiIsInN1YiI6IjY1M2E3Mjg3MjgxMWExMDBlYTA4NjI5OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.x_EaVXQkg1_plk0NVSBnoNUl4QlGytdeO613nXIsP3w"
}

let app = NSApplication.shared
let delegate = AppDelegate()
app.delegate = delegate
app.setActivationPolicy(.regular)
app.run()
