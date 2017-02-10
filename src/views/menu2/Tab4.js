import React from 'react';
import { connect } from 'dva';

import styles from './common.less';

class BlacklistHistoryView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        Tab 4
      </div>
    )
  }
}

function mapStateToProps() {

}

export default connect()(BlacklistHistoryView);
