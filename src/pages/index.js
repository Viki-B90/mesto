import {
  popupEdit,
  popupAdd,
  popupImage,
  popupAvatar,
  buttonChangeAvatar,
  popupDelete,
  popupEditOpenButton, 
  userName, 
  userAbout,
  profileInfo,
  profileName,
  profileAvatar,
  popupAddOpenButton,
  formProfile,
  formCard,
  formAvatar,
  cardsContainer,
  templateSelector
  } from '../utils/utils.js';
import Card from '../components/Card.js';
import { configValidation } from '../utils/constants.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import { api } from '../components/Api.js';
import './index.css';

const basket = new URL('../images/basket.svg', import.meta.url);
const heart = new URL('../images/heart.svg', import.meta.url);
const heartBlack = new URL('../images/heart_black.svg', import.meta.url);
const iconClose = new URL('../images/icon_close.svg', import.meta.url);
const iconPencil = new URL('../images/icon_pencil.svg', import.meta.url);
const iconPlus = new URL('../images/icon_plus.svg', import.meta.url);
const logo = new URL('../images/mesto_logo.svg', import.meta.url);

const images = [
  { name: 'Basket', link: basket },
  { name: 'Heart', link: heart },
  { name: 'Heart Black', link: heartBlack },
  { name: 'Icon Close', link: iconClose },
  { name: 'Icon Pencil', link: iconPencil },
  { name: 'Icon Plus', link: iconPlus },
  { name: 'Logo', link: logo },
]; 

//Новый класс данных профиля
const userInfo = new UserInfo({
  nameSelector: profileName,
  infoSelector: profileInfo,
  avatarSelector: profileAvatar
});

// Загрузка данных с сервера
let userId;

Promise.all([api.getUserProfile(), api.getInitialCards()])
.then(([dataUser, dataCard]) => {
  userId = dataUser._id;

  userInfo.setUserInfo(dataUser);
  cardsSection.renderItems(dataCard.reverse());
  console.log(dataUser);
  console.log(dataCard);
})
.catch((err) => {
  console.error(`Ошибка: ${err}`);
})

// Новый класс секция карточки
const cardsSection = new Section({
  renderer: (data) => {
    cardsSection.addItem(renderCard(data));
  },
},
cardsContainer
);

// Создание карточек
function renderCard(data) {
  const card = new Card({
    userId,
    data,
    templateSelector: templateSelector,
    handleCardClick: (name, link) => {
      imgPopup.open(name, link);
    },
    handleLikeClick: () => {
      api.setLikeCard(data._id)
        .then((res) => {
          card.setLike()
          card.getLikesCounter(res)
        })
        .catch((err) => {
          console.error(`Ошибка: ${err}`);
        })
    },
    handleDeleteLike: () => {
      api.deleteLikeCard(data._id)
        .then((res) => {
          card.unsetLike(data._id)
          card.getLikesCounter(res)
        })
        .catch((err) => {
          console.error(`Ошибка: ${err}`);
        });
    },
    handleDeleteIconClick: () => {
      confirmPopup.setSubmitAction(() => {
        api.deleteCard(data._id)
          .then((res) => {
            card.removeCard(res)
            confirmPopup.close()
          })
          .catch((err) => {
          console.error(`Ошибка: ${err}`);
          })
      });
      confirmPopup.open();
    },
  })
  const cardElement = card.generateCard();

  return cardElement;
}

// Экземпляр попапа Удалить карточку
const confirmPopup = new PopupWithConfirmation(popupDelete);

confirmPopup.setEventListeners();

// Экземпляр попапа Обновить аватар
const newAvatarPopup = new PopupWithForm({
  popupSelector: popupAvatar,
  handleFormSubmit: (data) => {
    newAvatarPopup.renderLoading(true);
    api.changeUserAvatar(data)
      .then((res) => {
        userInfo.setUserAvatar(res);
        newAvatarPopup.close();
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      })
      .finally(() => {
        newAvatarPopup.renderLoading(false);
      });
  }
});

newAvatarPopup.setEventListeners();

//Новый класс профиля
const profileEditPopup = new PopupWithForm({
  popupSelector: popupEdit,
  handleFormSubmit: (data) => {
    profileEditPopup.renderLoading(true);
    api.setUserProfile(data)
      .then((res) => {
        userInfo.setUserInfo(res);
        profileEditPopup.close();
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      })
      .finally(() => {
        profileEditPopup.renderLoading(false)
      });
  }
});

profileEditPopup.setEventListeners();

// Экземпляр попапа Добавить карточку
const newCardPopup = new PopupWithForm({
  popupSelector: popupAdd,
  handleFormSubmit: (data) => {
    newCardPopup.renderLoading(true);
    api.addNewCard(data)
      .then((res) => {
        cardsSection.addItem(renderCard(res));
        newCardPopup.close();
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      })
      .finally(() => {
        newCardPopup.renderLoading(false)
      });
  }
});

newCardPopup.setEventListeners();

// Экземпляр попапа большой картинки
const imgPopup = new PopupWithImage(popupImage);

imgPopup.setEventListeners();

// Экземпляры класса валидации
const formProfileValidation = new FormValidator(configValidation, formProfile);
formProfileValidation.enableValidation();

const formCardValidation = new FormValidator(configValidation, formCard);
formCardValidation.enableValidation();

const formAvatarValidation = new FormValidator(configValidation, formAvatar);
formAvatarValidation.enableValidation();

// Слушатель для Аватарки
buttonChangeAvatar.addEventListener('click', () => {
  newAvatarPopup.open();
  formAvatar.reset();
  formAvatarValidation.deleteError();
});

// Слушатель Профиля
popupEditOpenButton.addEventListener('click', () => {
  profileEditPopup.open();
  formProfile.reset();
  formProfileValidation.deleteError();
 
  const userData = userInfo.getUserInfo();
  userName.value = userData.nameSelector;
  userAbout.value = userData.infoSelector;
});

// Слушатель Добавить карточку
popupAddOpenButton.addEventListener('click', () => {
  newCardPopup.open();
  formCard.reset();
  formCardValidation.deleteError();
})