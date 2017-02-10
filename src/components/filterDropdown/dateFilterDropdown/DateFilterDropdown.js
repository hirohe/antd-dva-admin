import React, { PropTypes } from 'react';
import { DatePicker, Button } from 'antd';

import styles from './DateFilterDropdown.less';

class DateFilterDropdown extends React.Component {
  constructor(props) {
    super(props);
  }

  onChange(date, dateString) {
    //this.setState({value: dateString});
    this.props.onFilter(this.props.field, dateString)
  }

  render() {
    return (
      <div className={styles.normal}>
        <DatePicker
          format={this.props.format}
          onChange={this.onChange.bind(this)}
        />
      </div>
    )
  }
}

DateFilterDropdown.propTypes = {
  field: PropTypes.string.isRequired,
  onFilter: PropTypes.func.isRequired,
  format: PropTypes.string.isRequired,
};

export default DateFilterDropdown;
