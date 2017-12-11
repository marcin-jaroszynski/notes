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

  isInclude(tagCode) {
    let tagToFind = this.findByCode(tagCode);
    if (tagToFind.getTitle()) {
      return true;
    }
    return false;
  }

  compare(tagListToCompare) {
    let secondTagList = new TagList();
    secondTagList.addMany(tagListToCompare.get());
    let data = {};
    data.toAdd =  new TagList();
    data.toRemove = new TagList();
    let note1Tags = this.get();
    for (let i = 0; i < note1Tags.length; i++) {
      if (secondTagList.isInclude(note1Tags[i].getCode())) {
        secondTagList.remove(note1Tags[i].getTitle());
      } else {
        data.toRemove.add(note1Tags[i].getTitle());
      }
    }
    data.toAdd.addMany(secondTagList.get());
    return data;
  }
} 