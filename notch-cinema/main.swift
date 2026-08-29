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

	// MARK: - WKNavigationDelegate

	func webView(_ w: WKWebView, didFinish n: WKNavigation!) {
		window.title = "Notch Cinema — " + (w.title ?? "")
		updateHUD()
	}

	func webView(_ w: WKWebView, didFail n: WKNavigation!, withError e: Error) {
		NSLog("navigation failed: %@", e.localizedDescription)
	}
}

let app = NSApplication.shared
let delegate = AppDelegate()
app.delegate = delegate
app.setActivationPolicy(.regular)
app.run()
