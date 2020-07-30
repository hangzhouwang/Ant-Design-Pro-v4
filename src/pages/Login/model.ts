/*
 * @Author: lixiaoyun
 * @Company: http://hangzhou.com.cn
 * @Github: http://github.com/siaoynli
 * @Date: 2020-07-29 15:10:53
 * @LastEditors: lixiaoyun
 * @LastEditTime: 2020-07-30 12:08:01
 * @Description: 登录
 */

import { Effect, history, Reducer } from 'umi';
import { message } from 'antd';
import { parse } from 'qs';
import { fakeAccountLogin } from './service';
import LocalStore from '../../utils/LocalStore';
import { Subscription } from '../../.umi/plugin-dva/connect';

export function getPageQuery() {
  return parse(window.location.href.split('?')[1]);
}

export function setAuthority({
  authority,
  token,
}: {
  authority: string | string[];
  token: string;
}) {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  LocalStore.set('authority', proAuthority);
  LocalStore.set('token', token);
  try {
    if ((window as any).reloadAuthorized) {
      (window as any).reloadAuthorized();
    }
  } catch (error) {
    // do not need do anything
  }
  return authority;
}

export interface StateType {
  status?: 'ok' | 'error';
  type?: 'account' | 'phone' | 'weixin' | 'dingding';
  authority?: 'guest' | 'admin';
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    login: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<StateType>;
  };
  subscriptions: {
    setup: Subscription;
  };
}

const Model: ModelType = {
  namespace: 'adminLogin',
  state: {
    status: undefined,
  },
  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      // 登录成功
      if (response.status === 'ok') {
        message.success('登录成功！');
        yield put({
          type: 'changeLoginStatus',
          payload: response.data,
        });
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params as { redirect: string };
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
        history.replace(redirect || '/');
      } else {
        message.error(response.message);
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
  subscriptions: {
    setup() {
      return history.listen(({ pathname }: { pathname: string }) => {
        if (pathname === '/login') {
          if (LocalStore.get('token')) {
            history.replace('/');
          }
        }
      });
    },
  },
};

export default Model;
