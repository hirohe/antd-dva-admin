import React from 'react';
import {Menu, Icon} from 'antd';
const SubMenu = Menu.SubMenu;
import { connect } from 'dva';

import styles from './SideNav.less';

/*
 * [
 *   {
 *     key
 *     icon
 *     title
 *     children:[
 *       {
 *         key
 *         name
 *       }
 *     ]
 *   }
 * ]
 * */

const SideNav = ({
  subItems,
  selectedKeys,
  defaultOpenKeys,
  collapsed,
  onClick,
}) => {

  let menu;
  if (subItems) {
    menu = subItems.map((item) => {
      if (item.children) {
        return (
          <SubMenu
            key={item.key}
            title={<span><Icon type={item.icon} />{collapsed?'':item.title}</span>}
          >
            {item.children.map((node) => {
              return (
                <Menu.Item
                  key={node.key}
                >
                  <span>{node.icon?<Icon type={node.icon}/>:null}{node.name}</span>
                </Menu.Item>
              )
            })}
          </SubMenu>
        )
      } else {
        return (
          <Menu.Item key={item.key}>
            <Icon type={item.icon}/>
            <span>{collapsed?'':item.title}</span>
          </Menu.Item>
        )
      }
    })
  }

  function handleClick(target) {
    onClick(target.key)
  }

  return (
    <Menu
      onClick={handleClick}
      selectedKeys={selectedKeys}
      defaultOpenKeys={defaultOpenKeys}
      mode={collapsed?'vertical':'inline'}
    >
      {menu}
    </Menu>
  )
};

export default SideNav;
