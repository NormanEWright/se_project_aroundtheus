class Card {
  constructor(data, cardSelector) {
    this._title = data.title;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }
}

export default Card;