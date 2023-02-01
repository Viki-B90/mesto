import {  
  popupEditOpenButton, 
  userName, 
  userInfo, 
  popupAddOpenButton,
  formProfile,
  formCard,
  configValidation,
  cardsContainer
  } from '../utils/utils.js';
import Card from '../components/Card.js';
import { initialCards } from '../utils/cards.js';
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
  nameSelector: '.profile__info_type_name',
  infoSelector: '.profile__info_type_about-me'
});

//Новый класс профиля
const profileEditPopup = new PopupWithForm({
  popupSelector: '.popup_edit',
  handleFormSubmit: (data) => {
    userInf.setUserInfo(data);
  },
});

profileEditPopup.setEventListeners();

function handleFormEditSubmit(event) {
  event.preventDefault();

  profileEditPopup.close();
}

formProfile.addEventListener('submit', handleFormEditSubmit);

popupEditOpenButton.addEventListener('click', () => {
  profileEditPopup.open();
  formProfileValidation._toggleButtonState();

  const {name, info} = userInf.getUserInfo();
  userName.value = name;
  userInfo.value = info;

  formProfileValidation.deleteError();
})

// Новый класс карточек - Создать новое место
const newCardPopup = new PopupWithForm({
  popupSelector: '.popup_add',
  handleFormSubmit: (item) => {
    const card = renderCard(item);
    cardsSection.addItem(card);
    newCardPopup.close();
  }
});

newCardPopup.setEventListeners();

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

// Создание карточек
function renderCard(data) {
  const card = new Card(data, '#card-template', handleCardClick);
  const cardElement = card.generateCard();

  return cardElement;
}

function handleCardClick(name, link) {
  imgPopup.open(name, link)
}

// слушатель для попапа "Место"
popupAddOpenButton.addEventListener('click', () => {
  newCardPopup.open();
  formCardValidation._toggleButtonState();
  formCardValidation.deleteError();
});

// Экземпляр попапа большой картинки
const imgPopup = new PopupWithImage('.popup_img');

imgPopup.setEventListeners();

// Экземпляры класса валидации
const formProfileValidation = new FormValidator(configValidation, formProfile);
formProfileValidation.enableValidation();

const formCardValidation = new FormValidator(configValidation, formCard);
formCardValidation.enableValidation();