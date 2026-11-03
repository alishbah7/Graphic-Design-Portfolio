const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxTitle = document.getElementById("lightboxTitle");
const closeButton = document.getElementById("lightboxClose");
const viewButtons = document.querySelectorAll(".view-button");

let previouslyFocusedElement = null;

function openLightbox(imagePath, title) {
  previouslyFocusedElement = document.activeElement;
  lightboxImage.src = imagePath;
  lightboxImage.alt = title;
  lightboxTitle.textContent = title;

  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  closeButton.focus();
}

function closeLightbox() {
  if (!lightbox.classList.contains("is-open")) return;

  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");

  // Clear the image after the closing transition so it does not flash.
  window.setTimeout(() => {
    if (!lightbox.classList.contains("is-open")) {
      lightboxImage.src = "";
      lightboxTitle.textContent = "";
    }
  }, 330);

  if (previouslyFocusedElement) previouslyFocusedElement.focus();
}

viewButtons.forEach((button) => {
  button.addEventListener("click", () => {
    openLightbox(button.dataset.image, button.dataset.title);
  });
});

closeButton.addEventListener("click", closeLightbox);

// Close only when the dark backdrop itself is clicked.
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeLightbox();
});

if (window.AOS) {
  AOS.init({
    duration: 750,
    easing: "ease-out-cubic",
    once: true,
    offset: 65
  });
}
