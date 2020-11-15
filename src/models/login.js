import { stringify } from 'querystring';
import { history } from 'umi';
import { fakeAccountLogin } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import {message} from "antd"

const Model = {
  namespace: 'login',
  state: {
    status: undefined,
  },
  effects: {
    *login({ payload }, { call, put }) {
      // const response = yield call(fakeAccountLogin, payload);
      // yield put({
      //   type: 'changeLoginStatus',
      //   payload: response,
      // }); // Login successfully

      console.log('payload',payload);
      if(payload.userName === "admin" && payload.password === "123456"){
        history.push('/');
      }else{
        message.error('用户名或密码错误')
      }
    },

    logout() {
      // const { redirect } = getPageQuery(); // Note: There may be security issues, please note

      // if (window.location.pathname !== '/user/login' && !redirect) {
      //   history.replace({
      //     pathname: '/user/login',
      //     search: stringify({
      //       redirect: window.location.href,
      //     }),
      //   });
      // }
      history.replace('/user/login');
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return { ...state, status: payload.status, type: payload.type };
    },
  },
};
export default Model;
