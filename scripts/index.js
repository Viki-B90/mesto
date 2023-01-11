import { Card } from "./Card.js";
import { FormValidator, configValidation, deleteInputError, deleteSpanError } from "./FormValidator.js";
import { initialCards } from "./cards.js";


// Объявляем переменные
export const popupImage = document.querySelector('.popup_img');
export const elementBigImage = document.querySelector('.popup__image');

const popupEdit = document.querySelector('.popup_edit');
const popupEditCloseButton = document.querySelector('.popup__close');
const popupEditOpenButton = document.querySelector('.profile__edit');
const formEdit = document.querySelector('.popup__form');
const userName = document.querySelector('.popup__input_type_name');
const userInfo = document.querySelector('.popup__input_type_info');
const profileName = document.querySelector('.profile__info_type_name');
const profileInfo = document.querySelector('.profile__info_type_about-me');
const popupAdd = document.querySelector('.popup_add');
const popupAddOpenButton = document.querySelector('.profile__add');
const popupAddCloseButton = popupAdd.querySelector('.popup__close');
const popupImageCloseButton = popupImage.querySelector('.popup__close');
const formAdd = document.querySelector('.popup__form_new_place');
const cardTitle = document.querySelector('.popup__input_type_title');
const cardLink = document.querySelector('.popup__input_type_link');
const cardsContainer = document.querySelector('.elements__list');
const popupCreateCard = popupAdd.querySelector('.popup__save');

// Функция открытия 3х попапов
export const openPopup = function (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
  document.addEventListener('click', closePopupByClickOnOverlay);
}

function openProfilePopup() { 
  userName.value = profileName.textContent;
  userInfo.value = profileInfo.textContent;
  
  openPopup(popupEdit);
} 

// Функция закрытия 3х попапов
const closePopup = function (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
  document.removeEventListener('click', closePopupByClickOnOverlay);
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

// Обработчики открытия попапов
popupEditOpenButton.addEventListener('click', function() {
  openProfilePopup();
  deleteInputError();
  deleteSpanError();
});

popupAddOpenButton.addEventListener('click', function() {
  openPopup(popupAdd);
  formAdd.reset();
  deleteInputError();
  deleteSpanError();
});

// Обработчики закрытия попапов
popupEditCloseButton.addEventListener('click', function() {
  closePopup(popupEdit);
});
popupAddCloseButton.addEventListener('click', function() {
  closePopup(popupAdd);
});
popupImageCloseButton.addEventListener('click', function() {
  closePopup(popupImage);
});

// Функция отправки событий - кнопка Сохранить
const handleFormEditSubmit = (event) => {
  event.preventDefault();
  profileName.textContent = userName.value;
  profileInfo.textContent = userInfo.value;

  closePopup (popupEdit);
}

//Обрабочик кнопки Сохранить
formEdit.addEventListener('submit', handleFormEditSubmit);

// Создание карточек
function renderCard(dataCard) {
  const card = new Card(dataCard, '#card-template');
  const cardElement = card.generateCard();
  cardsContainer.prepend(cardElement);

  return cardElement;
}

// Функция отправки событий - кнопка Создать карточку
function handleFormAddSubmit (event) {
  event.preventDefault();
  renderCard({ name: cardTitle.value, link: cardLink.value });

  closePopup (popupAdd);
  popupCreateCard.classList.add('popup__save_disabled');
  popupCreateCard.disabled = 'disabled';
};

formAdd.addEventListener('submit', handleFormAddSubmit);

// Рендер карточек
initialCards.forEach((dataCard) => {
  renderCard(dataCard);
});

// Экземпляры класса валидации
const formAddValidation = new FormValidator(configValidation, formAdd);
formAddValidation.enableValidation();

const formEditValidation = new FormValidator(configValidation, formEdit);
formEditValidation.enableValidation();