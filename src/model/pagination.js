export default class Pagination {
  constructor() {
    this.numOfAllEntries = 0;
    this.currentPage = 1;
    this.offset = 0;
    this.numEntriesPerPage = 0;
  }

  setNumOfAllEntries(numOfAllEntries) {
    this.numOfAllEntries = numOfAllEntries;
  }

  setCurrentPage(currentPage) {
    this.currentPage = currentPage;
  }
  
  getCurrentPage() {
    return this.currentPage;
  }

  setNumEntriesPerPage(num) {
    this.numEntriesPerPage = num;
  }

  getNumEntriesPerPage() {
    return this.numEntriesPerPage;
  }

  setOffset(offset) {
    this.offset = offset;
  }

  getOffset() {
    return this.offset;
  }

  getPages() {
    return Math.ceil(this.numOfAllEntries / this.getNumEntriesPerPage());
  }
}