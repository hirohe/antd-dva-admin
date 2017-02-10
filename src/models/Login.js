import { message } from 'antd';
import { routerRedux } from 'dva/router';
import { loginRequest, checkLogin, logout } from '../services/login';

export default {

  namespace: 'login',

  state: {
    isLoggedIn: false,
    username: '',
    loading: false,
  },

  subscriptions: {
    checkLogin({ dispatch, history }) {
      history.listen( ({pathname, query}) => {
        if (pathname === '/home') {
          dispatch({type: 'checkLogin'});
        }
      })
    }
  },

  effects: {
    *login({payload}, {put, call, select}) {
      yield put({type: 'startLoading'});
      const { data } = yield call(loginRequest, payload.user);
      if (data) {
        console.log(data);
        if (data.statusCode == '200') {
          //login success
          yield put(routerRedux.push({pathname: '/home'}))
        } else {
          message.error(data.message);
        }
      }
      yield put({type: 'endLoading'});
    },
    *checkLogin( {payload}, {put, call, select}) {
      const { data } = yield call(checkLogin);
      if (data) {
        console.log(data);
        if (data.data.isLoggedIn !== 1) {
          yield put(routerRedux.push({pathname: '/login'}));
          throw new Error('没有登录', 0);
        }
      }
    },
    *logout({ payload }, {put, call, select}) {
      const response = yield call(logout);
      if (response) {
        if (response.data.statusCode === '200') {
          message.success('注销成功！');
          yield put(routerRedux.push({pathname: '/login'}));
        } else {
          message.error('注销失败！')
        }
      } else {
        message.error('注销失败！')
      }
    }
  },

  reducers: {
    loggedIn(state, action) {
      return { ...state, isLoggedIn: true, username: action.payload.username }
    },
    logout(state) {
      return { ...state, isLoggedIn: false }
    },
    startLoading(state) {
      return { ...state, loading: true }
    },
    endLoading(state) {
      return { ...state, loading: false }
    },
  }

}
