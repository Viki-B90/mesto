import { popupEdit, popupEditCloseButton, popupEditOpenButton, formEdit, userName, userInfo, profileName,
  profileInfo, popupAdd, popupAddOpenButton, popupAddCloseButton, popupImage, popupImageCloseButton, formAdd, cardTitle,
  cardLink, cardsContainer, popupCreateCard, openPopup, openProfilePopup, closePopup } from "./utils.js";
import { Card } from "./Card.js";
import { initialCards } from "./cards.js";
import { FormValidator, configValidation, deleteInputError, deleteSpanError } from "./FormValidator.js";

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