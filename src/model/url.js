export default class Url {
  static getLogin() {
    return '/login';
  }
  
  static getDashboard() {
    return '/dashboard/';
  }

  static getCategoryShow(categoryId) {
    return '/category/show/' + categoryId;
  }

  static getCategoryAdd() {
    return '/category/add/';
  }

  static getNoteShow(noteId) {
    return '/note/show/' + noteId;
  }

  static getNoteAdd(categoryId) {
    return '/note/add/' + categoryId;
  }
}