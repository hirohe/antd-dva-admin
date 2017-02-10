import React from 'react';

function getView(viewName) {
  return new Promise(resolve => {
    let view;
    switch (viewName) {
      case 'menu1/Tab1': {
        require.ensure([], require => {
          view = require('../views/menu1/Tab1');
          resolve(view)
        }, 'tab1');
        break
      }
      case 'menu1/Tab2': {
        require.ensure([], require => {
          view = require('../views/menu1/Tab2');
          resolve(view)
        }, 'tab2');
        break
      }
      case 'menu2/Tab3': {
        require.ensure([], require => {
          view = require('../views/menu2/Tab3');
          resolve(view)
        }, 'tab3');
        break
      }
      case 'menu2/Tab4': {
        require.ensure([], require => {
          view = require('../views/menu2/Tab4');
          resolve(view)
        }, 'tab4');
        break
      }
    }
  }, viewName)
}

export default {

  namespace: 'sideNav',

  state: {
    subItems: [
      {
        key: 'menu1',
        icon: 'mail',
        title: 'menu 1',
        children: [
          {
            key: 'tab1',
            name: 'Tab 1',
            icon: 'edit',
            viewName: 'menu1/Tab1'
          },
          {
            key: 'tab2',
            name: 'Tab 2',
            icon: 'upload',
            viewName: 'menu1/Tab2'
          }
        ]
      },
      {
        key: 'menu2',
        icon: 'close-circle',
        title: 'menu 2',
        children: [
          {
            key: 'tab3',
            name: 'Tab 3',
            icon: 'upload',
            viewName: 'menu2/Tab3'
          },
          {
            key: 'tab4',
            name: 'Tab 4',
            viewName: 'menu2/Tab4'
          }
        ]
      }
    ],
    selectedKeys: [],
    selectedTitle: '',
    defaultOpenKeys: ['menu1', 'tab1'],
    collapsed: false,
    views: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      /*history.listen(location => {
        if (location.pathname === '/') {
          //get subItems
          dispatch({type: 'getSubItems'})
        }
      })*/
    }
  },

  effects: {
    *onClick({payload}, {put, call, select}) {
      const key = payload.selectedKeys[0];
      //set key
      yield put({
        type: 'setSelectedKeys',
        payload: {
          selectedKeys: [key]
        }
      });
      //check if view exist
      const views = yield select(state => state.sideNav.views);
      if (!views[key]) {
        //require ensure to get view
        //get viewName by key
        const subItems = yield select(state => state.sideNav.subItems);
        let viewName;
        let viewTitle;
        subItems.forEach(item => {
          //item.children.filter(node => node.key === key)
          let flag = true;
          item.children.forEach(node => {
            if (node.key === key) {
              viewName = node.viewName;
              viewTitle = node.name;
              flag = false;
              return false
            }
          });
          return flag;
        });
        const view = yield call(getView, viewName);
        //add view to mainTabs
        yield put({
          type: 'mainTabs/addTab',
          payload: {
            pane: {key: key, title: viewTitle, content: React.createElement(view)}
          }
        });

      }
    }
  },

  reducers: {
    setSubItems(state, action) {
      return { ...state, subItems: action.payload.subItems }
    },
    setSelectedKeys(state, action) {
      return { ...state, selectedKeys: action.payload.selectedKeys }
    },
    setDefaultOpenKeys(state, action) {
      return { ...state, defaultOpenKeys: action.payload.defaultOpenKeys }
    },
    setCollapsed(state, action) {
      return { ...state, collapsed: action.payload.collapsed }
    },
    addView(state, action) {
      return { ...state, views: state.views.push(action.payload.view) }
    }
  }

}
