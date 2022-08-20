import { renderCards } from "./utils.js";
import FormValidator from "./FormValidator.js";

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

const editProfileForm = document.querySelector("#edit-profile-form");
const addCardForm = document.querySelector("#add-card-form");

initialCards.reverse().forEach(renderCards);

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