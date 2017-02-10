import React from 'react';
import { connect } from 'dva';
import styles from './Tab1.less';

class SMSWorkflowView extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        Tab 1
      </div>
    )
  }
}

function  mapStateToProps({ login }) {
  return { login }
}

export default connect(mapStateToProps)(SMSWorkflowView);
