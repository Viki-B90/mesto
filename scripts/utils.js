// Объявляем переменные
export const popupImage = document.querySelector('.popup_img');
export const elementBigImage = document.querySelector('.popup__image');

export const popupEdit = document.querySelector('.popup_edit');
export const popupEditCloseButton = document.querySelector('.popup__close');
export const popupEditOpenButton = document.querySelector('.profile__edit');
export const formEdit = document.querySelector('.popup__form');
export const userName = document.querySelector('.popup__input_type_name');
export const userInfo = document.querySelector('.popup__input_type_info');
export const profileName = document.querySelector('.profile__info_type_name');
export const profileInfo = document.querySelector('.profile__info_type_about-me');
export const popupAdd = document.querySelector('.popup_add');
export const popupAddOpenButton = document.querySelector('.profile__add');
export const popupAddCloseButton = popupAdd.querySelector('.popup__close');
export const popupImageCloseButton = popupImage.querySelector('.popup__close');
export const formAdd = document.querySelector('.popup__form_new_place');
export const cardTitle = document.querySelector('.popup__input_type_title');
export const cardLink = document.querySelector('.popup__input_type_link');
export const cardsContainer = document.querySelector('.elements__list');
export const popupCreateCard = popupAdd.querySelector('.popup__save');

// Функция открытия 3х попапов
export const openPopup = function (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
  document.addEventListener('click', closePopupByClickOnOverlay);
}

export function openProfilePopup() { 
  userName.value = profileName.textContent;
  userInfo.value = profileInfo.textContent;
    
  openPopup(popupEdit);
} 
  
// Функция закрытия 3х попапов
export const closePopup = function (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
  document.removeEventListener('mousedown', closePopupByClickOnOverlay);
}

// Функция закрытия по оверлею
const closePopupByClickOnOverlay = function (event) {
  console.log (event.target, event.currentTarget);
  if (event.target.classList.contains('popup_opened')) {
    closePopup(event.target);
  }
}
  
// Закрытие по нажатию Esc
const closeByEsc = (event) => {
  if (event.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}