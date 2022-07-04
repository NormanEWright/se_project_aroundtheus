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

const editProfileButton = document.querySelector(".profile__edit-button");
const closeProfileModalButton = document.querySelector(".modal__form-close-button");
const profileModal = document.querySelector(".modal");
const profileFormElement = document.querySelector(".modal__form");
const nameInput = document.querySelector("#name");
const jobInput = document.querySelector("#job");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__occupation");
const cardList = document.querySelector(".elements__list");
const cardTemplate = document.querySelector("#card-template").content;

function fillProfileForm() {
  nameInput.value = document.querySelector(".profile__name").textContent;
  jobInput.value = document.querySelector(".profile__occupation").textContent;
}

function openProfileModal() {
  fillProfileForm();
  profileModal.classList.add("modal__opened");
}

function closeProfileModal() {
  profileModal.classList.remove("modal__opened");
}

editProfileButton.addEventListener("click", openProfileModal);
closeProfileModalButton.addEventListener("click", closeProfileModal);

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closeProfileModal();
}

profileFormElement.addEventListener('submit', handleProfileFormSubmit);


function renderCards(data) {
  initialCards.forEach(function(obj) {
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    const cardTitle = cardElement.querySelector(".card__title");
    const cardImage = cardElement.querySelector(".card__photo");
    cardImage.src = obj.link;
    cardImage.alt = obj.name;
    cardTitle.textContent = obj.name;
    cardList.appendChild(cardElement);
  });
}


renderCards(initialCards);