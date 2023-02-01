export const popupImage = document.querySelector('.popup_img');
export const popupEdit = document.querySelector('.popup_edit');
export const popupEditOpenButton = document.querySelector('.profile__edit');
export const formProfile = document.querySelector('.popup__form-edit');
export const userName = document.querySelector('.popup__input_type_name');
export const userInfo = document.querySelector('.popup__input_type_info');
export const profileName = document.querySelector('.profile__info_type_name');
export const profileInfo = document.querySelector('.profile__info_type_about-me');
export const popupAdd = document.querySelector('.popup_add');
export const popupAddOpenButton = document.querySelector('.profile__add');
export const formCard = document.querySelector('.popup__form_new_place');
export const cardTitle = document.querySelector('.popup__input_type_title');
export const cardLink = document.querySelector('.popup__input_type_link');
export const cardsContainer = document.querySelector('.elements__list');
export const templateSelector = document.querySelector('#card-template');
export const popupCreateCard = popupAdd.querySelector('.popup__save');

export const configValidation = ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});