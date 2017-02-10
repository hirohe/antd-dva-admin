import request from '../utils/request';
import qs from 'qs'

export async function loginRequest(params) {
  return request('/CusMgrSys/controller/login', {
    method: 'POST',
    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
    body: qs.stringify(params)
  })
}

export async function loginByUUID(params) {
  return request(`/CusMgrSys/controller/loginByUUID?${qs.stringify(params)}`, {method: 'POST'})
}

export async function checkLogin() {
  return request('/CusMgrSys/controller/checkLogin')
}

export async function logout() {
  return request('/CusMgrSys/controller/logout')
}
