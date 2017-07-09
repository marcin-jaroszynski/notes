import Tag from './tag.js'
import ResourceList from '../resource/list.js'

export default class TagList extends ResourceList {
  add(title) {
    let tagToFind = this.checkIsExist(title);
    if (!tagToFind.getTitle()) {
      this.data.push(new Tag({title: title}));
      return true;
    }
    return false;
  }

  addMany(tags) {
    for (let i = 0; i < tags.length; i++) {
      this.add(tags[i].title);
    }
  }

  removeMany(tags) {
    for (let i = 0; i < tags.length; i++) {
      this.remove(tags[i].title);
    }
  }
} 