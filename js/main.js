(function () {
  "use strict";
  document.documentElement.classList.remove("no-js");

  /* ---- Header: transparent over hero, solid after scrolling ---- */
  var header = document.querySelector(".site-header");
  if (header && header.classList.contains("is-overlay")) {
    var onScroll = function () {
      header.classList.toggle("is-solid", window.scrollY > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---- Menu drawer ---- */
  var drawer = document.getElementById("menu");
  var openBtn = document.querySelector("[data-menu-open]");
  var lastFocus = null;

  function focusables() {
    return drawer.querySelectorAll('a[href], button:not([disabled])');
  }
  function openMenu() {
    lastFocus = document.activeElement;
    drawer.classList.add("is-open");
    drawer.removeAttribute("inert");
    drawer.setAttribute("aria-hidden", "false");
    openBtn.setAttribute("aria-expanded", "true");
    document.body.classList.add("no-scroll");
    var f = focusables();
    if (f.length) setTimeout(function () { f[0].focus(); }, 60);
  }
  function closeMenu() {
    drawer.classList.remove("is-open");
    drawer.setAttribute("inert", "");
    drawer.setAttribute("aria-hidden", "true");
    openBtn.setAttribute("aria-expanded", "false");
    document.body.classList.remove("no-scroll");
    if (lastFocus) lastFocus.focus();
  }
  if (drawer && openBtn) {
    openBtn.addEventListener("click", openMenu);
    drawer.querySelectorAll("[data-menu-close]").forEach(function (el) {
      el.addEventListener("click", closeMenu);
    });
    document.addEventListener("keydown", function (e) {
      if (!drawer.classList.contains("is-open")) return;
      if (e.key === "Escape") closeMenu();
      if (e.key === "Tab") {
        var f = focusables(), first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }

  /* ---- Reveal on scroll ---- */
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.querySelectorAll("video.hero-video").forEach(function (v) {
    if (reduce) { v.removeAttribute("autoplay"); v.pause(); }
  });
  var reveals = document.querySelectorAll(".reveal");
  if (reduce || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add("is-in"); io.unobserve(entry.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ---- Enquiry form ----
     The site has no server, so the form opens the visitor's email app with
     the enquiry pre-filled, addressed to the Odyssey team. Swap this for a
     form service (Formspree, Tally, HubSpot...) when one is chosen. */
  var form = document.getElementById("enquiry-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true;
      form.querySelectorAll("[required]").forEach(function (input) {
        var field = input.closest(".field");
        var valid = input.checkValidity();
        field.classList.toggle("has-error", !valid);
        input.setAttribute("aria-invalid", valid ? "false" : "true");
        if (!valid && ok) { input.focus(); ok = false; }
      });
      if (!ok) return;

      var d = new FormData(form);
      var lines = [
        "Parent / guardian: " + d.get("name"),
        "Email: " + d.get("email"),
        "Phone / WhatsApp: " + (d.get("phone") || "-"),
        "Student age: " + d.get("age"),
        "Current school & curriculum: " + (d.get("school") || "-"),
        "Interested in: " + (d.getAll("interest").join(", ") || "-"),
        "Preferred contact: " + (d.get("contact") || "-"),
        "",
        d.get("message") || ""
      ];
      var subject = "Odyssey enquiry — " + d.get("name");
      var href = "mailto:" + form.dataset.to +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(lines.join("\n"));
      window.location.href = href;
      var status = form.querySelector(".form-status");
      if (status) status.textContent = "Your email app should now open with your enquiry ready to send. If it doesn't, write to " + form.dataset.to + ".";
    });
    form.querySelectorAll("[required]").forEach(function (input) {
      input.addEventListener("input", function () {
        if (input.checkValidity()) {
          input.closest(".field").classList.remove("has-error");
          input.setAttribute("aria-invalid", "false");
        }
      });
    });
  }

  /* ---- Year ---- */
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
