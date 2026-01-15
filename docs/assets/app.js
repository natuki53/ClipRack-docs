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
      "dl.lead": "Download the latest build from Releases.",
      "dl.releases.title": "GitHub Releases",
      "dl.releases.text": "Download the latest build",
      "dl.releases.hint": "DMG/ZIP, etc. (If not available yet, it will be added later.)",
      "dl.support.title": "Support / Feedback",
      "dl.support.text": "Bug reports and ideas welcome",
      "dl.support.hint": "GitHub (Issues/Discussions)",

      "footer.top": "Back to top",
      "footer.github": "GitHub",

      "notfound.text": "Page not found. The link may be outdated.",
      "notfound.back": "Back to home",
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
    document.title = lang === "ja" ? "ClipRack" : "ClipRack";
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

