export default class Helper {
  // dopisać zamiany wielu spacji na jedną i jednej spacji na myślnik. Skorzystwać z: replace(/\s\s+/g, ' ');
  static slugify(string) {
    return string.toLowerCase().replace(/\s+/g, '-').replace(/[^-^\w]/g, ''); 
  }
}