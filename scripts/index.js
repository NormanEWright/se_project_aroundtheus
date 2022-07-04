let initialCards = [
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
const closeModalButton = document.querySelector(".modal__form-close-button");
const modal = document.querySelector(".modal");
const profileFormElement = document.querySelector(".modal__form");
const nameInput = document.querySelector("#name");
const jobInput = document.querySelector("#job");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__occupation");
const cardList = document.querySelector(".elements__list");
const cardTemplate = document.querySelector("#card-template").content;

function openProfileModal() {
  modal.classList.add("modal__opened");
}

function closeProfileModal() {
  modal.classList.remove("modal__opened");
}

// Remove this block
function toggleModalWindow() {
  nameInput.value = document.querySelector(".profile__name").textContent;
  jobInput.value = document.querySelector(".profile__occupation").textContent;
  modal.classList.toggle("modal__opened");
}

editProfileButton.addEventListener("click", toggleModalWindow);
closeModalButton.addEventListener("click", toggleModalWindow);

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  modal.classList.remove("modal__opened");
}

profileFormElement.addEventListener('submit', handleProfileFormSubmit);


function getCardElement(data) {
  initialCards.forEach(function(obj) {
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    const cardTitle = cardElement.querySelector(".card__title");
    const cardImage = cardElement.querySelector(".card__photo");
    cardImage.style.borderTopLeftRadius = "10px";
    cardImage.style.borderTopRightRadius = "10px";
    cardImage.src = obj.link;
    cardImage.alt = obj.name;
    cardTitle.textContent = obj.name;
    cardList.appendChild(cardElement);
  });
}


getCardElement(initialCards);