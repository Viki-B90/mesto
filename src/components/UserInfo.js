export default class UserInfo {
  constructor({ nameSelector, infoSelector }) {
    this._name = document.querySelector(nameSelector);
    this._info = document.querySelector(infoSelector);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      info: this._info.textContent
    }
  }

  setUserInfo(userAbout) {
    this._name.textContent = userAbout.name;
    this._info.textContent = userAbout.info;
  }
}