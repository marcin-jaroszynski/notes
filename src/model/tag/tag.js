import Helper from '../helper.js'

export default class Tag {
  constructor(data=this.getEmptyObject()) {
    this.title = data.title;
    this.url = data.url;
    if (data.title) {
      this.url = this.createUrl();
    }
  }

  getTitle() {
    return this.title;
  }

  getUrl() {
    return this.url;
  }

  createUrl() {
    return '/tags/' + Helper.slugify(this.title);
  }

  getEmptyObject() {
    return  {
      title: '',
      url: ''
    }
  }
}