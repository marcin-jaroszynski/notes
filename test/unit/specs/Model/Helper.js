import Category from '../../../../src/model/category/category.js'
import CategoryTag from '../../../../src/model/category/tag.js'
import CategoryTagList from '../../../../src/model/category/tagList.js'
import Note from '../../../../src/model/note/note.js'
import NoteList from '../../../../src/model/note/list.js'
import Tag from '../../../../src/model/tag/tag.js'
import TagList from '../../../../src/model/tag/list.js'
import Resource from '../../../../src/model/resource/resource.js'
import ResourceList from '../../../../src/model/resource/list.js'
import Dashboard from '../../../../src/model/dashboard/dashboard.js'
import Storage from '../../../../src/model/storage/storage.js'
import StorageCategories from '../../../../src/model/storage/categories.js'

export default class Helper {
  static getCategory(title) {
    if (!title) {
      title = '';
    }
    return new Category({ title: title });
  }

  static getNote(title='', tags=[]) {
    let note = new Note();
    if (title) {
      note.setTitle(title);
      note.setContent(title +' - Content');
      let tagList = this.getTagList(tags);
      note.tags.addMany(tagList.get());
    }
    return note;
  }

  static getTag(title) {
    return new Tag({title: title});
  };

  static getCategoryTag(title) {
    return new CategoryTag({title: title});
  }

  static getCategoryTagList() {
    return new CategoryTagList();
  }

  static getTagList(tags=[]) {
    let tagList = new TagList();
    for (let i = 0; i < tags.length; i++) {
      tagList.add(tags[i]);
    }
    return tagList;
  };

  static getStorage() {
    return new Storage();
  };

  static getNoteList() {
    return new NoteList();
  };

  static getResource(title='') {
    if (title) {
      return new Resource({title: title});
    } else {
      return new Resource();
    }
  };

  static getResourceList()  {
    return new ResourceList();
  };

  static getStorageCategories() {
    return new StorageCategories(); 
  };

  static getDashboard() {
    return new Dashboard();
  };

  static getStorageCategories() {
    let dashboard = this.getDashboard();
    return new StorageCategories(dashboard); 
  };
}