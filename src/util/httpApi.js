import axios from 'axios'

export default class HttApi {
  constructor() {
    this.http = axios.create({
      baseURL: '/api/'
    });
  }

  get(url, params, callback) {
    this._request('get', url, params, callback);
  }

  post(url, params, callback) {
    this._request('post', url, params, callback);
  }

  _request(method, url, params, callback) {
    let request = null;
    if ('get' === method) {
      request = this.http.get(url, params);
    } else if ('post' === method) {
      request = this.http.post(url, params);
    }
    let that = this;
    if (null !== request) {
      request.then(function(response) {
            if (false == response.data.success) {
                that.messageError();
                callback(false);
              } else {
                callback(response.data);
              }
            })
            .catch(function(error) {
              callback(false);
            });
    }
  }
  messageError() {
    alert('Sorry, something went wrong');
  }
}