// Initial Cards Object
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
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

// Card List, Card Template
const cardList = document.querySelector(".elements__list");
const cardTemplate = document.querySelector("#card-template").content;

// Creadte Cards
function createCard(card) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__photo");
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;

  cardImage.addEventListener("click", () => {
    let title = cardImage.alt;
    let link = cardImage.src;
    toggleModal(viewPhotoModal, {title, link});
  });

  return cardElement;
}

// Render Cards
function renderCards(card) {
  const cardElement = createCard(card);
  cardList.prepend(cardElement);
}

initialCards.reverse().forEach(renderCards);

// Render Photo in Modal
const renderPhoto = function(cardData) {
  console.log(cardData);
  modalPhoto.src = cardData.link;
  modalPhoto.alt = cardData.title;
  modalPhotoTitle.textContent = cardData.title;
}

// Toggle Modals
const toggleModal = function (modal, cardData = {}) {
  if (modal === editProfileModal)  {
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


// Delete Card
const deleteCardButtonList = document.querySelectorAll(".card__delete-button");

deleteCardButtonList.forEach(function (trash) {
  trash.addEventListener("click", (evt) => {
    evt.target.parentElement.parentElement.remove();
  });
});

