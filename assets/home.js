/* ==========================================================================
   Kickback homepage interactions
   Vanilla port of the design's runtime: theme toggle, mobile menu, FAQ
   accordion, scroll reveals, stat counters, nav shrink, live queue counter,
   and the interactive hero dot-grid canvas.
   ========================================================================== */
(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var dark = false;
  var raf, tick;

  /* --- Theme (follows the device colour scheme) --------------------------- */
  function applyTheme(mode) {
    document.documentElement.setAttribute("data-theme", mode);
    dark = mode === "dark";
    document.querySelectorAll("[data-logo]").forEach(function (img) {
      img.src = dark ? "/assets/wordmark-on-dark.svg" : "/assets/wordmark-on-light.svg";
    });
  }

  function initTheme() {
    var mq = window.matchMedia("(prefers-color-scheme: dark)");
    applyTheme(mq.matches ? "dark" : "light");
    var onChange = function (e) { applyTheme(e.matches ? "dark" : "light"); };
    if (mq.addEventListener) mq.addEventListener("change", onChange);
    else if (mq.addListener) mq.addListener(onChange);
  }

  /* --- Mobile menu -------------------------------------------------------- */
  function initMenu() {
    var toggle = document.querySelector("[data-menu-toggle]");
    var menu = document.querySelector("[data-menu]");
    if (!toggle || !menu) return;
    toggle.addEventListener("click", function () {
      menu.style.display = menu.style.display === "block" ? "none" : "block";
    });
    menu.querySelectorAll("[data-menu-close]").forEach(function (a) {
      a.addEventListener("click", function () { menu.style.display = "none"; });
    });
  }

  /* --- FAQ accordion ------------------------------------------------------ */
  function initFaq() {
    document.querySelectorAll("[data-faq]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var body = btn.parentNode.querySelector("[data-faq-body]");
        var caret = btn.querySelector("[data-faq-caret]");
        var open = body.style.maxHeight && body.style.maxHeight !== "0px";
        body.style.maxHeight = open ? "0px" : body.scrollHeight + 40 + "px";
        if (caret) caret.style.transform = open ? "none" : "rotate(180deg)";
      });
    });
  }

  /* --- Scroll reveal ------------------------------------------------------ */
  function initReveal() {
    var els = Array.prototype.slice.call(document.querySelectorAll("[data-reveal]"));
    if (reduced || !els.length) return;
    function show(el) {
      if (el.dataset.shown) return;
      el.dataset.shown = "1";
      el.style.opacity = "1";
      el.style.transform = "none";
    }
    els.forEach(function (el) {
      el.style.opacity = "0";
      el.style.transform = "translateY(16px)";
      el.style.transition =
        "opacity 420ms cubic-bezier(0.22,1,0.36,1), transform 420ms cubic-bezier(0.22,1,0.36,1)";
      el.style.transitionDelay = (el.getAttribute("data-delay") || 0) + "ms";
    });
    if ("IntersectionObserver" in window) {
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { show(e.target); obs.unobserve(e.target); }
        });
      }, { rootMargin: "0px 0px -12% 0px", threshold: 0 });
      els.forEach(function (el) { obs.observe(el); });
    } else {
      els.forEach(show);
    }
    setTimeout(function () {
      var h = window.innerHeight || 800;
      els.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < h && r.bottom > 0) show(el);
      });
    }, 1500);
  }

  /* --- Stat counters ------------------------------------------------------ */
  function initCounters() {
    var els = Array.prototype.slice.call(document.querySelectorAll("[data-count]"));
    if (!els.length) return;
    function fmt(n, suffix) { return n.toLocaleString("en-US") + (suffix || ""); }
    function run(el) {
      if (el.dataset.counted) return;
      el.dataset.counted = "1";
      var target = parseInt(el.getAttribute("data-count"), 10);
      var suffix = el.getAttribute("data-suffix") || "";
      if (reduced) { el.textContent = fmt(target, suffix); return; }
      var dur = 1100, t0 = performance.now();
      function step(t) {
        var p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3);
        el.textContent = fmt(Math.round(target * e), suffix);
        if (p < 1) requestAnimationFrame(step);
      }
      el.textContent = fmt(0, suffix);
      requestAnimationFrame(step);
    }
    function pass() {
      var h = window.innerHeight || 800;
      els.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < h * 0.88 && r.bottom > 0) run(el);
      });
    }
    window.addEventListener("scroll", pass, { passive: true });
    window.addEventListener("resize", pass);
    pass();
  }

  /* --- Nav shrink --------------------------------------------------------- */
  function initNav() {
    var nav = document.querySelector("[data-nav]");
    var inner = document.querySelector("[data-nav-inner]");
    if (!nav || !inner) return;
    function onScroll() {
      var scrolled = window.scrollY > 40;
      // taller & borderless at the top; shorter with a bottom border once scrolling
      inner.style.height = scrolled ? "72px" : "80px";
      nav.style.borderBottomColor = scrolled ? "var(--border-subtle)" : "transparent";
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* --- Live queue counter ------------------------------------------------- */
  function initQueue() {
    var el = document.querySelector("[data-queue-count]");
    if (!el) return;
    var n = 94;
    tick = setInterval(function () { n = n <= 88 ? 94 : n - 1; el.textContent = n; }, 3500);
  }

  /* --- Interactive hero dot-grid ------------------------------------------ */
  function initGrid() {
    var cv = document.querySelector("[data-grid]");
    if (!cv) return;
    var ctx = cv.getContext("2d");
    var state = { w: 0, h: 0, mx: -9999, my: -9999, t: 0 };
    var dpr = Math.min(2, window.devicePixelRatio || 1);
    function size() {
      var r = cv.getBoundingClientRect();
      state.w = r.width; state.h = r.height;
      cv.width = Math.max(1, r.width * dpr); cv.height = Math.max(1, r.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    size();
    window.addEventListener("resize", size);
    var host = cv.parentNode;
    host.addEventListener("pointermove", function (e) {
      var r = cv.getBoundingClientRect();
      state.mx = e.clientX - r.left; state.my = e.clientY - r.top;
    });
    host.addEventListener("pointerleave", function () { state.mx = -9999; state.my = -9999; });
    var gap = 20, R = 130;
    function draw() {
      state.t += 0.006;
      ctx.clearRect(0, 0, state.w, state.h);
      for (var y = gap / 2; y < state.h; y += gap) {
        for (var x = gap / 2; x < state.w; x += gap) {
          var drift = Math.sin(state.t + x * 0.014 + y * 0.02) * 1.1;
          var px = x, py = y + drift, r = 1, a = 0.28, red = 0;
          var dx = state.mx - x, dy = state.my - y;
          var d = Math.sqrt(dx * dx + dy * dy);
          if (d < R) {
            var f = 1 - d / R;
            var pull = f * f * 7;
            px += (dx / (d || 1)) * pull; py += (dy / (d || 1)) * pull;
            r = 1 + f * f * 1.7; a = 0.28 + f * 0.62; red = f;
          }
          ctx.beginPath();
          ctx.arc(px, py, r, 0, 6.2832);
          var base = dark ? [124, 116, 107] : [168, 150, 142];
          ctx.fillStyle = red > 0.02
            ? "rgba(" + Math.round(base[0] + red * (222 - base[0])) + "," +
              Math.round(base[1] - red * (base[1] - 68)) + "," +
              Math.round(base[2] - red * (base[2] - 68)) + "," + a + ")"
            : "rgba(" + base[0] + "," + base[1] + "," + base[2] + "," + a + ")";
          ctx.fill();
        }
      }
      raf = requestAnimationFrame(draw);
    }
    draw();
  }

  /* --- Lightboxes (testimonial video + demo booking) ---------------------- */
  function initLightboxes() {
    var boxes = document.querySelectorAll("[data-lightbox]");
    if (!boxes.length) return;
    function boxFor(name) { return document.querySelector('[data-lightbox="' + name + '"]'); }
    function open(box) { if (!box) return; box.style.display = "flex"; document.body.style.overflow = "hidden"; }
    function close(box) { box.style.display = "none"; document.body.style.overflow = ""; }

    document.querySelectorAll("[data-lightbox-open]").forEach(function (el) {
      el.addEventListener("click", function (e) {
        e.preventDefault();
        open(boxFor(el.getAttribute("data-lightbox-open")));
      });
    });
    // Any "Book a Demo" link opens the booking lightbox instead of navigating.
    var booking = boxFor("booking");
    if (booking) {
      document.querySelectorAll('a[href$="/demo"]').forEach(function (a) {
        a.addEventListener("click", function (e) { e.preventDefault(); open(booking); });
      });
    }
    boxes.forEach(function (box) {
      box.querySelectorAll("[data-lightbox-close]").forEach(function (b) {
        b.addEventListener("click", function () { close(box); });
      });
      box.addEventListener("click", function (e) { if (e.target === box) close(box); });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      boxes.forEach(function (box) { if (box.style.display === "flex") close(box); });
    });
  }

  /* --- "How it works" app switcher — prev/next arrows --------------------- */
  function initHowNav() {
    var panels = Array.prototype.slice.call(document.querySelectorAll("[data-how-panel]"));
    if (!panels.length) return;
    function current() {
      for (var i = 0; i < panels.length; i++) { if (!panels[i].hidden) return i; }
      return 0;
    }
    function rawShow(idx) {
      idx = (idx + panels.length) % panels.length;
      panels.forEach(function (p, i) { p.hidden = i !== idx; });
    }
    function go(delta, sourceIcon) {
      var targetIdx = (current() + delta + panels.length) % panels.length;
      var targetPanel = panels[targetIdx];
      if (reduced || !document.startViewTransition) { rawShow(targetIdx); return; }
      // Morph the little preview icon into the incoming headline icon: give both
      // the same view-transition-name (source before the swap, target after).
      var targetIcon = sourceIcon ? targetPanel.querySelector(".kb-hword-icon") : null;
      if (sourceIcon && targetIcon) sourceIcon.style.viewTransitionName = "how-hero-icon";
      var vt = document.startViewTransition(function () {
        rawShow(targetIdx);
        if (sourceIcon && targetIcon) targetIcon.style.viewTransitionName = "how-hero-icon";
      });
      vt.finished.finally(function () {
        if (sourceIcon) sourceIcon.style.viewTransitionName = "";
        if (targetIcon) targetIcon.style.viewTransitionName = "";
      });
    }
    document.querySelectorAll("[data-how-next]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        go(1, btn.parentNode.querySelector(".how-next-icon"));
      });
    });
    document.querySelectorAll("[data-how-prev]").forEach(function (btn) {
      btn.addEventListener("click", function () { go(-1, null); });
    });
  }

  function init() {
    initTheme();
    initMenu();
    initFaq();
    initLightboxes();
    initHowNav();
    initReveal();
    initCounters();
    initNav();
    if (!reduced) { initGrid(); initQueue(); }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
