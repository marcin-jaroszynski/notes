export default class DashboardItem {
  constructor() {
    let data = this._getEmpty();
    this.noteTitle = data.noteTitle;
    this.noteUrl = data.noteUrl;
    this.noteDateAdded = data.noteDateAdded;
    this.categoryTitle = data.category;
    this.categoryUrl = data.categoryUrl;
  }

  getNoteTitle() {
    return this.noteTitle;
  }

  getNoteUrl() {
    return this.noteUrl;
  }

  getNoteDateAdded() {
    return this.noteDateAdded;
  }

  getCategoryTitle() {
    return this.categoryTitle;
  }

  getCategoryUrl() {
    return this.categoryUrl;
  }

  setNoteTitle(title) {
    this.noteTitle = title;
  }

  setNoteUrl(url) {
    this.noteUrl = url;
  }

  setNoteDateAdded(dateAdded) {
    this.noteDateAdded = dateAdded;
  }

  setCategoryTitle(name) {
    this.categoryTitle = name;
  }

  setCategoryUrl(url) {
    this.categoryUrl = url;
  }

  _getEmpty() {
    return {
      noteTitle: '',
      noteUrl: '',
      noteDateAdded: '',
      categoryTitle: '',
      categoryUrl: ''
    };
  }
}