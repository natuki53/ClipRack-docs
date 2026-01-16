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
      "perm.ng.1": "Shows instructions inside the app",
      "perm.ng.2": "Follow the steps to grant permission",
      "perm.steps.title": "How to enable",
      "perm.steps.1": "<strong>System Settings</strong> → <strong>Privacy & Security</strong> → <strong>Accessibility</strong>",
      "perm.steps.2": "Allow <strong>ClipRack</strong>",

      "dl.title": "Get it",
      "dl.lead": "Download from App Store or TestFlight to try it out.",
      "dl.releases.title": "GitHub Releases",
      "dl.releases.text": "Download the latest build",
      "dl.releases.hint": "DMG/ZIP, etc. (If not available yet, it will be added later.)",
      "dl.support.title": "Support / Feedback",
      "dl.support.text": "Bug reports and ideas welcome",
      "dl.support.hint": "GitHub (Issues/Discussions)",

      "footer.top": "Back to top",
      "footer.privacy": "Privacy Policy",
      "footer.github": "GitHub",

      "notfound.text": "Page not found. The link may be outdated.",
      "notfound.back": "Back to home",

      "privacy.title": "Privacy Policy",
      "privacy.lead": "Last updated: ",
      "privacy.intro": "ClipRack (hereinafter referred to as \"this app\") respects user privacy. This privacy policy explains how this app collects, uses, and stores information.",
      "privacy.important.title": "Key Points",
      "privacy.important.1": "This app stores all data <strong>only on your local device</strong>",
      "privacy.important.2": "Data is <strong>never</strong> sent to external servers",
      "privacy.important.3": "Data is <strong>never</strong> shared with third parties",
      "privacy.important.4": "No analytics or tracking tools are used",
      "privacy.section1.title": "1. Information Collected",
      "privacy.section1.text": "To provide clipboard history functionality, this app stores the following information on your local device:",
      "privacy.section1.item1": "<strong>Clipboard Data</strong>: Clipboard contents such as text, images, file paths, URLs, etc.",
      "privacy.section1.item2": "<strong>Application Settings</strong>: Shortcut keys, theme settings, and other user preferences",
      "privacy.section1.item3": "<strong>Pinned Items</strong>: Clipboard items that users have pinned",
      "privacy.section2.title": "2. Data Storage Location",
      "privacy.section2.text": "All data is stored in macOS's standard application data directory (<code>~/Library/Application Support/ClipRack</code>). This data exists only on the user's device and is never sent externally.",
      "privacy.section3.title": "3. Purpose of Data Use",
      "privacy.section3.text": "Collected data is used only for the following purposes:",
      "privacy.section3.item1": "Display and management of clipboard history",
      "privacy.section3.item2": "Providing paste functionality for user-selected items",
      "privacy.section3.item3": "Saving and restoring application settings",
      "privacy.section3.item4": "Providing pin functionality",
      "privacy.section4.title": "4. Data Sharing",
      "privacy.section4.text": "This app does not share collected data with third parties. Data is stored only on the user's device and is never sent to external servers.",
      "privacy.section5.title": "5. Required Permissions",
      "privacy.section5.text": "This app requires the following macOS permissions:",
      "privacy.section5.item1": "<strong>Accessibility Permission</strong>: Required to automatically paste selected clipboard items",
      "privacy.section5.item2": "<strong>Clipboard Access</strong>: Required to read clipboard contents (standard macOS feature)",
      "privacy.section5.note": "These permissions are used only to provide the core functionality of this app and are not used for any other purpose.",
      "privacy.section6.title": "6. Data Deletion",
      "privacy.section6.text": "Users can delete non-pinned clipboard history using the \"Clear All\" feature within the app. Uninstalling the app will delete all data from the device.",
      "privacy.section7.title": "7. Security",
      "privacy.section7.text": "This app protects user privacy by storing data only on the local device. While data is not encrypted, macOS's standard file system protection prevents access by other applications.",
      "privacy.section8.title": "8. Age Restrictions",
      "privacy.section8.text": "This app is intended for all ages and has no age restrictions.",
      "privacy.section9.title": "9. Privacy Policy Changes",
      "privacy.section9.text": "This privacy policy may be changed without notice. If there are significant changes, we will notify you on this page. Continued use of this app after changes constitutes acceptance of the updated privacy policy.",
      "privacy.section10.title": "10. Contact",
      "privacy.section10.text": "If you have any questions or comments regarding this privacy policy, please contact us through any of the following methods:",
      "privacy.section10.item1": "<strong>App Store</strong>: From the app's review or support page",
      "privacy.section10.item2": "<strong>TestFlight</strong>: From the feedback feature within the TestFlight app",
      "privacy.section10.item3": "<strong><a href=\"https://github.com/natuki53/ClipRack-docs/issues\">GitHub Issues</a></strong>: From the GitHub repository's Issues page",
      "privacy.skip": "Skip to content",
      "privacy.page.title": "Privacy Policy — ClipRack",
      "privacy.page.description": "ClipRack's privacy policy. Explains how clipboard data is handled, what information is collected, and how data is stored.",
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

  function setDate() {
    const d = new Date();
    const y = d.getFullYear();
    const m = d.getMonth() + 1;
    const day = d.getDate();
    document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = String(y)));
    document.querySelectorAll("[data-month]").forEach((el) => (el.textContent = String(m)));
    document.querySelectorAll("[data-day]").forEach((el) => (el.textContent = String(day)));
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
    setDate();
    applyRepoLinks();
    BASE_I18N = captureBaseI18nFromDom();
    applyI18n(getPreferredLang());
    wireLangToggle();
    wireCopyButtons();
    wireAnchorFocusFix();
    parallaxPanel();
  });
})();

