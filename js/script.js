"use strict";

const isArabic = document.documentElement.lang === "ar";
const formCopy = isArabic
  ? {
      required: {
        name: "يرجى إدخال اسمك.",
        email: "يرجى إدخال بريدك الإلكتروني.",
        message: "يرجى كتابة رسالة.",
      },
      invalidEmail: "يرجى إدخال بريد إلكتروني صالح، مثل you@example.com.",
      tooLong: (limit) => `يرجى استخدام ${limit} حرفًا أو أقل.`,
      invalid: "يرجى مراجعة الحقول الموضّحة. لم تُرسل رسالتك.",
      valid:
        "بيانات رسالتك صالحة. هذا نموذج تجريبي، ولم تُرسل أو تُحفظ أي معلومات. للتواصل، استخدم رابط البريد الإلكتروني المباشر.",
    }
  : {
      required: {
        name: "Please enter your name.",
        email: "Please enter your email address.",
        message: "Please write a message.",
      },
      invalidEmail: "Enter a valid email address, such as you@example.com.",
      tooLong: (limit) => `Please use ${limit} characters or fewer.`,
      invalid:
        "Please check the highlighted fields. Your message has not been sent.",
      valid:
        "Your message passes the form checks. This is a frontend demo — nothing has been sent or stored. Use the direct email link to get in touch.",
    };

// This is a nonmodal disclosure: keyboard focus follows normal page order.
const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#navigation");
const mobileLayout = window.matchMedia("(max-width: 767px)");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let menuAnimation = null;
let menuOpen = false;

function finishMenuAnimation() {
  navigation.hidden = mobileLayout.matches && !menuOpen;
  if (menuAnimation) {
    menuAnimation.onfinish = null;
    menuAnimation.cancel();
    menuAnimation = null;
  }
}

function setMenu(open, restoreFocus = false, animate = true) {
  if (restoreFocus) menuButton.focus();
  if (animate && open === menuOpen) return;
  menuOpen = open;
  menuButton.setAttribute("aria-expanded", String(open));
  navigation.inert = mobileLayout.matches && !open;
  if (!animate || !mobileLayout.matches || reducedMotion.matches || !navigation.animate) {
    finishMenuAnimation();
    return;
  }

  // Capture the current frame so a rapid toggle reverses without jumping.
  const collapsed = { opacity: 0, transform: "translateY(-8px) scale(.98)" };
  const expanded = { opacity: 1, transform: "translateY(0) scale(1)" };
  const current = getComputedStyle(navigation);
  const from = navigation.hidden
    ? collapsed
    : { opacity: current.opacity, transform: current.transform };
  if (menuAnimation) {
    menuAnimation.onfinish = null;
    menuAnimation.cancel();
  }
  navigation.hidden = false;
  menuAnimation = navigation.animate([from, open ? expanded : collapsed], {
    duration: open ? 280 : 220,
    easing: "cubic-bezier(.2,.8,.2,1)",
    fill: "both",
  });
  menuAnimation.onfinish = finishMenuAnimation;
}
function updateNavigation() {
  menuButton.hidden = !mobileLayout.matches;
  setMenu(false, false, false);
}
header.classList.add("is-enhanced");
updateNavigation();
mobileLayout.addEventListener("change", updateNavigation);
reducedMotion.addEventListener("change", finishMenuAnimation);
menuButton.addEventListener("click", () =>
  setMenu(menuButton.getAttribute("aria-expanded") !== "true"),
);
document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    mobileLayout.matches &&
    menuButton.getAttribute("aria-expanded") === "true"
  )
    setMenu(false, true);
});
document.addEventListener("click", (event) => {
  if (mobileLayout.matches && !header.contains(event.target)) setMenu(false);
});
header.addEventListener("focusout", () => {
  requestAnimationFrame(() => {
    if (mobileLayout.matches && !header.contains(document.activeElement))
      setMenu(false);
  });
});
navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    setMenu(false);
    const section = document.querySelector(link.hash);
    section.tabIndex = -1;
    section.focus({ preventScroll: true });
  });
});

// Shared disclosure motion for any native details with a summary and content div.
const disclosures = new Map();
function enhanceDisclosure(details) {
  const summary = details.querySelector(":scope > summary");
  const panel = details.querySelector(":scope > div");
  if (!summary || !panel || !panel.animate) return null;
  let animation = null;
  let targetOpen = details.open;

  function finish() {
    if (animation) {
      animation.onfinish = null;
      animation.cancel();
      animation = null;
    }
    details.open = targetOpen;
    details.classList.remove("is-closing");
    panel.style.removeProperty("overflow");
    panel.inert = false;
  }

  function setOpen(open) {
    if (open === targetOpen && (animation || details.open === open)) return;
    targetOpen = open;
    // Capture the current rendered height before cancelling, so rapid clicks reverse smoothly.
    const fromHeight = details.open ? panel.getBoundingClientRect().height : 0;
    if (animation) {
      animation.onfinish = null;
      animation.cancel();
      animation = null;
    }
    if (reducedMotion.matches) {
      finish();
      return;
    }
    if (!open && panel.contains(document.activeElement)) summary.focus();
    details.open = true;
    const toHeight = open ? panel.getBoundingClientRect().height : 0;
    details.classList.toggle("is-closing", !open);
    panel.inert = !open;
    panel.style.overflow = "hidden";
    animation = panel.animate(
      [{ height: `${fromHeight}px` }, { height: `${toHeight}px` }],
      { duration: 320, easing: "cubic-bezier(.2,.8,.2,1)" },
    );
    animation.onfinish = finish;
  }

  summary.addEventListener("click", (event) => {
    event.preventDefault();
    setOpen(!targetOpen);
  });
  return { setOpen, finish };
}
document.querySelectorAll("details").forEach((details) => {
  const controller = enhanceDisclosure(details);
  if (controller) disclosures.set(details, controller);
});
// Finish at natural height if the viewport or motion preference changes mid-transition.
window.addEventListener("resize", () =>
  disclosures.forEach((controller) => controller.finish()),
);
reducedMotion.addEventListener("change", () =>
  disclosures.forEach((controller) => controller.finish()),
);

