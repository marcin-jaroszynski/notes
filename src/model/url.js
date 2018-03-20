export default class Url {
  static getLogin() {
    return '/login';
  }

  static getLogout() {
    return '/logout';
  }
  
  static getDashboard() {
    return '/dashboard/';
  }

  static getDashboardPage(page) {
    return '/dashboard/page/' + page;
  }

  static getCategoryShow(categoryId) {
    return '/category/show/' + categoryId;
  }

  static getCategoryShowPage(categoryId, page) {
    return '/category/show/' + categoryId + '/page/' + page;
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

  static getNoteEdit(noteId) {
    return '/note/edit/' + noteId;
  }

  static getTagsResult(tagCode) {
    return '/tags/' + tagCode;
  }
}