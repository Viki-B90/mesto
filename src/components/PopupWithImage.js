import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._title = this._popup.querySelector('.popup__title-image');
    this._image = this._popup.querySelector('.popup__image');
  }

  open(name, link) {
    this._title.textContent = name;
    this._image.alt = name;
    this._image.src = link;
    super.open();
  }
}