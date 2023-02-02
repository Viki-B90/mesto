import {
  popupEdit,
  popupAdd,
  popupImage,
  popupEditOpenButton, 
  userName, 
  userInfo,
  profileInfo,
  profileName,
  popupAddOpenButton,
  formProfile,
  formCard,
  cardsContainer,
  templateSelector
  } from '../utils/utils.js';
import Card from '../components/Card.js';
import { initialCards, configValidation } from '../utils/constants.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import './index.css';

const basket = new URL('../images/basket.svg', import.meta.url);
const heart = new URL('../images/heart.svg', import.meta.url);
const heartBlack = new URL('../images/heart_black.svg', import.meta.url);
const iconClose = new URL('../images/icon_close.svg', import.meta.url);
const iconPencil = new URL('../images/icon_pencil.svg', import.meta.url);
const iconPlus = new URL('../images/icon_plus.svg', import.meta.url);
const avatar = new URL('../images/Kusto.jpg', import.meta.url);
const logo = new URL('../images/mesto_logo.svg', import.meta.url);

const images = [
  { name: 'Basket', link: basket },
  { name: 'Heart', link: heart },
  { name: 'Heart Black', link: heartBlack },
  { name: 'Icon Close', link: iconClose },
  { name: 'Icon Pencil', link: iconPencil },
  { name: 'Icon Plus', link: iconPlus },
  { name: 'Avatar', link: avatar },
  { name: 'Logo', link: logo },
]; 

//Новый класс данных профиля
const userInf = new UserInfo({
  nameSelector: profileName,
  infoSelector: profileInfo
});

//Новый класс профиля
const profileEditPopup = new PopupWithForm({
  popupSelector: popupEdit,
  handleFormSubmit: (data) => {
    userInf.setUserInfo(data);
  },
});

// Новый класс карточек - Создать новое место
const newCardPopup = new PopupWithForm({
  popupSelector: popupAdd,
  handleFormSubmit: (item) => {
    const card = renderCard(item);
    cardsSection.addItem(card);
    newCardPopup.close();
  }
});

// Новый класс секция карточки
const cardsSection = new Section({
  items: initialCards,
  renderer: (item) => {
    cardsSection.addItem(renderCard(item));
    },
  },
  cardsContainer
);

cardsSection.renderItems();

// Экземпляр попапа большой картинки
const imgPopup = new PopupWithImage(popupImage);

// Экземпляры класса валидации
const formProfileValidation = new FormValidator(configValidation, formProfile);
formProfileValidation.enableValidation();

const formCardValidation = new FormValidator(configValidation, formCard);
formCardValidation.enableValidation();

// Обработчик попап Профиля
function handleFormEditSubmit(event) {
  event.preventDefault();

  profileEditPopup.close();
}

// Создание карточек
function renderCard(data) {
  const card = new Card(data, templateSelector, handleCardClick);
  const cardElement = card.generateCard();

  return cardElement;
}

function handleCardClick(name, link) {
  imgPopup.open(name, link)
}

// Слушатели для попапа Профиля
profileEditPopup.setEventListeners();

formProfile.addEventListener('submit', handleFormEditSubmit);

popupEditOpenButton.addEventListener('click', () => {
  profileEditPopup.open();
  formProfileValidation._toggleButtonState();

  const {name, info} = userInf.getUserInfo();
  userName.value = name;
  userInfo.value = info;

  formProfileValidation.deleteError();
})

// Слушатели для попапа "Место"
newCardPopup.setEventListeners();

popupAddOpenButton.addEventListener('click', () => {
  newCardPopup.open();
  formCardValidation._toggleButtonState();
  formCardValidation.deleteError();
});

// Слушатель попапа большой картинки
imgPopup.setEventListeners();