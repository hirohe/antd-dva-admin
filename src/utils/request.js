import fetch from 'dva/fetch';
import { notification } from 'antd';

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 400) {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
  return response;
}

function checkTimeout(data) {
  if (data.statusCode === '301') {
    notification.error({
      message: '错误！',
      description: data.message
    });
    window.location.hash = '#/login'
  }
  return data
}

function showError(err) {
  if (err.response) {
    notification.error({
      message: '网络连接错误！',
      description: `错误代码：${err.response.status}, ${err.message}`
    });
  }
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  return fetch(url, {credentials: 'include', ...options})
    .then(checkStatus)
    .then(parseJSON)
    .then(checkTimeout)
    .then((data) => ({ data }))
    .catch((err) => {
      showError(err);
      return null
    });
}
