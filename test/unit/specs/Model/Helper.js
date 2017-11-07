import Category from '../../../../src/model/category/category.js'
import Note from '../../../../src/model/note/note.js'
import Tag from '../../../../src/model/tag/tag.js'
import TagList from '../../../../src/model/tag/list.js'

export default class Helper {
  static getCategory(title) {
    return new Category({ title: title });
  }

  static getNote(title, tags=[]) {
    let note = new Note();
    note.setTitle(title);
    note.setContent(title +' - Content');
    note.tags.addMany(this.getTagList(tags));
    return note;
  }

  static getTag(title)  {
    return new Tag({title: title});
  };

  static getTagList(tags) {
    let tagList = new TagList();
    for (let i = 0; i < tags.length; i++) {
      tagList.add(tags[i]);
    }
    return tagList;
  };
}