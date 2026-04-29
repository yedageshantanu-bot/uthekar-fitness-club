const topbar = document.getElementById("topbar");
const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");
const currentYear = document.getElementById("current-year");
const revealItems = document.querySelectorAll(".reveal");
const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll("a") : [];
const prefersCompactMotion = window.matchMedia("(max-width: 979px)").matches;

const syncTopbar = () => {
  if (!topbar) {
    return;
  }

  topbar.classList.toggle("is-scrolled", window.scrollY > 10);
};

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    mobileMenu.classList.toggle("is-open", !isOpen);
  });

  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.setAttribute("aria-expanded", "false");
      mobileMenu.classList.remove("is-open");
    });
  });
}

if (currentYear) {
  currentYear.textContent = String(new Date().getFullYear());
}

if ("IntersectionObserver" in window && !prefersCompactMotion) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

syncTopbar();
window.addEventListener("scroll", syncTopbar, { passive: true });
