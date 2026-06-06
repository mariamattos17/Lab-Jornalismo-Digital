const menuButton = document.querySelector("[data-scroll-menu]");
const navScroll = document.querySelector("#navScroll");

if (menuButton && navScroll) {
  menuButton.addEventListener("click", () => {
    navScroll.scrollBy({
      left: 260,
      behavior: "smooth"
    });
  });
}

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

  modalContent.innerHTML = `
    <video controls autoplay ${posterSrc ? `poster="${posterSrc}"` : ""}>
      <source src="${videoSrc}" type="video/mp4">
      Seu navegador não suporta vídeo HTML5.
    </video>
  `;

  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  if (!modal || !modalContent) return;

  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
  modalContent.innerHTML = "";
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
    closeModal();
  }
});