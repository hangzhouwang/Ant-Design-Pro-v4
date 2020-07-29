import React from 'react';
import { Form, Input, Button, Checkbox, Tooltip } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import './index.less';

const LoginForm = () => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: '请输入用户名!',
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="请输入用户名"
          autoComplete="off"
        />
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
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="请输入密码"
        />
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
