export default class Category {
  static getList() {
    return [
          { title: 'CSS', url: '/css' },
          { title: 'JavaScript', url: '/category/show/javascript' },
          { title: 'HTML 5', url: '/category/show/html5' },
          { title: 'PHP', url: '/category/show/php' },
    ];
  }
}