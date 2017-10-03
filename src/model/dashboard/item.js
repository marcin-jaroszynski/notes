export default class DashboardItem {
  constructor(note, category) {
    this.noteId = note.getId();
    this.noteTitle = note.getTitle();
    this.noteUrl = note.getUrl();
    this.noteDateAdded = note.getDateAdded();
    this.categoryTitle = category.getTitle();
    this.categoryUrl = category.getUrl();
  }

  getNoteId() {
    return this.noteId;
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

  setNoteId(noteId) {
    this.noteId = noteId;
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
}