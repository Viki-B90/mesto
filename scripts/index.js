// Объявляем переменные
const popupElement = document.querySelector('.popup');
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
const popupImage = document.querySelector('.popup_img');
const popupImageContainer = document.querySelector('.popup__container-image');
const openBigImage = document.querySelector('.popup__image');
const nameBigImage = document.querySelector('.popup__title-image');
const popupImageCloseButton = popupImage.querySelector('.popup__close');
const formAdd = document.querySelector('.popup__form_new_place');
const addTitle = document.querySelector('.popup__input_type_title');
const addLink = document.querySelector('.popup__input_type_link');
const cardsList = document.querySelector('.elements__list');
const cardTemplate = document.querySelector('#card-template').content.querySelector('.element');
const popupCreateCard = popupAdd.querySelector('.popup__save_new_place');

// Функция открытия 3х попапов
const openPopup = function (popup) {
  popup.classList.add('popup_opened');
   
  userName.value = profileName.textContent;
  userInfo.value = profileInfo.textContent;
}

// Функция закрытия 3х попапов
const closePopup = function (popup) {
  popup.classList.remove('popup_opened');
}

// Обработчики открытия попапов
popupEditOpenButton.addEventListener('click', function() {
  openPopup(popupEdit);
});
popupAddOpenButton.addEventListener('click', function() {
  openPopup(popupAdd);
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

// Массив карточек
const initialCards = [
  {
    name: 'Сулакский каньон',
    link: './images/sulakskij-kanon.jpg'
  },
  {
    name: 'Плато Лаго-Наки',
    link: './images/lago_naki.jpg'
  },
  {
    name: 'Камчатка',
    link: './images/kamchatka.jpeg'
  },
  {
    name: 'Остров Ольхон',
    link: './images/island_olhon.jpeg'
  },
  {
    name: 'Пятигорск',
    link: './images/eolova_arpha.jpg'
  },
  {
    name: 'Байкал',
    link: './images/baikal.jpg'
  }
]; 

const openCardPopup = function (dataCard) {
  nameBigImage.textContent = dataCard.name;
  openBigImage.alt = dataCard.name;
  openBigImage.src = dataCard.link;

  openPopup(popupImage);
}

// Генерация карточек
const generateCard = (dataCard) => {
  const newCard = cardTemplate.cloneNode(true);
  const titleElement = newCard.querySelector('.element__title');
  const imageElement = newCard.querySelector('.element__image');
  titleElement.textContent = dataCard.name;
  imageElement.alt = dataCard.name;
  imageElement.src = dataCard.link;

  const deleteCardElement = newCard.querySelector('.element__delete');
  deleteCardElement.addEventListener('click', handleDeleteCard);
  const likeCardElement = newCard.querySelector('.element__like');
  likeCardElement.addEventListener('click', handleLikeCard);
  imageElement.addEventListener('click', openCardPopup);
 
  imageElement.addEventListener('click', function () {
    openBigImage.src = imageElement.src;
    nameBigImage.textContent = titleElement.textContent;
  });

  return newCard;
}

// Удаление и лайки карточек
const handleDeleteCard = (event) => {
  event.target.closest('.element').remove();
};
const handleLikeCard = (event) => {
  event.target.classList.toggle('element__like_active');
};

// Функция отправки событий - кнопка Создать карточку
function handleFormAddSubmit (event) {
  event.preventDefault();
  renderCard({ name: addTitle.value, link: addLink.value })
  addTitle.value = '';
  addLink.value = '';
 
  closePopup (popupAdd);
};

popupCreateCard.addEventListener('click', handleFormAddSubmit);

// Добавление карточек
const renderCard = (dataCard) => {
  cardsList.prepend(generateCard(dataCard));
};

// Рендер карточек
initialCards.forEach((dataCard) => {
  renderCard(dataCard);
});