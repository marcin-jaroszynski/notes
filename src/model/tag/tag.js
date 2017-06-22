import Helper from '../helper.js'
import Resource from '../resource/resource.js'

export default class Tag extends Resource {
  createUrl() {
    return '/tags/' + this.code;
  }
}