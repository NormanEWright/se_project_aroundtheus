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

// Edit Profile Button, Modal, Close Button
const editProfileBtn = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileForm = editProfileModal.querySelector("#edit-profile-form");

// Add Card Button, Modal, Close Button
const addCardBtn = document.querySelector(".profile__add-card-button");
const addCardModal = document.querySelector("#add-card-modal");
const addCardForm = addCardModal.querySelector("#add-card-form");

// View Photo Modal, Close Button
const viewPhotoModal = document.querySelector("#view-photo-modal");
const modalPhoto = viewPhotoModal.querySelector(".modal__photo");
const modalPhotoTitle = viewPhotoModal.querySelector(".modal__photo-title");

// Get All Close Buttons
const closeButtons = document.querySelectorAll(".modal__close-button");

// Edit Profile Form Inputs
const nameInput = document.querySelector("#name");
const jobInput = document.querySelector("#job");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__occupation");

// Add Card Inputs
const cardTitleInput = addCardModal.querySelector("#title");
const cardLinkInput = addCardModal.querySelector("#link");

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
    openPopup(viewPhotoModal);
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
  modalPhoto.src = cardData.link;
  modalPhoto.alt = cardData.title;
  modalPhotoTitle.textContent = cardData.title;
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

  closePopup(editProfileModal);
}

editProfileForm.addEventListener('submit', handleProfileFormSubmit);

// Add Card
function handleAddCardForm(evt) {
  evt.preventDefault();

  const title = cardTitleInput.value;
  const link = cardLinkInput.value;

  renderCards({
    title,
    link
  });

  evt.target.reset();
  closePopup(addCardModal);
}

addCardForm.addEventListener("submit", handleAddCardForm);

// Open Popups
function openPopup(popup) {
  popup.classList.add("modal_opened");
}

editProfileBtn.addEventListener("click", () => {
  fillProfileForm();
  openPopup(editProfileModal);
});

addCardBtn.addEventListener("click", () => {
  openPopup(addCardModal);
})

// Close Popups
function closePopup(popup) {
  popup.classList.remove("modal_opened");
}

closeButtons.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => closePopup(popup));
});