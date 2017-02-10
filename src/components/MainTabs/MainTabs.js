import React from 'react';
import { connect } from 'dva';
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

import styles from './MainTabs.less';

const MainTabs = ({
  dispatch,
  activeKey,
  panes,
}) => {

  function handleChange(activeKey) {
    dispatch({
      type: 'mainTabs/switchTab',
      payload: {activeKey: activeKey}
    })
  }

  function removeTab(targetKey) {
    dispatch({
      type: 'mainTabs/removeTab',
      payload: {targetKey: targetKey}
    })
  }

  return (
    <div className={styles.normal}>
      <Tabs
        //renderTabBar={} renderTabContent={}
        hideAdd
        type="editable-card"
        activeKey={activeKey}
        onEdit={removeTab}
        onChange={handleChange}
        animated={false}
      >
        {
          panes.map(pane =>
            <TabPane
              tab={pane.title}
              key={pane.key}
            >
              {pane.content}
            </TabPane>
          )
        }
      </Tabs>
    </div>
  )
};

function mapStateToProps({mainTabs}) {
  return {mainTabs}
}

class MainTabsx extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeKey: props.activeKey,
      panes: props.panes,
    };

    this.handleChange = this.handleChange.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.remove = this.remove.bind(this)
  }

  handleChange(activeKey) {
    this.setState({activeKey: activeKey});
  }

  onEdit(targetKey, action) {
    this[action](targetKey)
  }

  /*addTab(newTab) {
   const panes = this.state.panes;
   panes.push(newTab);
   this.setState({panes: panes})
   }*/

  remove(targetKey) {
    let lastIndex = 0;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1
      }
    });

    let panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (panes.length == 0) {
      panes = this.state.panes
    }

    if (this.state.activeKey === targetKey) {
      if (lastIndex < 0) {
        this.setState({activeKey: panes[0].key});
      } else {
        this.setState({activeKey: panes[lastIndex].key});
      }
    }

    this.setState({ panes: panes });
  }

  render() {
    return (
      <Tabs
        hideAdd
        tabPosition="bottom"
        type="editable-card"
        activeKey={this.state.activeKey}
        onEdit={this.onEdit}
        onChange={this.handleChange}
        animated={false}
      >
        {this.state.panes.map(pane =>
          <TabPane
            animated={false}
            tab={pane.title}
            key={pane.key}
          >
            {pane.content}
          </TabPane>
        )}
      </Tabs>
    )
  }

}

export default connect(mapStateToProps)(MainTabs);
