import { LogoutOutlined, EditOutlined } from '@ant-design/icons';
import { Avatar, Menu, Spin } from 'antd';
import React from 'react';
import { history, connect } from 'umi';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import avatar from "@/assets/images/avatar.png"

class AvatarDropdown extends React.Component {
  onMenuClick = (event) => {
    const { key } = event;

    if (key === 'logout') {
      const { dispatch } = this.props;

      if (dispatch) {
        dispatch({
          type: 'login/logout',
        });
      }

      return;
    }

    if (key === 'editPassword') {
      history.push(`/account/editPassword`);
    }

    history.push(`/account/${key}`);
  };

  render() {
    const {
      currentUser = {
        avatar: '',
        name: 'admin123456',
      },
    } = this.props;
    const menuHeaderDropdown = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        {/* <Menu.Item key="editPassword">
          <EditOutlined />
          修改密码
        </Menu.Item> */}
        <Menu.Item key="logout">
          <LogoutOutlined />
          退出登录
        </Menu.Item>
      </Menu>
    );
    return currentUser ? (
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <span className={`${styles.action} ${styles.account}`}>
          <Avatar size="small" className={styles.avatar} src={currentUser.avatar || avatar} alt="avatar" />
          <span className={`${styles.name} anticon`}>{currentUser.name || 'admin'}</span>
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

export default connect(({ user }) => ({
  currentUser: user.currentUser,
}))(AvatarDropdown);
