export default class Helper {
  static slugify(string) {
    return string.toLowerCase().replace(/[^\w]/g, ''); 
  }
}