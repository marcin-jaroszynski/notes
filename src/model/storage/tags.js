import Tag from '../tag/tag.js'

export default class Tags {
  constructor(categories) {
    this.categories = categories;
  }

  tag(tagCode) {
    let categories = this.categories.getAll();
    for (let i = 0; i < categories.length; i++) {
      if (categories[i].tags.isInclude(tagCode)) {
        return categories[i].tags.findByCode(tagCode);
      }
    }
    return new Tag();
  }
}