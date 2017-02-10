import React from 'react';
import { connect } from 'dva';

import styles from './Tab2.less';

class SMSUploadView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        Tab 2
      </div>
    )
  }

}

function mapStateToProps({ SMSTask, blacklist }) {
  return { SMSTask, blacklist }
}

export default connect(mapStateToProps)(SMSUploadView);
