import fetch from 'dva/fetch';
import qs from 'qs';
import { saveAs } from 'file-saver';

export default function download(url, {params, options, finishCallback}) {
  let filename = '';
  fetch(`${url}?${qs.stringify(params)}`, { ...options, credentials: 'include' })
    .then(response => {
      filename = response.url.substring(response.url.lastIndexOf('/') + 1, response.url.length - 1);
      return response.blob()
    })
    .then(blob => {
      saveAs(blob, filename);
      finishCallback()
    })
}

