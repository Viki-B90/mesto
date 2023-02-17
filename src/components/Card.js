export default class Card {
  constructor({data, templateSelector, userId, handleCardClick, handleLikeClick, handleDeleteLike, handleDeleteIconClick}) {
    this._title = data.name;
    this._image = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._owner = data.owner;
    this._ownerId = data.owner._id;
    this._userId = userId;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteLike = handleDeleteLike;
    this._handleDeleteIconClick = handleDeleteIconClick;
  }

  _getTemplate() {
  const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    const imageElement = this._element.querySelector('.element__image');
    imageElement.alt = this._title;
    imageElement.src = this._image;
    this._element.querySelector('.element__title').textContent = this._title;

    this._likeCounter = this._element.querySelector('.element__counter-like');
    this._likeCounter.textContent = this._likes.length;

    this._likeButton = this._element.querySelector('.element__like');

    this._deleteBasket();
    this.setLikeCounter();

    return this._element;
  }

  _deleteBasket() {
    if (this._ownerId !== this._userId) {
      this._element.querySelector('.element__delete').remove();
    }
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }

  _checkUserLikes() {
    return this._likes.find(like => like._id === this._userId);
  }

  setLike() {
    this._likeButton.classList.add('element__like_active');
  }

  unsetLike() {
    this._likeButton.classList.remove('element__like_active');
  }

  setLikeCounter() {
    if (this._checkUserLikes()) {
      this.setLike();
    } else {
      this.unsetLike();
    }
  }

  getLikesCounter(res) {
    this._likeCounter.textContent = res.likes.length;
  }

  _setEventListeners() {
    this._element.querySelector('.element__delete').addEventListener('click', () => {
      this._handleDeleteIconClick(this._id);
    });

    this._element.querySelector('.element__like').addEventListener('click', () => {
      if (this._likeButton.classList.contains('element__like_active')) {
        this._handleDeleteLike();
      } else {
        this._handleLikeClick();
      }
    });

    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleCardClick(this._title, this._image);
    });
  }
}