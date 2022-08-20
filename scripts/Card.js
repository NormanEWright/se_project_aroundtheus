import { openPopup } from "./utils.js";
import { viewPhotoPopup } from "./index.js";

class Card {
  constructor(data, cardTemplate, handleImageClick) {
    this._title = data.title;
    this._link = data.link;
    this._cardTemplate = cardTemplate;
    this.handleImageClick = handleImageClick;
  }

  _getElement = () => {
    const cardElement = this._cardTemplate.querySelector(".card").cloneNode(true);
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

  _setEventListener = (cardImage, cardLikeBtn, deleteCardBtn, cardElement) => {
    
    cardImage.addEventListener("click", () => {
      this.handleImageClick(this._link, this._title);
      openPopup(viewPhotoPopup);
    });

    cardLikeBtn.addEventListener("click", () => {
      this._handleLikeButton(cardLikeBtn);
    });

    deleteCardBtn.addEventListener("click", () => {
      this._handleDeleteCard();
    });
  }

  _handleLikeButton = (cardLikeBtn) => {
    cardLikeBtn.classList.toggle("card__like-button_active");
  }

  _handleDeleteCard = () => {
    this._element.remove();
    this._element = null;
  }

  createCard = () => {
     this._element = this._getElement();
    return this._element;
  }
}

export default Card;