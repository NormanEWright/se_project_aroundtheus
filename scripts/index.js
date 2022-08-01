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

// Get all popups
const popupList = document.querySelectorAll(".popup");

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

// Card List, Card Template
const cardList = document.querySelector(".elements__list");
const cardTemplate = document.querySelector("#card-template").content;

// Toggle Like Button
const toggleLikeBtn = function (btn) {
  btn.classList.toggle("card__like-button_active");
}

// Create Cards
function createCard(card) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__photo");
  const deleteCardBtn = cardElement.querySelector(".card__delete-button");
  const cardLikeBtn = cardElement.querySelector(".card__like-button");

  cardImage.src = card.link;
  cardImage.alt = card.title;
  cardTitle.textContent = card.title;

  cardImage.addEventListener("click", () => {
    renderPhoto(card);
    openPopup(viewPhotoPopup);
  });

  cardLikeBtn.addEventListener("click", () => {
    toggleLikeBtn(cardLikeBtn);
  });

  deleteCardBtn.addEventListener("click", () => {
    removeCard(cardElement);
  });

  return cardElement;
}

// Render Cards
function renderCards(card) {
  const cardElement = createCard(card);
  cardList.prepend(cardElement);
}

initialCards.reverse().forEach(renderCards);

// Delete Card
const removeCard = function (card) {
  card.remove();
}

// Render Photo in Modal
function renderPhoto(cardData) {
  popupPhoto.src = cardData.link;
  popupPhoto.alt = cardData.title;
  popupPhotoTitle.textContent = cardData.title;
}

// Edit Profile
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

editProfileForm.addEventListener('submit', handleProfileFormSubmit);

// Add Card
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

addCardForm.addEventListener("submit", handleAddCardForm);

// Close all popups by pressing the Esc key
function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  };
};

// Open Popups
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEscape);
};

editProfileBtn.addEventListener("click", () => {
  fillProfileForm();
  openPopup(editProfilePopup);
});

addCardBtn.addEventListener("click", () => {
  openPopup(addCardPopup);
});

// Close Popups
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEscape);
};

// Close all popups by clicking on the overlay, or close button
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