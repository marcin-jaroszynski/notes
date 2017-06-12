import Helper from '../helper.js'

export default class Category {
  constructor(data=this.getEmptyObject()) {
    let code = '';
    let url = '';
    if (data.title) {
      code = Helper.slugify(data.title);
      url = '/category/show/'+ code;
    }
    this.title = data.title;
    this.code = code;
    this.url = url;
  }

  getTitle() {
    return this.title;
  }

  getCode() {
    return this.code;
  }

  getUrl() {
    return this.url;
  }

  getEmptyObject() {
    return {
      title: '',
      code: '',
      url: ''
    }
  }
}