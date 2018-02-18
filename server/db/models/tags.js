import mongoose from 'mongoose';
import tagSchema from './tag';

export default class CategoryTags {
  constructor(tags) {
    this.tagsMap = this._createMap(tags);
  }

  get() {
    return Array.from(this.tagsMap.values());
  }

  add(tags) {
    let categoryTagsSchema = mongoose.model('categoryTagSchema', tagSchema);
    for (let i = 0; i < tags.length; i++) {
      if (this.tagsMap.has(tags[i].code)) {
        let currentTag = this.tagsMap.get(tags[i].code);
        currentTag.counter++;
        this.tagsMap.set(currentTag.code, currentTag);
      } else {
        this.tagsMap.set(tags[i].code, new categoryTagsSchema({title: tags[i].title, code: tags[i].code}));        
      }
    }
  }

  reduce(tags) {
    for (let i = 0; i < tags.length; i++) {
      if (this.tagsMap.has(tags[i].code)) {
        let currentTag = this.tagsMap.get(tags[i].code);
        currentTag.counter--;
        if (currentTag.counter === 0) {
          this.tagsMap.delete(currentTag.code);
        } else {
          this.tagsMap.set(currentTag.code, currentTag);
        }
      }
    }
  }

  _createMap(tags) {
    let tagsMap = new Map();
    for (let i = 0; i < tags.length; i++) {
      tagsMap.set(tags[i].code, tags[i]);
    }
    return tagsMap;
  }
  
}