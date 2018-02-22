export default class DashboardPagination {
  constructor(numOfAllEntries) {
    this.numOfAllEntries = numOfAllEntries;
  }

  getEntriesPerPage() {
    return 10;
  }

  getPages() {
    return Math.ceil(this.numOfAllEntries / this.getEntriesPerPage());
  }
}