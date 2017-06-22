import Helper from '../helper.js'
import Resource from '../resource/resource.js'

export default class Category extends Resource {
  createUrl() {
    return '/category/show/'+ this.code;
  }

  setTitle(title) {
    if (title) {
      this.code = Helper.slugify(title);
      this.url = this.createUrl();
      this.title = title;
    }
  }
}