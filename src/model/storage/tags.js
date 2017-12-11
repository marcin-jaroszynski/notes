import Tag from '../tag/tag.js'

export default class Tags {
  constructor(categories) {
    this.categories = categories;
  }

  tag(tagCode) {
    let categories = this.categories.getAll();
    for (let i = 0; i < categories.length; i++) {
      let tagToFind = categories[i].isHasTag(tagCode);
      if (tagToFind.getTitle()) {
        return tagToFind;
      }
    }
    return new Tag();
  }
}