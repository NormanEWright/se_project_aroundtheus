// Get all popups
const popupList = document.querySelectorAll(".popup");

// Open popups
export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEscape);
};

// Close Popups
export function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEscape);
};

// Close all popups by pressing the Esc key
function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  };
};

// Close all popups by clicking the overlay, or close button
popupList.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    } else if (evt.target.parentNode.classList.contains("popup__close-button")) {
      closePopup(popup);
    };
  });
});