import React from 'react';
import { connect } from 'dva';

import styles from './common.less';

class BlacklistUploadView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        Tab 3
      </div>
    )
  }
}

function mapStateToProps({ blacklist }) {
  return { blacklist }
}

export default connect(mapStateToProps)(BlacklistUploadView);
