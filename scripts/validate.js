// Добавляем сообщение об ошибке
const showInputError = (formElement, inputElement, errorMessage, obj) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(`${obj.inputErrorClass}`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(`${obj.errorClass}`);
};

// Удаляем ошибку
const hideInputError = (formElement, inputElement, obj) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(`${obj.inputErrorClass}`);
  errorElement.classList.remove(`${obj.errorClass}`);
  errorElement.textContent = '';
};

// Проверяем валидность
const checkInputValidity = (formElement, inputElement, obj) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, obj);
  } else {
    hideInputError(formElement, inputElement, obj);
  };
};

// Делаем кнопку активной/ неактивной
const toggleButtonState = (inputList, buttonElement, obj) => {
  if (hasInvalidInput(inputList, obj)) {
    buttonElement.classList.add(`${obj.inactiveButtonClass}`);
    buttonElement.disabled = 'disabled';
  } else {
    buttonElement.classList.remove(`${obj.inactiveButtonClass}`);
    buttonElement.disabled = '';
  };
}; 

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {

    return !inputElement.validity.valid;
  });
}; 

const setEventListeners = (formElement, obj) => {
  const inputList = Array.from(formElement.querySelectorAll(`${obj.inputSelector}`));
  const buttonElement = formElement.querySelector(`${obj.submitButtonSelector}`);
  toggleButtonState(inputList, buttonElement, obj);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, obj);
       toggleButtonState(inputList, buttonElement, obj);
    });
  });
};

const enableValidation = (obj) => {
  const formList = Array.from(document.querySelectorAll(`${obj.formSelector}`)); 
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement, obj);
  }); 
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});