import axios from 'axios'
import VueCookies from 'vue-cookies'

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
    try {
      if (VueCookies.get('token')) {
        params.token = VueCookies.get('token');
      }
      if ('get' === method) {
        response = await this.http.get(url, { params });
      } else if ('post' === method) {
        response = await this.http.post(url, params);
      }
      if (response.data.token) {
        VueCookies.set('token', response.data.token, 60*60);
      }
    } catch(error) {
      this.messageError(error.response.data.message);
      throw new Error();
    }
    return response.data;
  }
  messageError(message) {
    let displayMessage = 'Sorry, something went wrong'; 
    alert(message);
  }
}