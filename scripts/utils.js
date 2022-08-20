import Card from "./Card.js";

// Get all popups
const popupList = document.querySelectorAll(".popup");

// Get card wrapper
const cardList = document.querySelector(".elements__list");

// Edit Profile Button, Modal, Close Button
const editProfileBtn = document.querySelector(".profile__edit-button");
const editProfilePopup = document.querySelector("#edit-profile-popup");
const editProfileForm = editProfilePopup.querySelector("#edit-profile-form");

// Add Card Button, Modal, Close Button
const addCardBtn = document.querySelector(".profile__add-card-button");
const addCardPopup = document.querySelector("#add-card-popup");
const addCardForm = addCardPopup.querySelector("#add-card-form");

// View Photo Modal, Close Button
const viewPhotoPopup = document.querySelector("#view-photo-popup");
const popupPhoto = viewPhotoPopup.querySelector(".popup__photo");
const popupPhotoTitle = viewPhotoPopup.querySelector(".popup__photo-title");

// Edit Profile Form Inputs
const nameInput = document.querySelector("#name");
const jobInput = document.querySelector("#job");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__occupation");

// Add Card Inputs
const cardTitleInput = addCardPopup.querySelector("#title");
const cardLinkInput = addCardPopup.querySelector("#link");

// Handle edit profile form submit event
function fillProfileForm() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup(editProfilePopup);
}

// Edit profile form submit event listener
editProfileForm.addEventListener('submit', handleProfileFormSubmit);

// Render Cards
export function renderCards(card) {
  const cardElement = new Card(card, "#card-template");
  cardList.prepend(cardElement.createCard());
}

// Handle add card form submit event
function handleAddCardForm(evt) {
  evt.preventDefault();
  const saveButton = evt.target.querySelector(".popup__form-save-button");
  const title = cardTitleInput.value;
  const link = cardLinkInput.value;

  renderCards({
    title,
    link
  });

  evt.target.reset();
  saveButton.classList.add("popup__form-save-button_disabled");
  saveButton.disabled = true;
  closePopup(addCardPopup);
}

// Add card form submit event listener
addCardForm.addEventListener("submit", handleAddCardForm);

// Open popups
export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEscape);
};

// Add event listener to open the edit profile popup
editProfileBtn.addEventListener("click", () => {
  fillProfileForm();
  openPopup(editProfilePopup);
});

// Add event listener to open the add card popup
addCardBtn.addEventListener("click", () => {
  openPopup(addCardPopup);
});

// Close Popups
function closePopup(popup) {
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
    };
    if (evt.target.parentNode.classList.contains("popup__close-button")) {
      closePopup(popup);
    };
  });
});