function openProjectDetails(target) {
  if (!(target instanceof HTMLDetailsElement)) return;
  const controller = disclosures.get(target);
  if (controller) controller.setOpen(true);
  else target.open = true;
}
function openProjectFromHash() {
  openProjectDetails(document.getElementById(location.hash.slice(1)));
}
window.addEventListener("hashchange", openProjectFromHash);
document.querySelectorAll(".project-cover").forEach((link) => {
  link.addEventListener("click", () =>
    openProjectDetails(document.querySelector(link.hash)),
  );
});
openProjectFromHash();

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navigation.querySelectorAll("a").forEach((link) => {
          if (link.hash === `#${entry.target.id}`)
            link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      });
    },
    { rootMargin: "-15% 0px -55% 0px", threshold: 0 },
  );
  document
    .querySelectorAll("main > section")
    .forEach((section) => observer.observe(section));
}

const form = document.querySelector("#contact-form");
const submitButton = document.querySelector("#submit-button");
const status = document.querySelector("#form-status");
const fields = [...form.querySelectorAll("input, textarea")];
form.noValidate = true;
submitButton.disabled = false;

function validateField(field) {
  let error = "";
  if (!field.value.trim()) {
    error = formCopy.required[field.name];
  } else if (field.type === "email" && field.validity.typeMismatch) {
    error = formCopy.invalidEmail;
  } else if (field.validity.tooLong) {
    error = formCopy.tooLong(field.maxLength);
  }
  field.setAttribute("aria-invalid", String(Boolean(error)));
  document.getElementById(`${field.id}-error`).textContent = error;
  return !error;
}
fields.forEach((field) => {
  field.addEventListener("blur", () => {
    if (field.value || field.hasAttribute("aria-invalid")) validateField(field);
  });
  field.addEventListener("input", () => {
    if (field.hasAttribute("aria-invalid")) validateField(field);
    status.textContent = "";
    delete status.dataset.state;
  });
});
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const results = fields.map(validateField);
  if (results.includes(false)) {
    status.dataset.state = "invalid";
    status.textContent = formCopy.invalid;
    fields[results.indexOf(false)].focus();
    return;
  }
  // Local checks are synchronous. Never simulate a request or claim delivery.
  status.dataset.state = "valid";
  status.textContent = formCopy.valid;
});
document.querySelector("#year").textContent = new Date().getFullYear();

// Replay on entry from either direction, rearming only after a full exit.
// Content stays visible when animations are disabled or unsupported.

let revealObserver;
function configureMotion() {
  revealObserver?.disconnect();
  if (reducedMotion.matches) {
    document.documentElement.classList.remove("motion-ready");
    document.getAnimations().forEach((animation) => animation.cancel());
    return;
  }
  document.documentElement.classList.add("motion-ready");
  if (!("IntersectionObserver" in window)) return;
  const revealed = new WeakSet();
  const revealAnimations = new WeakMap();
  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          revealed.delete(entry.target);
          return;
        }
        if (entry.intersectionRatio < 0.1 || revealed.has(entry.target)) return;
        revealed.add(entry.target);
        revealAnimations.get(entry.target)?.cancel();
        const offset = entry.boundingClientRect.top < entry.rootBounds.top ? -24 : 24;
        const animation = entry.target.animate(
          [
            { opacity: 0.2, transform: `translateY(${offset}px)` },
            { opacity: 1, transform: "translateY(0)" },
          ],
          { duration: 650, easing: "cubic-bezier(.2,.8,.2,1)" },
        );
        revealAnimations.set(entry.target, animation);
      });
    },
    { threshold: [0, 0.1], rootMargin: "0px 0px -32px 0px" },
  );
  document
    .querySelectorAll(
      ".section-heading, .project, .about-grid > div, .about-block, .contact-grid > div, #contact-form",
    )
    .forEach((element) => revealObserver.observe(element));
}
configureMotion();
reducedMotion.addEventListener("change", configureMotion);

function updateLanguageDestination() {
  const switcher = document.querySelector(".language-switch");
  const page = isArabic ? "en.html" : "index.html";
  switcher.href = `${page}${location.hash}`;
}
updateLanguageDestination();
window.addEventListener("hashchange", updateLanguageDestination);
