const funilRevealElements = document.querySelectorAll(".reveal-funil, .reveal-on-scroll");

if (funilRevealElements.length) {
  const funilObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          funilObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -80px 0px"
    }
  );

  funilRevealElements.forEach((element) => {
    funilObserver.observe(element);
  });
}
