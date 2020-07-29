import { Helmet, HelmetProvider } from 'react-helmet-async';
import { connect } from 'umi';
import React from 'react';
import { ConnectState } from '@/models/connect';
import ParticlesBg from 'particles-bg';

import './index.less';
import LoginForm from './components/LoginForm';

const Login: React.FC = () => {
  const title = 'ok';

  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>
      <ParticlesBg type="lines" />
      <div className="container">
        <div className="loginContainer">
          <h2>欢迎登录后台</h2>
          <LoginForm />
        </div>
      </div>
    </HelmetProvider>
  );
};

export default connect(({ settings }: ConnectState) => ({ ...settings }))(Login);
