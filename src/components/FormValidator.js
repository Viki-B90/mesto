export default class FormValidator {
  constructor(settings, formSelector) {
    this._formSelector = formSelector;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;

    this._inputList = Array.from(formSelector.querySelectorAll(this._inputSelector));
    this._buttonElement = formSelector.querySelector(this._submitButtonSelector);
  }

  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._formSelector.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  _hideInputError = (inputElement) => {
    const errorElement = this._formSelector.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    };
  };

  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = 'disabled';
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = '';
    };
  };
  
  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
  
      return !inputElement.validity.valid;
    });
  }; 

  _setEventListeners = () => {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };

  _deleteInputError = () => {
    const popupInputError = Array.from(document.querySelectorAll('.popup__input'));
    popupInputError.forEach((errorInput) => {
      errorInput.classList.remove('popup__input_type_error');
    });
  };
  
  _deleteSpanError = () => {
    const popupSpanError = Array.from(document.querySelectorAll('.popup__error'));
    popupSpanError.forEach((errorSpan) => {
      errorSpan.textContent = '';
    });
  };

  deleteError = () => {
    this._deleteInputError();
    this._deleteSpanError()
  };

  enableValidation = () => {
    this._formSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
  
    this._setEventListeners();
  }; 
};