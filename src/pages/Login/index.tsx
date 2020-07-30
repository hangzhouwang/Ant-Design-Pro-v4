import { Helmet, HelmetProvider } from 'react-helmet-async';
import { connect, Dispatch } from 'umi';
import React, { useEffect, useState } from 'react';
import { ConnectState } from '@/models/connect';
import ParticlesBg from 'particles-bg';

import './index.less';

import { FormValue } from '@/typings';
import LoginForm from './components/LoginForm';
import { getSystemInfo } from './service';
import LocalStore from '../../utils/LocalStore';

interface IProps {
  dispatch: Dispatch;
}

const Login: React.FC<IProps> = ({ dispatch }) => {
  const [title, setTitle] = useState<string>('');

  // 进入页面执行,获取网站基本信息
  useEffect(() => {
    const siteTitle = LocalStore.get('app_name');
    async function fetchData() {
      const res = await getSystemInfo();
      if (res.status === 'ok') {
        setTitle(res.data.site_name);
        LocalStore.set('app_name', res.data.site_name);
      }
    }
    if (siteTitle == null) {
      fetchData();
    } else {
      setTitle(siteTitle);
    }
  }, [true]);

  const loginHandler = (values: FormValue) => {
    dispatch({
      type: 'adminLogin/login',
      payload: values,
    });
  };

  return (
    <HelmetProvider>
      {title ? (
        <Helmet>
          <title>欢迎登录{title}后台管理系统</title>
          <meta name="description" content={title} />
        </Helmet>
      ) : (
        ''
      )}
      <ParticlesBg type="lines" />
      <div className="container">
        <div className="loginContainer">
          <h2>欢迎登录后台</h2>
          <LoginForm loginHandler={loginHandler} />
        </div>
      </div>
    </HelmetProvider>
  );
};

export default connect(({ settings }: ConnectState) => ({ ...settings }))(Login);
