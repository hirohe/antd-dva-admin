import React from 'react';
import { connect } from 'dva';
import { Menu, Icon } from 'antd';

import styles from './Header.less';

const Header = ({
  dispatch,
  title,
  username
}) => {

  function onClick(e) {
    switch (e.key) {
      case 'logout': {
        //to logout
        dispatch({type: 'login/logout'})
      }
    }
  }


  return (
    <div className={styles.header}>
      <Menu
        selectedKeys={['logo']}
        mode="horizontal"
        theme="dark"
        onClick={onClick}
      >
        <Menu.Item className={styles.logo}>
          <h2 style={{color: '#fff'}}>{title}</h2>
        </Menu.Item>
        <Menu.SubMenu title={<span><Icon type="user"/>{username}</span>} className={styles.side}>
          <Menu.Item key="logout">
            <span className={styles.logout}><Icon type="poweroff"/>注销</span>
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </div>
  )
};

export default connect()(Header);
