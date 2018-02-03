import axios from 'axios'

export default class HttApi {
  constructor() {
    this.http = axios.create({
      baseURL: '/api/'
    });
  }

  get(url, params) {
    return this._request('get', url, params);
  }

  post(url, params) {
    return this._request('post', url, params);
  }

  async _request(method, url, params) {
    let response = { data: { success: false } };
    if ('get' === method) {
      response = await this.http.get(url, { params });
    } else if ('post' === method) {
      response = await this.http.post(url, params);
    }
    if (false == response.data.success) {
      this.messageError();
      return false;
    } else {
      return response.data;
    }
 
  }
  messageError() {
    alert('Sorry, something went wrong');
  }
}