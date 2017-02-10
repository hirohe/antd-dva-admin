import React, { PropTypes } from 'react';
import { Radio } from 'antd'

import styles from './RadioFilterDropdown.less';

/*
* filters: [
*   {text, value}
* ]
* */
class RadioFilterDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    }
  }

  render() {

    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };

    function onChange(e) {
      this.setState({value: e.target.value});
      this.props.onFilter(this.props.field, e.target.value)
    }
    onChange = onChange.bind(this);

    const radioGroup = (
      <Radio.Group onChange={onChange} value={this.state.value}>
        <Radio value=''>全部</Radio>
        {
          this.props.filters.map(filter => {
            return <Radio style={radioStyle} value={filter.value} key={filter.value}>{filter.text}</Radio>
          })
        }
      </Radio.Group>
    );

    return (
      <div className={styles.normal}>
        {radioGroup}
      </div>
    )
  }

}

RadioFilterDropdown.propTypes = {
  field: PropTypes.string.isRequired,
  filters: PropTypes.array.isRequired,
  onFilter: PropTypes.func.isRequired,
};

export default RadioFilterDropdown;
