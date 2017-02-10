export default {

  namespace: 'mainTabs',

  state: {
    activeKey: 'home',
    panes: [
      {key: 'home', title: 'Home', content: 'Home'},
    ],
  },

  reducers: {
    switchTab(state, action) {
      return { ...state, activeKey: action.payload.activeKey }
    },
    addTab(state, action) {
      //pre check
      const key = action.payload.pane.key;
      let isNew = true;
      state.panes.forEach((pane) => {
        if (key === pane.key) {
          isNew = false;
          return isNew
        }
      });

      if (isNew) {
        const panes = state.panes;
        panes.push(
          action.payload.pane
        );
        return { ...state, panes: panes, activeKey: key}
      } else {
        return { ...state, activeKey: key }
      }
    },
    removeTab(state, action) {
      let activeKey = state.activeKey;
      const targetKey = action.payload.targetKey;
      let lastIndex;
      state.panes.forEach((pane, i) => {
        if (pane.key === targetKey) {
          //last index of target tab
          lastIndex = i - 1;
        }
      });

      //filter panes that exclude target tab
      //if only target tab left, not filter
      let panes = state.panes.filter(pane => pane.key !== targetKey);
      if (panes.length == 0) {
        panes = state.panes
      }

      //if current active tab is target tab, change activeKey
      if (activeKey === targetKey) {
        if (lastIndex < 0) {
          activeKey = panes[0].key
        } else {
          activeKey = panes[lastIndex].key;
        }
      }
      return { ...state, panes: panes, activeKey: activeKey }
    }
  }

}
