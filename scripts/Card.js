import { popupImage, elementBigImage, openPopup } from "./utils.js";

export class Card {
  constructor(data, templateSelector) {
    this._title = data.name;
    this._image = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
  const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    const titleElement = this._element.querySelector('.element__title');
    const imageElement = this._element.querySelector('.element__image');
    titleElement.textContent = this._title;
    imageElement.alt = this._title;
    imageElement.src = this._image;

    return this._element;
  }

  _handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  _handleLikeCard() {
    this._element.querySelector('.element__like').classList.toggle('element__like_active')
  }

  _handleBigImage() {
    document.querySelector('.popup__title-image').textContent = this._title;
    elementBigImage.alt = this._title;
    elementBigImage.src = this._image;
  
    openPopup(popupImage);
  }

  _setEventListeners() {
    this._element.querySelector('.element__delete').addEventListener('click', () => {
      this._handleDeleteCard();
    });

    this._element.querySelector('.element__like').addEventListener('click', () => {
      this._handleLikeCard();
    });

    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleBigImage();
    });
  }
}