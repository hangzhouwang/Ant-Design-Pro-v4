import React, { FC } from 'react';
import { Form, Input, Button, Tooltip } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import './index.less';
import { FormValue } from '@/typings';

interface IProps {
  loginHandler: (values: FormValue) => void;
}

const LoginForm: FC<IProps> = ({ loginHandler }) => {
  const onFinish = (values: FormValue) => {
    loginHandler({ ...values, type: 'account' });
  };

  return (
    <Form name="login" className="login-form" onFinish={onFinish}>
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: '请输入用户名!',
          },
        ]}
      >
        <Input prefix={<UserOutlined />} placeholder="请输入用户名" autoComplete="off" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: '请输入密码!',
          },
        ]}
      >
        <Input prefix={<LockOutlined />} type="password" placeholder="请输入密码" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button" block>
          登录
        </Button>
      </Form.Item>
      <Form.Item>
        <div className="login-forgot">
          <Tooltip title="请联系管理员" color="#f50">
            <span className="login-form-forgot">忘记密码?</span>
          </Tooltip>
        </div>
      </Form.Item>
      <Form.Item>
        <div className="login-other">
          <p>其他登录方式</p>
          <div className="login-any">
            <span>手机</span>
            <span>微信</span>
            <span>钉钉</span>
          </div>
        </div>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
