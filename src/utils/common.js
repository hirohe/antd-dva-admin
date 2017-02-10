import request from './request';
import qs from 'qs';

//action generator
export function action(type, payload) {
  return {
    type: type,
    payload: payload,
  }
}

//helper function, bind 'this' keyword to 'that' functions
export function bindThis(that, ...funcNames) {
  funcNames.forEach((funcName) => {
    that[funcName] = that[funcName].bind(that)
  });
}
