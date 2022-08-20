import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { openPopup, closePopup } from "./utils.js";

// Initial Cards Object
const initialCards = [
  {
    title: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    title: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    title: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    title: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    title: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    title: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];

// Edit profile elements
const editProfileBtn = document.querySelector(".profile__edit-button");

// Add card elements
const addCardBtn = document.querySelector(".profile__add-card-button");

// Get card wrapper
const cardList = document.querySelector(".elements__list");

// Get card template
const cardTemplate = document.querySelector("#card-template").content;

// Edit Profile Button, Modal, Close Button
const editProfilePopup = document.querySelector("#edit-profile-popup");
const editProfileForm = editProfilePopup.querySelector("#edit-profile-form");

// Add Card Button, Modal, Close Button
export const addCardPopup = document.querySelector("#add-card-popup");
const addCardForm = addCardPopup.querySelector("#add-card-form");

// View Photo Modal, Close Button
export const viewPhotoPopup = document.querySelector("#view-photo-popup");
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


// Add event listener to open the edit profile popup
editProfileBtn.addEventListener("click", () => {
  fillProfileForm();
  openPopup(editProfilePopup);
});

// Add event listener to open the add card popup
addCardBtn.addEventListener("click", () => {
  openPopup(addCardPopup);
});

// Handle edit profile form submit event
export function fillProfileForm() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  editProfileValidator.disableButton();
  closePopup(editProfilePopup);
}

// Edit profile form submit event listener
editProfileForm.addEventListener('submit', handleProfileFormSubmit);

// Handle image click
const handleImageClick = (link, title) => {
  popupPhoto.src = link;
  popupPhoto.alt = title;
  popupPhotoTitle.textContent = title;
};

// Render card
export function renderCard(data) {
  const cardElement = new Card(data, cardTemplate, handleImageClick);
  cardList.prepend(cardElement.createCard());
}

initialCards.reverse().forEach(renderCard);

// Handle add card form submit event
function handleAddCardForm(evt) {
  evt.preventDefault();
  const saveButton = evt.target.querySelector(".popup__form-save-button");
  const title = cardTitleInput.value;
  const link = cardLinkInput.value;

  renderCard({
    title,
    link
  });

  evt.target.reset();
  addCardValidator.disableButton();
  closePopup(addCardPopup);
}

// Add card form submit event listener
addCardForm.addEventListener("submit", handleAddCardForm);


// Form Validation settings
const config = {
  inputSelector: ".popup__form-input",
  submitButtonSelector: ".popup__form-save-button",
  inactiveButtonClass: "popup__form-save-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
};

// Create a new instance for both forms
const editProfileValidator = new FormValidator(config, editProfileForm);
const addCardValidator = new FormValidator(config, addCardForm);

// Call the enableValidation() method on each instance
editProfileValidator.enableValidation();
addCardValidator.enableValidation();