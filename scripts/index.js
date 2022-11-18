const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
const popupOpenButtonElement = document.querySelector('.profile__edit');
const formElement = document.querySelector('.popup__form');
const userName = document.querySelector('.popup__input_type_name');
const userInfo = document.querySelector('.popup__input_type_info');
const profileName = document.querySelector('.profile__info_type_name');
const profileInfo = document.querySelector('.profile__info_type_about-me');

const openPopup = function () {
  popupElement.classList.add('popup_opened');
  userName.value = profileName.textContent;
  userInfo.value = profileInfo.textContent;
}

const closePopup = function () {
  popupElement.classList.remove('popup_opened');
}


function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = userName.value;
  profileInfo.textContent = userInfo.value;

  closePopup ();
}

popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);