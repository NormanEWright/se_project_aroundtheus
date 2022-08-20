import { openPopup } from "./utils.js";

// View Photo Modal
const viewPhotoPopup = document.querySelector("#view-photo-popup");
const popupPhoto = viewPhotoPopup.querySelector(".popup__photo");
const popupPhotoTitle = viewPhotoPopup.querySelector(".popup__photo-title");

class Card {
  constructor(data, cardSelector) {
    this._title = data.title;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._cardSelector).content;
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    const cardTitle = cardElement.querySelector(".card__title");
    const cardImage = cardElement.querySelector(".card__photo");
    const deleteCardBtn = cardElement.querySelector(".card__delete-button");
    const cardLikeBtn = cardElement.querySelector(".card__like-button");

    cardImage.src = this._link;
    cardImage.alt = this._title;
    cardTitle.textContent = this._title;

    this._setEventListener(cardImage, cardLikeBtn, deleteCardBtn, cardElement);

    return cardElement;
  }

  _setEventListener(cardImage, cardLikeBtn, deleteCardBtn, cardElement) {
    
    cardImage.addEventListener("click", () => {
      this._handlePhotoViewer();
      openPopup(viewPhotoPopup);
    });

    cardLikeBtn.addEventListener("click", () => {
      this._handleLikeButton(cardLikeBtn);
    });

    deleteCardBtn.addEventListener("click", () => {
      this._handleDeleteCard(cardElement);
    });
  }

  _handlePhotoViewer() {
    popupPhoto.src = this._link;
    popupPhoto.alt = this._title;
    popupPhotoTitle.textContent = this._title;
  }

  _handleLikeButton(cardLikeBtn) {
    cardLikeBtn.classList.toggle("card__like-button_active");
  }

  _handleDeleteCard(cardElement) {
    cardElement.remove();
  }

  createCard() {
    const cardElement = this._getTemplate(this._cardSelector);
    return cardElement;
  }
}

export default Card;