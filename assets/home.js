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

    function setOpen(open) {
      menu.hidden = !open;
      if (open) menu.style.display = "block";
      else menu.style.display = "";
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    }

    setOpen(false);
    toggle.addEventListener("click", function () {
      setOpen(menu.hidden);
    });
    menu.querySelectorAll("[data-menu-close]").forEach(function (a) {
      a.addEventListener("click", function () { setOpen(false); });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !menu.hidden) {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  /* --- Apps menu (desktop nav disclosure) --------------------------------- */
  function initAppsMenu() {
    var root = document.querySelector("[data-apps-menu]");
    if (!root) return;
    var toggle = root.querySelector("button[aria-controls]");
    var panel = document.getElementById(toggle.getAttribute("aria-controls"));

    function setOpen(open) {
      panel.hidden = !open;
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    }

    setOpen(false);
    toggle.addEventListener("click", function () { setOpen(panel.hidden); });
    root.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !panel.hidden) {
        setOpen(false);
        toggle.focus();
      }
    });
    // Close when focus or a click leaves the menu.
    root.addEventListener("focusout", function (e) {
      if (!root.contains(e.relatedTarget)) setOpen(false);
    });
    document.addEventListener("click", function (e) {
      if (!root.contains(e.target)) setOpen(false);
    });
  }

  /* --- FAQ accordion ------------------------------------------------------ */
  function initFaq() {
    document.querySelectorAll("[data-faq]").forEach(function (btn) {
      var body = document.getElementById(btn.getAttribute("aria-controls"));
      var caret = btn.querySelector("[data-faq-caret]");
      if (!body) return;

      function setOpen(open) {
        btn.setAttribute("aria-expanded", open ? "true" : "false");
        body.hidden = !open;
        if (caret) caret.style.transform = open ? "rotate(180deg)" : "none";
      }

      setOpen(false);
      btn.addEventListener("click", function () {
        setOpen(btn.getAttribute("aria-expanded") !== "true");
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

  /* --- Nav: transparent at top, solid + mid-links after scroll ------------ */
  function initNav() {
    var nav = document.querySelector("[data-nav]");
    if (!nav) return;
    function onScroll() {
      nav.classList.toggle("is-scrolled", window.scrollY > 40);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* --- Hero parallax: desktop + phone slide at different scroll speeds ---- */
  function initHeroParallax() {
    if (reduced) return;
    var nodes = Array.prototype.slice.call(document.querySelectorAll("[data-parallax]"));
    if (!nodes.length) return;
    var hero = document.querySelector(".kb-hero");
    if (!hero) return;
    var ticking = false;
    var desktopMq = window.matchMedia("(min-width: 901px)");

    function apply() {
      ticking = false;
      var y = window.scrollY || 0;
      var range = Math.max(hero.offsetHeight, 1);
      // Clamp so motion stays subtle once the hero has scrolled away
      var t = Math.min(Math.max(y, 0), range);
      nodes.forEach(function (el) {
        // Parallax is desktop-only — skip transforms on small screens
        if (!desktopMq.matches) {
          el.style.transform = "";
          return;
        }
        var speed = parseFloat(el.getAttribute("data-parallax-speed") || "0.2");
        if (!isFinite(speed)) speed = 0.2;
        // Scroll down → slide up; scroll up → reverse
        el.style.transform = "translate3d(0," + (-t * speed) + "px,0)";
      });
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(apply);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    if (desktopMq.addEventListener) desktopMq.addEventListener("change", onScroll);
    else if (desktopMq.addListener) desktopMq.addListener(onScroll);
    apply();
  }

  /* --- Live queue counter ------------------------------------------------- */
  function initQueue() {
    var el = document.querySelector("[data-queue-count]");
    if (!el) return;
    var n = 94;
    function tickOnce() { n = n <= 88 ? 94 : n - 1; el.textContent = n; }
    function start() {
      if (tick) return;
      tick = setInterval(tickOnce, 3500);
    }
    function stop() {
      if (!tick) return;
      clearInterval(tick);
      tick = null;
    }
    start();
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) stop();
      else start();
    });
  }

  /* --- Interactive hero dot-grid ------------------------------------------ */
  function initGrid() {
    var cv = document.querySelector("[data-grid]");
    if (!cv) return;
    var ctx = cv.getContext("2d");
    var state = { w: 0, h: 0, mx: -9999, my: -9999, t: 0, running: false };
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
      if (!state.running) return;
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
    function start() {
      if (state.running) return;
      state.running = true;
      raf = requestAnimationFrame(draw);
    }
    function stop() {
      state.running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = null;
    }
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && !document.hidden) start();
          else stop();
        });
      }, { rootMargin: "0px", threshold: 0 });
      io.observe(cv);
    } else {
      start();
    }
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) stop();
      else {
        var r = cv.getBoundingClientRect();
        if (r.bottom > 0 && r.top < (window.innerHeight || 800)) start();
      }
    });
  }

  /* --- Lightboxes (testimonial video + demo booking) ---------------------- */
  function initLightboxes() {
    var boxes = document.querySelectorAll("[data-lightbox]");
    if (!boxes.length) return;
    var lastFocus = null;
    var activeBox = null;

    function focusable(root) {
      return Array.prototype.slice.call(
        root.querySelectorAll(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        )
      ).filter(function (el) {
        return !el.hasAttribute("disabled") && el.getClientRects().length > 0;
      });
    }

    function boxFor(name) {
      return document.querySelector('[data-lightbox="' + name + '"]');
    }

    function open(box) {
      if (!box) return;
      lastFocus = document.activeElement;
      activeBox = box;
      box.hidden = false;
      box.style.display = "flex";
      document.body.style.overflow = "hidden";
      var closeBtn = box.querySelector("[data-lightbox-close]");
      if (closeBtn) closeBtn.focus();
      else {
        var items = focusable(box);
        if (items[0]) items[0].focus();
      }
    }

    function close(box) {
      if (!box) return;
      box.hidden = true;
      box.style.display = "";
      if (activeBox === box) activeBox = null;
      document.body.style.overflow = "";
      if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
      lastFocus = null;
    }

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
      box.hidden = true;
      box.style.display = "";
      box.querySelectorAll("[data-lightbox-close]").forEach(function (b) {
        b.addEventListener("click", function () { close(box); });
      });
      box.addEventListener("click", function (e) { if (e.target === box) close(box); });
    });
    document.addEventListener("keydown", function (e) {
      if (!activeBox) return;
      if (e.key === "Escape") {
        close(activeBox);
        return;
      }
      if (e.key !== "Tab") return;
      var items = focusable(activeBox);
      if (!items.length) return;
      var first = items[0];
      var last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });
  }

  /* --- "How it works" app switcher: prev/next between apps --------------- */
  function initHowNav() {
    var panels = Array.prototype.slice.call(document.querySelectorAll("[data-how-panel]"));
    if (!panels.length) return;
    function current() {
      for (var i = 0; i < panels.length; i++) { if (!panels[i].hidden) return i; }
      return 0;
    }
    var eyebrow = document.querySelector("[data-how-eyebrow]");
    function rawShow(idx) {
      idx = (idx + panels.length) % panels.length;
      panels.forEach(function (p, i) { p.hidden = i !== idx; });
      var color = panels[idx].getAttribute("data-how-color");
      if (eyebrow && color) eyebrow.style.color = color;
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
    initAppsMenu();
    initFaq();
    initLightboxes();
    initHowNav();
    initReveal();
    initCounters();
    initNav();
    if (!reduced) { initGrid(); initQueue(); initHeroParallax(); }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
