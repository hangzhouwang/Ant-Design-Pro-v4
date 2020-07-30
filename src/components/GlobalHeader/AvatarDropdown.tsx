import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { Avatar, Menu, Spin, Modal } from 'antd';
import React from 'react';
import { history, ConnectProps, connect } from 'umi';
import { ConnectState } from '@/models/connect';
import { CurrentUser } from '@/models/user';

import styles from './index.less';
import { getPageQuery } from '@/utils/utils';
import LocalStore from '@/utils/LocalStore';
import { stringify } from 'qs';
import HeaderDropdown from '../HeaderDropdown';

export interface GlobalHeaderRightProps extends Partial<ConnectProps> {
  currentUser?: CurrentUser;
  menu?: boolean;
}

class AvatarDropdown extends React.Component<GlobalHeaderRightProps> {
  onMenuClick = (event: {
    key: React.Key;
    keyPath: React.Key[];
    item: React.ReactInstance;
    domEvent: React.MouseEvent<HTMLElement>;
  }) => {
    const { key } = event;

    if (key === 'logout') {
      Modal.confirm({
        title: '请确认',
        icon: <ExclamationCircleOutlined />,
        content: '您确认要退出系统吗?',
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          this.logOut();
        },
      });
      return;
    }

    history.push(`/account/${key}`);
  };

  logOut = () => {
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
  };

  render(): React.ReactNode {
    const {
      currentUser = {
        avatar: '',
        name: '',
      },
      menu,
    } = this.props;
    const menuHeaderDropdown = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        {menu && (
          <Menu.Item key="center">
            <UserOutlined />
            个人中心
          </Menu.Item>
        )}
        {menu && (
          <Menu.Item key="settings">
            <SettingOutlined />
            个人设置
          </Menu.Item>
        )}
        {menu && <Menu.Divider />}

        <Menu.Item key="logout">
          <LogoutOutlined />
          退出登录
        </Menu.Item>
      </Menu>
    );
    return currentUser && currentUser.name ? (
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <span className={`${styles.action} ${styles.account}`}>
          <Avatar size="small" className={styles.avatar} src={currentUser.avatar} alt="avatar" />
          <span className={`${styles.name} anticon`}>{currentUser.name}</span>
        </span>
      </HeaderDropdown>
    ) : (
      <span className={`${styles.action} ${styles.account}`}>
        <Spin
          size="small"
          style={{
            marginLeft: 8,
            marginRight: 8,
          }}
        />
      </span>
    );
  }
}

export default connect(({ user }: ConnectState) => ({
  currentUser: user.currentUser,
}))(AvatarDropdown);
