const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const filterButtons = document.querySelectorAll("[data-filter]");
const skills = document.querySelectorAll("[data-skill]");
const revealItems = document.querySelectorAll("[data-reveal]");

navToggle?.addEventListener("click", () => {
  const isOpen = navToggle.classList.toggle("is-open");

  navToggle.setAttribute("aria-expanded", String(isOpen));
  siteNav?.classList.toggle("is-open", isOpen);
  document.body.classList.toggle("nav-open", isOpen);
});

siteNav?.addEventListener("click", (event) => {
  if (!(event.target instanceof HTMLAnchorElement)) {
    return;
  }

  navToggle?.classList.remove("is-open");
  navToggle?.setAttribute("aria-expanded", "false");
  siteNav.classList.remove("is-open");
  document.body.classList.remove("nav-open");
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.toggle("active", item === button));
    skills.forEach((skill) => {
      const shouldDim = selectedFilter !== "all" && skill.dataset.skill !== selectedFilter;
      skill.classList.toggle("is-hidden", shouldDim);
    });
  });
});

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
