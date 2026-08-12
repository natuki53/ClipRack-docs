(() => {
  const STORAGE_KEY = "cliprack_lang";

  /** @typedef {"ja"|"en"} Lang */

  /** @type {Record<string, string> | null} */
  let BASE_I18N = null;

  /**
   * index.html の初期表示（=日本語）を正として取り込み、
   * 日本語に戻したときは常にそれを復元する。
   * @returns {Record<string, string>}
   */
  function captureBaseI18nFromDom() {
    /** @type {Record<string, string>} */
    const base = {};
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n") || "";
      if (!key) return;
      base[key] = el.innerHTML;
    });
    return base;
  }

  /** @param {string} key */
  function safeStorageGet(key) {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  /** @param {string} key @param {string} value */
  function safeStorageSet(key, value) {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch {
      return false;
    }
  }

  /** @type {{ en: Record<string, string> }} */
  const I18N = {
    en: {
      "nav.features": "Features",
      "nav.how": "How it works",
      "nav.permissions": "Permissions",
      "nav.support": "Support",
      "nav.download": "Get it",

      "cta.github": "GitHub",
      "cta.download": "Download",

      "hero.pill.platform": "macOS 13+",
      "hero.title": "Win+V, but for<br />macOS.",
      "hero.lead":
        "Open with <strong>⌘⇧V</strong>, choose with <strong>↑↓</strong>, paste with <strong>Enter/click</strong>. A lightweight clipboard history focused on the “use your history” flow.",
      "hero.primary": "Get started",
      "hero.meta.history.label": "History limit",
      "hero.meta.history.value": "Up to 100 items (pins kept)",
      "hero.meta.customize.label": "Customize",
      "hero.meta.customize.value": "Shortcuts / Theme",
      "hero.meta.language.label": "Languages",
      "hero.meta.language.value": "English / Japanese / etc.",
      "hero.meta.version.label": "Supported OS",
      "hero.meta.version.value": "macOS 13 Ventura or later",

      "mock.pin.title": "Pinned",
      "mock.pin.text": "Pin what you use often so it’s always ready.",
      "mock.history.title": "History",
      "mock.history.text": "It stacks automatically when you copy.",
      "mock.image.title": "Images",
      "mock.image.text": "Screenshots included. Paste instantly when needed.",
      "mock.link.title": "Files",
      "mock.link.text": "Handle various file types too.",

      "features.title": "Features",
      "features.lead": "Win+V‑like controls, tuned to feel natural on macOS.",
      "features.items.invoke.title": "Instant toggle",
      "features.items.invoke.text": "Show/hide with a global hotkey.",
      "features.items.keyboard.title": "Keyboard‑first",
      "features.items.keyboard.text": "Navigate with ↑↓ (PageUp/PageDown supported).",
      "features.items.paste.title": "Fast paste",
      "features.items.paste.text": "Paste with Enter or a single click (default).",
      "features.items.pin.title": "Pin items",
      "features.items.pin.text": "Use the pin icon to keep favorites. Pins survive clearing.",
      "features.items.close.title": "Stays out of your way",
      "features.items.close.text": "Close with Esc, outside click, or losing focus.",
      "features.items.types.title": "Multiple types",
      "features.items.types.text": "Stores Text / Image / File / URL.",

      "how.title": "How it works",
      "how.steps.1.title": "Open",
      "how.steps.1.text": "Press the global hotkey <strong>⌘⇧V</strong>.",
      "how.steps.2.title": "Choose",
      "how.steps.2.text": "Select an item with <strong>↑↓</strong> (PageUp/PageDown also works).",
      "how.steps.3.title": "Paste",
      "how.steps.3.text": "Paste with <strong>Enter</strong> or a <strong>single click</strong>.",
      "how.steps.4.title": "Pin",
      "how.steps.4.text": "Use the <strong>pin icon</strong> on the right to pin items.",
      "how.install.title": "Install (for users)",
      "how.install.1": "<strong>Download</strong> from Releases",
      "how.install.2": "Move the app to your <strong>Applications</strong> folder",
      "how.install.3": "Launch it and follow the permission prompts",

      "perm.title": "Accessibility permission",
      "perm.lead": "To <strong>paste automatically</strong>, ClipRack needs Accessibility permission.",
      "perm.ok.title": "When allowed",
      "perm.ok.1": "Open with the hotkey (⌘⇧V)",
      "perm.ok.2": "Choose with ↑↓, paste with Enter/click",
      "perm.ng.title": "When not allowed",
      "perm.ng.1": "The selected content is restored to the clipboard",
      "perm.ng.2": "Press ⌘V manually to paste it",
      "perm.steps.title": "How to enable",
      "perm.steps.1": "<strong>System Settings</strong> → <strong>Privacy & Security</strong> → <strong>Accessibility</strong>",
      "perm.steps.2": "Allow <strong>ClipRack</strong>",

      "dl.title": "Get it",
      "dl.lead": "Download from App Store or TestFlight to try it out.",
      "dl.releases.title": "How to get it",
      "dl.releases.text": "Available from App Store or TestFlight",
      "dl.releases.hint": "Official release will be added later.",
      "support.title": "Support",
      "support.lead": "Find usage guidance, permissions help, troubleshooting, and contact options.",
      "support.link.title": "ClipRack Support",
      "support.link.text": "Frequently asked questions and contact options",
      "support.link.hint": "Please review this page before reporting an issue",

      "footer.top": "Back to top",
      "footer.support": "Support",
      "footer.privacy": "Privacy Policy",
      "footer.github": "GitHub",

      "notfound.text": "Page not found. The link may be outdated.",
      "notfound.back": "Back to home",

      "privacy.title": "Privacy Policy",
      "privacy.updated": "Last updated: August 12, 2026",
      "privacy.intro": "ClipRack (the \"App\") provides clipboard history on your Mac. This policy explains the information processed and stored on-device, its purposes, retention and deletion, and the permissions the App uses.",
      "privacy.important.title": "Key Points",
      "privacy.important.1": "This app stores all data <strong>only on your local device</strong>",
      "privacy.important.2": "Data is <strong>never</strong> sent to external servers",
      "privacy.important.3": "Data is <strong>never</strong> shared with third parties",
      "privacy.important.4": "No analytics or tracking tools are used",
      "privacy.section1.title": "1. Information Processed and Stored On-Device",
      "privacy.section1.text": "To provide its features, the App processes or stores the following information on your Mac. None of it is sent to the developer's servers:",
      "privacy.section1.item1": "<strong>Clipboard history</strong>: Text, images, file references and paths, URLs, and PDFs",
      "privacy.section1.item2": "<strong>App settings</strong>: Shortcut, appearance, history limit, auto-paste, launch-at-login, and related preferences",
      "privacy.section1.item3": "<strong>User-created data</strong>: Pinned items and text templates",
      "privacy.section1.item4": "<strong>Folder access information</strong>: A security-scoped bookmark for a screenshot folder the user optionally selects",
      "privacy.section2.title": "2. Data Storage Location",
      "privacy.section2.text": "History, local image and PDF copies, templates, and settings are stored in the sandbox container assigned to the App by macOS. The exact location varies by macOS version and distribution method. The App does not sync this data through iCloud or back it up to an external server.",
      "privacy.section3.title": "3. Purpose of Data Use",
      "privacy.section3.text": "On-device data is used only for the following purposes:",
      "privacy.section3.item1": "Display and management of clipboard history",
      "privacy.section3.item2": "Providing paste functionality for user-selected items",
      "privacy.section3.item3": "Saving and restoring application settings",
      "privacy.section3.item4": "Providing pin functionality",
      "privacy.section3.item5": "Providing text templates and optional screenshot import",
      "privacy.section4.title": "4. Data Sharing",
      "privacy.section4.text": "The App does not transmit or share clipboard history, settings, or other on-device data with the developer or third parties. It uses no advertising, analytics, tracking, or crash-reporting SDKs. Its App Store Connect privacy declaration is \"Data Not Collected.\"",
      "privacy.section5.title": "5. Required Permissions",
      "privacy.section5.text": "The App uses the following features and permissions. Accessibility permission and folder selection are optional:",
      "privacy.section5.item1": "<strong>Accessibility permission (optional)</strong>: Sends a ⌘V keyboard event to auto-paste the selected item into the previously active app. Without permission, the item is still restored to the clipboard and can be pasted manually with ⌘V",
      "privacy.section5.item2": "<strong>Clipboard access</strong>: Stores supported copied formats in local history and restores a selected item",
      "privacy.section5.item3": "<strong>User-selected folder (optional)</strong>: Monitors only the folder selected by the user when screenshot import is enabled",
      "privacy.section5.note": "Permissions are used only to provide these features. Accessibility permission can be revoked at any time in System Settings > Privacy & Security > Accessibility. Turning off screenshot import in Preferences releases the saved folder access.",
      "privacy.section6.title": "6. Data Deletion",
      "privacy.section6.text": "\"Clear All\" deletes unpinned history. Individual history items and templates can be deleted in the App; pinned items can be unpinned and then deleted. When the configured history limit (up to 100 items) is exceeded, the oldest unpinned items are deleted first. Removing the app bundle may leave its sandbox container depending on macOS state. To remove all data, quit ClipRack and delete the container/app data for bundle identifier <code>com.mu-natuki.cliprack</code> using Finder or macOS storage-management tools. Contact support if you need help.",
      "privacy.section7.title": "7. Security",
      "privacy.section7.text": "The App enables App Sandbox and limits folder access to locations explicitly selected by the user. It does not apply its own encryption to on-device data. Data is protected by macOS file access controls, the app container, and device security features.",
      "privacy.section8.title": "8. Age Restrictions",
      "privacy.section8.text": "This app is intended for all ages and has no age restrictions.",
      "privacy.section9.title": "9. Privacy Policy Changes",
      "privacy.section9.text": "We may update this policy when the App's features or data handling change. Material changes will be described on this page and the last-updated date above will be revised.",
      "privacy.section10.title": "10. Contact",
      "privacy.section10.text": "For questions about this policy or data deletion, use the support page. Do not post clipboard contents or personal information in a public issue.",
      "privacy.section10.item1": "<strong><a href=\"./support.html\">ClipRack Support</a></strong>: FAQs and contact options",
      "privacy.section10.item2": "<strong><a href=\"https://github.com/natuki53/ClipRack/issues\">GitHub Issues</a></strong>: Bug reports and inquiries",
      "privacy.skip": "Skip to content",
      "privacy.page.title": "Privacy Policy — ClipRack",
      "privacy.page.description": "ClipRack's privacy policy. Explains on-device clipboard processing, storage, deletion, and permissions.",

      "support.page.title": "Support — ClipRack",
      "support.skip": "Skip to content",
      "support.title": "ClipRack Support",
      "support.lead": "Help with setup, permissions, and common issues.",
      "support.quick.title": "Quick Start",
      "support.quick.1": "Copy text, an image, a file, a URL, or a PDF in another app.",
      "support.quick.2": "Press <strong>⌘⇧V</strong> to open clipboard history.",
      "support.quick.3": "Choose an item with the arrow keys or pointer, then press Enter or click it.",
      "support.faq.title": "Frequently Asked Questions",
      "support.faq.dock.title": "ClipRack is not in the Dock",
      "support.faq.dock.text": "ClipRack is intentionally a menu bar app. Use the menu bar icon or ⌘⇧V. If the icon is hidden, open Preferences from the history panel and enable the menu bar icon.",
      "support.faq.access.title": "Auto-paste does not work",
      "support.faq.access.text": "Grant ClipRack access in System Settings > Privacy & Security > Accessibility. Without this permission, ClipRack still restores the selected item to the clipboard; press ⌘V manually.",
      "support.faq.shot.title": "Screenshots are not added",
      "support.faq.shot.text": "Open Preferences > Advanced, enable screenshot import, and select the actual macOS screenshot destination folder. ClipRack monitors only the folder you select.",
      "support.faq.secret.title": "Sensitive clipboard items",
      "support.faq.secret.text": "ClipRack skips items marked concealed, transient, auto-generated, or sensitive by password managers and other apps. Avoid copying secrets from apps that do not provide these markers.",
      "support.contact.title": "Contact and Bug Reports",
      "support.contact.text": "Open a GitHub Issue with your macOS version, ClipRack version, steps to reproduce, and expected/actual behavior. Do not include clipboard contents, passwords, personal information, or private files because Issues are public.",
      "support.contact.button": "Open GitHub Issues",
      "support.privacy": "Read the Privacy Policy",
    },
  };

  /** @param {string} msg */
  function showToast(msg) {
    const el = document.querySelector("[data-toast]");
    if (!el) return;
    el.textContent = msg;
    el.hidden = false;
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(() => {
      el.hidden = true;
    }, 1600);
  }

  async function copyText(text) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      showToast(`コピーしました: ${text}`);
    } catch {
      showToast("コピーできませんでした");
    }
  }

  function wireCopyButtons() {
    document.querySelectorAll("[data-copy]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const text = btn.getAttribute("data-copy") || "";
        if (!text) return;
        void copyText(text);
      });
    });
  }

  function setYear() {
    const y = new Date().getFullYear();
    document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = String(y)));
  }

  /**
   * GitHub Pages (project site) 例:
   * - https://OWNER.github.io/REPO/  -> pathname: /REPO/...
   * カスタムドメインやローカルでは推定できないこともあるので、その場合は既存hrefを尊重。
   */
  function inferRepoFromLocation() {
    const host = window.location.host || "";
    const path = window.location.pathname || "/";

    // GitHub Pagesっぽいホストなら project repo 名を推定
    if (host.endsWith("github.io")) {
      const owner = host.split(".")[0];
      const parts = path.split("/").filter(Boolean);
      const repo = parts[0]; // /REPO/...
      if (owner && repo) return { owner, repo };
    }
    return null;
  }

  function applyRepoLinks() {
    const inferred = inferRepoFromLocation();
    if (!inferred) return;

    const repoUrl = `https://github.com/${inferred.owner}/${inferred.repo}`;
    const releasesUrl = `${repoUrl}/releases`;

    document.querySelectorAll("[data-repo-link]").forEach((a) => {
      if (a instanceof HTMLAnchorElement) a.href = repoUrl;
    });
    document.querySelectorAll("[data-releases-link]").forEach((a) => {
      if (a instanceof HTMLAnchorElement) a.href = releasesUrl;
    });
  }

  function wireAnchorFocusFix() {
    // SPAではないけど、キーボード導線としてアンカー遷移後に見出しへフォーカス
    const hash = window.location.hash;
    if (!hash) return;
    const el = document.querySelector(hash);
    if (el && el instanceof HTMLElement) {
      el.setAttribute("tabindex", "-1");
      el.focus({ preventScroll: true });
      el.addEventListener(
        "blur",
        () => {
          el.removeAttribute("tabindex");
        },
        { once: true }
      );
    }
  }

  function parallaxPanel() {
    const panel = document.querySelector(".panel-mock");
    if (!panel) return;
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let raf = 0;
    function onMove(e) {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      window.cancelAnimationFrame(raf);
      raf = window.requestAnimationFrame(() => {
        panel.style.transform = `perspective(900px) rotateX(${(-y * 3).toFixed(2)}deg) rotateY(${(x * 4).toFixed(
          2
        )}deg) translateY(-2px)`;
      });
    }
    function onLeave() {
      panel.style.transform = "translateY(0)";
    }
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave, { passive: true });
  }

  /** @returns {Lang | null} */
  function langFromQuery() {
    const sp = new URLSearchParams(window.location.search);
    const l = (sp.get("lang") || "").toLowerCase();
    if (l === "ja" || l === "en") return /** @type {Lang} */ (l);
    return null;
  }

  /** @returns {Lang} */
  function langFromNavigator() {
    const langs = Array.isArray(navigator.languages) ? navigator.languages : [navigator.language].filter(Boolean);
    for (const l of langs) {
      const low = String(l || "").toLowerCase();
      if (low.startsWith("ja")) return "ja";
      if (low.startsWith("en")) return "en";
    }
    return "en";
  }

  /** @returns {Lang} */
  function getPreferredLang() {
    const q = langFromQuery();
    if (q) return q;
    const saved = (safeStorageGet(STORAGE_KEY) || "").toLowerCase();
    if (saved === "ja" || saved === "en") return /** @type {Lang} */ (saved);
    return langFromNavigator();
  }

  /** @param {Lang} lang */
  function applyI18n(lang) {
    const base = BASE_I18N || {};
    const dict = lang === "ja" ? base : I18N[lang] || I18N.en;
    document.documentElement.lang = lang;
    document.documentElement.setAttribute("data-lang", lang);

    // data-i18n -> innerHTML (to support <strong>, <br>, <code>)
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n") || "";
      const val = dict[key] ?? I18N.en[key] ?? base[key];
      if (typeof val !== "string") return;
      el.innerHTML = val;
    });

    // Toggle active state
    document.querySelectorAll("[data-set-lang]").forEach((btn) => {
      const v = btn.getAttribute("data-set-lang");
      btn.classList.toggle("is-active", v === lang);
      if (btn instanceof HTMLElement) btn.setAttribute("aria-pressed", v === lang ? "true" : "false");
    });

    // Title
    const titleEl = document.querySelector("title[data-i18n-title]");
    if (titleEl) {
      const titleKey = titleEl.getAttribute("data-i18n-title") || "";
      const titleText = dict[titleKey] ?? I18N.en[titleKey] ?? base[titleKey];
      if (typeof titleText === "string") {
        document.title = titleText;
      }
    } else {
      // Fallback for pages without data-i18n-title
      document.title = lang === "ja" ? "ClipRack" : "ClipRack";
    }
  }

  function wireLangToggle() {
    document.querySelectorAll("[data-set-lang]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const v = btn.getAttribute("data-set-lang");
        if (v !== "ja" && v !== "en") return;
        safeStorageSet(STORAGE_KEY, v);
        applyI18n(v);
        showToast(v === "ja" ? "日本語に切り替えました" : "Switched to English");
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    setYear();
    applyRepoLinks();
    BASE_I18N = captureBaseI18nFromDom();
    applyI18n(getPreferredLang());
    wireLangToggle();
    wireCopyButtons();
    wireAnchorFocusFix();
    parallaxPanel();
  });
})();
