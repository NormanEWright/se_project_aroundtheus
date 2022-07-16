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
const closeProfileModalBtn = editProfileModal.querySelector(".form__close-button");
const editProfileForm = editProfileModal.querySelector("#edit-profile-form");

// Add Card Button, Modal, Close Button
const addCardBtn = document.querySelector(".profile__add-card-button");
const addCardModal = document.querySelector("#add-card-modal");
const closeAddCardModalBtn = addCardModal.querySelector(".form__close-button");
const addCardForm = addCardModal.querySelector("#add-card-form");

// View Photo Modal, Close Button
const viewPhotoModal = document.querySelector("#view-photo-modal");
const closePhotoModalBtn = viewPhotoModal.querySelector(".modal__photo-close-button");
const modalPhoto = viewPhotoModal.querySelector(".modal__photo");
const modalPhotoTitle = viewPhotoModal.querySelector(".modal__photo-title");

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
    let title = cardImage.alt;
    let link = cardImage.src;
    toggleModal(viewPhotoModal, {title, link});
  });

  cardLikeBtn.addEventListener("click", () => {
    toggleLikeBtn(cardLikeBtn);
  });

  deleteCardBtn.addEventListener("click", () => {
    console.log("Delet button clicked!");
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
const renderPhoto = function(cardData) {
  modalPhoto.src = cardData.link;
  modalPhoto.alt = cardData.title;
  modalPhotoTitle.textContent = cardData.title;
}

// Edit Profile
function fillProfileForm() {
  nameInput.value = document.querySelector(".profile__name").textContent;
  jobInput.value = document.querySelector(".profile__occupation").textContent;
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  toggleModal(editProfileModal);
}

editProfileForm.addEventListener('submit', handleProfileFormSubmit);

// Add Card
const clearAddCardFormInputs = function () {
  cardTitleInput.value = "";
  cardLinkInput.value = "";
}

function handleAddCardform(evt) {
  evt.preventDefault();

  let title = cardTitleInput.value;
  let link = cardLinkInput.value;

  renderCards({
    title,
    link
  });

  clearAddCardFormInputs();
  toggleModal(addCardModal);
}

addCardForm.addEventListener("submit", handleAddCardform);

// Toggle Modals
const toggleModal = function (modal, cardData = {}) {
  if (modal === editProfileModal) {
    fillProfileForm();
  }

  if (modal === viewPhotoModal) {
    renderPhoto(cardData);
  }

  modal.classList.toggle("modal__opened");
}

editProfileBtn.addEventListener("click", () => {
  toggleModal(editProfileModal);
});

addCardBtn.addEventListener("click", (evt) => {
  toggleModal(addCardModal);
})

closeProfileModalBtn.addEventListener("click", () => {
  toggleModal(editProfileModal);
});

closeAddCardModalBtn.addEventListener("click", () => {
  toggleModal(addCardModal);
});

closePhotoModalBtn.addEventListener("click", () => {
  toggleModal(viewPhotoModal);
});