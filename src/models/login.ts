import { history, Reducer, Effect, Subscription } from 'umi';

import { fakeAccountLogin } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { message } from 'antd';
import LocalStore from '@/utils/LocalStore';
import { stringify } from 'qs';

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
    logout: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<StateType>;
  };
  subscriptions: {
    setup: Subscription;
  };
}

const Model: ModelType = {
  namespace: 'login',
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
          }
        }
        setTimeout(() => {
          window.location.href = redirect || '/';
        }, 500);
      }
      if (response.status === 'error') {
        message.error(response.message);
      }
    },
    logout() {
      const { redirect } = getPageQuery();

      if (window.location.pathname !== '/login' && !redirect) {
        LocalStore.remove('token');
        LocalStore.remove('authority');
        history.replace({
          pathname: '/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
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
