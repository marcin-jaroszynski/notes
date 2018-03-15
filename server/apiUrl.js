export default class ApiUrl {
  constructor(env) {
    console.log('ApiUrl.constructor.env: ' + env);
    this.prefix = '/';
    if ('dev' === env || 'test' === env) {
      this.prefix = '/api/';
    }
  }

  categoryAdd() {
    return this.prefix + 'category/add';
  }

  categoryChangeTitle() {
    return this.prefix + 'category/change-title';
  }

  categoryNotes() {
    return this.prefix + 'category/get-notes';
  }

  noteAdd() {
    return this.prefix + 'note/add';
  }

  noteEdit() {
    return this.prefix + 'note/edit';
  }

  note() {
    return this.prefix + 'note/get';
  }

  noteRemove() {
    return this.prefix + 'note/remove';
  }

  noteGetByTag() {
    return this.prefix + 'note/getByTag';
  }

  storageInit() {
    return this.prefix + 'storage/init';
  }

  dashboard() {
    return this.prefix + 'dashboard/get';
  }

  login() {
    return this.prefix + 'login';
  }
}