const menuToggle = document.querySelector("[data-menu-toggle]");
const menuClose = document.querySelector("[data-close-menu]");
const navScroll = document.querySelector("#navScroll");
const navLinks = navScroll ? [...navScroll.querySelectorAll("a")] : [];
const siteNavbar = document.querySelector(".site-navbar");

function setMenuOpen(isOpen) {
  if (!navScroll) return;

  navScroll.classList.toggle("open", isOpen);
  siteNavbar?.classList.toggle("menu-open", isOpen);
  document.body.classList.toggle("menu-open", isOpen);

  if (menuToggle) {
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  }
}

function updateActiveNavLink() {
  if (!navLinks.length) return;

  // Get current page more robustly
  let currentPage = window.location.pathname;
  // Remove trailing slashes
  currentPage = currentPage.replace(/\/$/, "");
  // Get last segment
  currentPage = currentPage.split("/").filter(Boolean).pop() || "index.html";
  // Ensure .html extension
  if (!currentPage.includes(".html")) {
    currentPage += ".html";
  }

  let activeLink = null;

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    // Extract just the filename (remove anchors and query params)
    let linkPage = href.split("#")[0].split("?")[0] || "index.html";
    
    const isActive = linkPage === currentPage;

    link.classList.toggle("active", isActive);
    if (isActive) {
      link.setAttribute("aria-current", "page");
      activeLink = link;
    } else {
      link.removeAttribute("aria-current");
    }
  });

  // Scroll navbar to show active link
  if (activeLink && navScroll) {
    setTimeout(() => {
      activeLink.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center"
      });
    }, 100);
  }
}

updateActiveNavLink();

if (menuToggle && navScroll) {
  menuToggle.addEventListener("click", () => {
    setMenuOpen(!navScroll.classList.contains("open"));
  });
}

if (menuClose && navScroll) {
  menuClose.addEventListener("click", () => {
    setMenuOpen(false);
  });
}

if (navScroll && menuToggle) {
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      setMenuOpen(false);
      // Update active link immediately after click
      setTimeout(updateActiveNavLink, 100);
    });
  });
}

document.querySelectorAll("[data-scroll-menu]").forEach((button) => {
  button.addEventListener("click", () => {
    if (!navScroll) return;

    const direction = Number(button.getAttribute("data-scroll-menu")) || 1;
    navScroll.scrollBy({
      left: direction * Math.max(220, navScroll.clientWidth * 0.65),
      behavior: "smooth"
    });
  });
});

const modal = document.querySelector("#mediaModal");
const modalContent = document.querySelector("#modalContent");
const closeModalButton = document.querySelector("[data-close-modal]");

function openImageModal(imageSrc) {
  if (!modal || !modalContent) return;

  modalContent.innerHTML = `
    <img src="${imageSrc}" alt="Mídia ampliada">
  `;

  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
}

function openVideoModal(videoSrc, posterSrc = "") {
  if (!modal || !modalContent) return;

  // Pause all videos on page
  document.querySelectorAll("video").forEach(video => {
    video.pause();
  });

  const videoElement = document.createElement("video");
  videoElement.controls = true;
  videoElement.autoplay = true;
  if (posterSrc) {
    videoElement.poster = posterSrc;
  }
  
  const sourceElement = document.createElement("source");
  sourceElement.src = videoSrc;
  sourceElement.type = "video/mp4";
  videoElement.appendChild(sourceElement);
  videoElement.appendChild(document.createTextNode("Seu navegador não suporta vídeo HTML5."));

  modalContent.innerHTML = "";
  modalContent.appendChild(videoElement);

  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  if (!modal || !modalContent) return;

  // Stop any video playing in the modal
  const videoInModal = modalContent.querySelector("video");
  if (videoInModal) {
    videoInModal.pause();
    videoInModal.currentTime = 0;
  }

  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
  modalContent.innerHTML = "";
}

function getVideoSource(videoElement) {
  const source = videoElement.querySelector("source");
  return source ? source.getAttribute("src") : videoElement.getAttribute("src");
}

document.querySelectorAll("[data-modal-image]").forEach((button) => {
  button.addEventListener("click", () => {
    const imageSrc = button.getAttribute("data-modal-image");
    openImageModal(imageSrc);
  });
});

document.querySelectorAll("[data-modal-video]").forEach((button) => {
  button.addEventListener("click", () => {
    const videoSrc = button.getAttribute("data-modal-video");
    const posterSrc = button.getAttribute("data-poster") || "";
    openVideoModal(videoSrc, posterSrc);
  });
});

document.querySelectorAll(".video-box video, .feature-video video[data-modal-on-click]").forEach((video) => {
  video.addEventListener("click", () => {
    const videoSrc = getVideoSource(video);
    if (videoSrc) openVideoModal(videoSrc);
  });
});

document.querySelectorAll("[data-play-video]").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const videoId = trigger.getAttribute("data-play-video");
    const video = document.getElementById(videoId);

    if (!video) return;

    video.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

    video.play();
  });
});

if (closeModalButton) {
  closeModalButton.addEventListener("click", closeModal);
}

if (modal) {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMenuOpen(false);
    closeModal();
  }
});

// Update active link when browser back/forward buttons are used
window.addEventListener("popstate", updateActiveNavLink);
// Also check on page load in case of cache or navigation
window.addEventListener("pageshow", updateActiveNavLink);
