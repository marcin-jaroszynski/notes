import Helper from '../helper.js'

export default class Category {
  constructor(data=this.getEmptyObject()) {
    this.setTitle(data.title);
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

  createUrl(code) {
    return '/category/show/'+ code;
  }

  setTitle(categoryTitle) {
    if (categoryTitle) {
      this.code = Helper.slugify(categoryTitle);
      this.url = this.createUrl(this.code);
      this.title = categoryTitle;
    } else {
      let emptyObject = this.getEmptyObject();
      this.title = emptyObject.title;
      this.code = emptyObject.code;
      this.url = emptyObject.url;
    }
  }



  getEmptyObject() {
    return {
      title: '',
      code: '',
      url: ''
    }
  }
}