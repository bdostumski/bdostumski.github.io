/* ============================================================
   Doom Emacs–inspired interactive features
   ============================================================ */

(function () {
  "use strict";

  /* ---------- Mobile hamburger menu ---------- */
  function initMobileNav() {
    var header = document.querySelector(".site-header");
    var nav = document.querySelector(".site-nav");
    if (!header || !nav) return;

    // Create hamburger button
    var toggle = document.createElement("button");
    toggle.className = "nav-toggle";
    toggle.setAttribute("aria-label", "Toggle navigation");
    toggle.innerHTML = "☰";
    header.insertBefore(toggle, nav);

    toggle.addEventListener("click", function () {
      nav.classList.toggle("open");
      toggle.innerHTML = nav.classList.contains("open") ? "✕" : "☰";
    });

    // Close menu when clicking a link
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.innerHTML = "☰";
      });
    });
  }

  /* ---------- Highlight active nav link ---------- */
  function highlightActiveNav() {
    var path = window.location.pathname;
    document.querySelectorAll(".site-nav a").forEach(function (a) {
      var href = a.getAttribute("href");
      if (
        path === href ||
        (href !== "/" && href !== "/index.html" && path.startsWith(href.replace(".html", "")))
      ) {
        a.classList.add("active");
      }
      // Home link
      if ((path === "/" || path === "/index.html") && (href === "/" || href === "/index.html")) {
        a.classList.add("active");
      }
    });
  }

  /* ---------- Doom modeline ---------- */
  function initModeline() {
    // Don't add if already exists
    if (document.querySelector(".modeline")) return;

    var modeline = document.createElement("div");
    modeline.className = "modeline";

    var now = new Date();
    var time = now.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
    var page = document.title || "untitled";
    var path = window.location.pathname || "/";

    modeline.innerHTML =
      '<div class="modeline-left">' +
      '  <span class="ml-evil-state">NORMAL</span>' +
      '  <span class="ml-major-mode">org-mode</span>' +
      '  <span class="ml-branch">main</span>' +
      "</div>" +
      '<div class="modeline-right">' +
      '  <span class="ml-buffer">' + escapeHtml(page) + "</span>" +
      '  <span class="ml-position">' + escapeHtml(path) + "</span>" +
      '  <span class="ml-time">' + time + "</span>" +
      "</div>";

    document.body.appendChild(modeline);
  }

  /* ---------- Copy button for code blocks ---------- */
  function initCodeCopy() {
    document.querySelectorAll(".org-src-container").forEach(function (container) {
      var btn = document.createElement("button");
      btn.className = "code-copy-btn";
      btn.textContent = "⎘ Copy";
      btn.style.cssText =
        "position:absolute;top:0.4rem;right:4rem;" +
        "font-family:var(--font-mono);font-size:0.7rem;" +
        "color:var(--fg-alt);background:var(--bg-alt);" +
        "border:1px solid var(--border);border-radius:3px;" +
        "padding:0.15rem 0.5rem;cursor:pointer;" +
        "transition:all 0.2s ease;z-index:10;";

      btn.addEventListener("mouseenter", function () {
        btn.style.color = "var(--cyan)";
        btn.style.borderColor = "var(--cyan)";
      });
      btn.addEventListener("mouseleave", function () {
        btn.style.color = "var(--fg-alt)";
        btn.style.borderColor = "var(--border)";
      });

      btn.addEventListener("click", function () {
        var pre = container.querySelector("pre");
        if (!pre) return;
        var text = pre.textContent || pre.innerText;
        navigator.clipboard.writeText(text).then(function () {
          btn.textContent = "✓ Copied!";
          btn.style.color = "var(--green)";
          setTimeout(function () {
            btn.textContent = "⎘ Copy";
            btn.style.color = "var(--fg-alt)";
          }, 2000);
        });
      });

      container.style.position = "relative";
      container.appendChild(btn);
    });
  }

  /* ---------- Smooth heading anchor links ---------- */
  function initHeadingLinks() {
    document
      .querySelectorAll("h2[id], h3[id], h4[id], h5[id], h6[id]")
      .forEach(function (heading) {
        heading.style.cursor = "pointer";
        heading.addEventListener("click", function () {
          var url = window.location.origin + window.location.pathname + "#" + heading.id;
          navigator.clipboard.writeText(url);
          // Brief flash effect
          heading.style.textShadow = "0 0 12px rgba(198,120,221,0.5)";
          setTimeout(function () {
            heading.style.textShadow = "none";
          }, 600);
        });
      });
  }

  /* ---------- Which-key style keyboard shortcuts ---------- */
  function initWhichKey() {
    var popup = document.createElement("div");
    popup.className = "which-key";
    popup.innerHTML =
      '<span class="key">?</span><span class="desc">toggle help</span> · ' +
      '<span class="key">t</span><span class="desc">top</span> · ' +
      '<span class="key">b</span><span class="desc">bottom</span> · ' +
      '<span class="key">h</span><span class="desc">home</span>';
    document.body.appendChild(popup);

    var showHelp = false;

    document.addEventListener("keydown", function (e) {
      // Don't capture if typing in an input
      if (
        e.target.tagName === "INPUT" ||
        e.target.tagName === "TEXTAREA" ||
        e.target.isContentEditable
      )
        return;

      switch (e.key) {
        case "?":
          showHelp = !showHelp;
          popup.style.display = showHelp ? "block" : "none";
          break;
        case "t":
          window.scrollTo({ top: 0, behavior: "smooth" });
          break;
        case "b":
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth",
          });
          break;
        case "h":
          window.location.href = "/";
          break;
      }
    });
  }

  /* ---------- Utility ---------- */
  function escapeHtml(text) {
    var div = document.createElement("div");
    div.appendChild(document.createTextNode(text));
    return div.innerHTML;
  }

  /* ---------- Evil mode state in modeline ---------- */
  function initEvilStateModeline() {
    var stateEl = document.querySelector(".ml-evil-state");
    if (!stateEl) return;

    var states = {
      NORMAL:  { color: "var(--blue)",    bg: "rgba(81,175,239,0.15)" },
      INSERT:  { color: "var(--green)",   bg: "rgba(152,190,101,0.15)" },
      VISUAL:  { color: "var(--magenta)", bg: "rgba(198,120,221,0.15)" },
      EMACS:   { color: "var(--violet)",  bg: "rgba(169,161,225,0.15)" },
    };

    function setStyle(state) {
      var s = states[state] || states.NORMAL;
      stateEl.textContent = state;
      stateEl.style.color = s.color;
      stateEl.style.background = s.bg;
      stateEl.style.padding = "0.1rem 0.4rem";
      stateEl.style.borderRadius = "3px";
      stateEl.style.fontWeight = "bold";
      stateEl.style.fontSize = "0.7rem";
    }

    setStyle("NORMAL");

    // Fun: cycle states on click
    var stateKeys = Object.keys(states);
    var idx = 0;
    stateEl.style.cursor = "pointer";
    stateEl.addEventListener("click", function () {
      idx = (idx + 1) % stateKeys.length;
      setStyle(stateKeys[idx]);
    });
  }

  /* ---------- Update clock in modeline ---------- */
  function initClock() {
    var timeEl = document.querySelector(".ml-time");
    if (!timeEl) return;
    setInterval(function () {
      var now = new Date();
      timeEl.textContent = now.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      });
    }, 60000);
  }

  /* ---------- Init everything on DOM ready ---------- */
  function init() {
    initMobileNav();
    highlightActiveNav();
    initModeline();
    initEvilStateModeline();
    initClock();
    initCodeCopy();
    initHeadingLinks();
    initWhichKey();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
