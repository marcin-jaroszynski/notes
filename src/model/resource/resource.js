import Helper from '../helper.js'

export default class Resource {
  constructor(data=this.getEmptyObject()) {
    this.title = data.title;
    this.url = data.url;
    this.code = (data.code) ? data.code : '';
    if (data.title) {
      this.code = Helper.slugify(data.title);
      this.url = this.createUrl();
    }
  }

  getTitle() {
    return this.title;
  }

  getUrl() {
    return this.url;
  }

  getCode() {
    return this.code;
  }

  createUrl() {
    return '';
  }

  getEmptyObject() {
    return  {
      title: '',
      url: '',
      code: ''
    }
  }
}