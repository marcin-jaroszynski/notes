import Helper from '../helper.js'

export default class Tag {
  constructor(data=this.getEmptyObject()) {
    this.title = data.title;
    this.url = data.url;
    this.code = data.code;
    if (data.title) {
      this.code = Helper.slugify(this.title);
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
    return '/tags/' + this.code;
  }

  getEmptyObject() {
    return  {
      title: '',
      url: '',
      code: ''
    }
  }
}