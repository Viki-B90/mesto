import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({popupSelector, handleFormSubmit}) {
    super(popupSelector);
    this._submitButton = this._popup.querySelector('button[type="submit"]');
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._handleFormSubmit = handleFormSubmit;
    }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._popup.addEventListener('submit', () => {
      const initialText = this._submitButton.textContent;

      this._submitButton.textContent = 'Сохранение...';
      this._handleFormSubmit(this._getInputValues())
        .then(() => this.close())
        .finally(() => {
          this._submitButton.textContent = initialText;
        })
    });
  }
}