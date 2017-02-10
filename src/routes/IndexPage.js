import React from 'react';
import { Layout, Menu, Icon, Card } from 'antd';
import { connect } from 'dva';
import Cookies from 'cookies-js';

import Header from '../components/Header/Header';
import SideNav from '../components/SideNav/SideNav';
import MainTabs from '../components/MainTabs/MainTabs';
import BasicModal from '../components/BasicModal/BasicModal';

import styles from './IndexPage.less';

const NewLayout = ({
  dispatch,
  mainTabs,
  basicModal,
  sideNav: {
    collapsed,
    subItems,
    selectedKeys,
    defaultOpenKeys,
  },
}) => {

  const realName = decodeURI(Cookies.get('real_name'));

  const SiderProps = {
    className: styles.sider,
    collapsible: true,
    collapsed: collapsed,
    collapsedWidth: 70,
    onCollapse(collapsed) {
      console.log('collapsed', collapsed);
      dispatch({
        type: 'sideNav/setCollapsed',
        payload: {
          collapsed: collapsed
        }
      })
    }
  };

  const SideNavProps = {
    collapsed: collapsed,
    subItems: subItems,
    selectedKeys: selectedKeys,
    defaultOpenKeys: defaultOpenKeys,
    onClick(key) {
      //dispatch(routerRedux.push('/'+key));
      dispatch({
        type: 'sideNav/onClick',
        payload: {
          selectedKeys: [key]
        }
      });
    }
  };

  const MainTabsProps = {
    activeKey: mainTabs.activeKey,
    panes: mainTabs.panes
  };

  const BasicModalProps = {
    title: basicModal.title,
    loading: basicModal.loading,
    tip: basicModal.tip,
    visible: basicModal.visible,
    width: basicModal.width,
    content: basicModal.content,
    onCancel() {
      dispatch({
        type: 'basicModal/hideModal'
      })
    },
  };

  return (
    <Layout style={{height: '100%'}}>
      <Header title="title" username={realName}/>
      <Layout style={{height: window.innerHeight - 46}}>
        <Layout.Sider {...SiderProps}>
          <SideNav {...SideNavProps}/>
        </Layout.Sider>
        <Layout.Content style={{padding: '10px'}}>
          <Card style={{height: '100%'}}>
            <MainTabs {...MainTabsProps}/>
          </Card>
        </Layout.Content>
      </Layout>
      <BasicModal {...BasicModalProps}/>
    </Layout>
  )
};

function mapStateToProps({ sideNav, mainTabs, basicModal }) {
  return { sideNav, mainTabs, basicModal }
}

export default connect(mapStateToProps)(NewLayout);
