import Axios from 'axios';
import store from '../store';

const config = {
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  responseType: 'json',
};

const api = Axios.create();

// axiosでリクエストを実行する前に処理を行う
api.interceptors.request.use((request) => {
  // ログインしているかチェック ..etc
  return request
});

// axiosでリクエストを実行した後に処理を行う
api.interceptors.response.use(
  function (response) {
    // 200のときの処理
    return Promise.resolve(response.data);
  },
  function (error) {
    // 200以外の処理
    const status = error.response.status;

    switch (status) {
      case 500:
        return Promise.reject(new Error());
      case 404:
        return Promise.reject(new Error());
      case 401:
        return Promise.reject(new Error());
      default:
        return Promise.reject(new Error());
    }
  }
);

export default {
  request(method, endpoint, data = {}, jwt = '') {
    config.method = method;
    config.url = endpoint;
    config.data = data;
    config.headers.JWT = jwt;
    return api.request(config);
  },
};