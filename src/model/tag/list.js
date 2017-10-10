import Tag from './tag.js'
import ResourceList from '../resource/list.js'

export default class TagList extends ResourceList {
  add(title) {
    if (title) {
      let tagToFind = this.checkIsExist(title);
      if (!tagToFind.getTitle()) {
        this.data.push(new Tag({title: title}));
        return true;
      }
    }
    return false;
  }

  set(tags) {
    this.reset();
    this.addMany(tags);
  }

  addMany(tags) {
    for (let i = 0; i < tags.length; i++) {
      this.add(tags[i].title);
    }
    return true;
  }

  removeMany(tags) {
    for (let i = 0; i < tags.length; i++) {
      this.remove(tags[i].title);
    }
    return true;
  }
} 