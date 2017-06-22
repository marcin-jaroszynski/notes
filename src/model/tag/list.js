import Tag from './tag.js'
import ResourceList from '../resource/list.js'

export default class TagList extends ResourceList {
  add(title) {
    this.data.push(new Tag({title: title}));
  }
} 