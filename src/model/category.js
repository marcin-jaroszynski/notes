export default class Category {
  static getList() {
    return [
          { title: 'CSS', code: 'css', url: '/category/show/css' },
          { title: 'JavaScript', code: 'javascript', url: '/category/show/javascript' },
          { title: 'HTML 5', code: 'html5', url: '/category/show/html5' },
          { title: 'PHP', code: 'php', url: '/category/show/php' },
          { title: 'MySQL', code: 'mysql', url: '/category/show/mysql' },
    ];
  }

  static getTitleFor(code) {
    let data = this.getList();
    let categoryTitle = 'undefined';
    for (let i = 0; i < data.length; i++) {
      if (data[i].code == code) {
        categoryTitle = data[i].title;
      }
    }
    return categoryTitle;
  }
}