export default class UserInfo {
  constructor({ nameSelector, infoSelector, avatarSelector }) {
    this._name = nameSelector;
    this._info = infoSelector;
    this._avatar = avatarSelector;
  }

  getUserInfo() {
    return {
      nameSelector: this._name.textContent,
      infoSelector: this._info.textContent,
      avatarSelector: this._avatar.src
    }
  }
 
  setUserInfo(data) {
    this._name.textContent = data.name;
    this._info.textContent = data.about;
    this.setUserAvatar(data);
  }

  setUserAvatar(data) {
    this._avatar.src = data.avatar;
  }
}