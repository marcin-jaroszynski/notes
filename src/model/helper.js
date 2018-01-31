export default class Helper {
  static slugify(string) {
    return string.toLowerCase().replace(/\s+/g, '-').replace(/[^-^\w]/g, ''); 
  }

  static clone(object) {
    return Object.assign(Object.create(object), object);
  }
}