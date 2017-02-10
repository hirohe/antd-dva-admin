import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Input, Button } from 'antd';

import styles from './BasicFilterDropdown.less';

class BasicFilterDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onFilter = this.onFilter.bind(this);
    this.reset = this.reset.bind(this);
  }

  componentDidMount() {
    ReactDOM.findDOMNode(this.refs.filterInput).focus();
  }

  componentWillReceiveProps() {
    ReactDOM.findDOMNode(this.refs.filterInput).focus();
  }

  onChange(e) {
    this.setState({value: e.target.value})
  }

  onFilter() {
    this.props.onFilter(this.props.field, this.state.value)
  }

  reset() {
    this.setState({value: ''});
    this.props.onFilter(this.props.field, '')
  }

  render() {
    return (
      <div className={styles.normal}>
        <div className={styles.inputBlock}>
          <Input
            ref="filterInput"
            placeholder={this.props.placeholder}
            value={this.state.value}
            onChange={this.onChange}
            onPressEnter={this.onFilter}
          />
        </div>
        <Button type="primary" onClick={this.onFilter}>筛选</Button>
        <Button type="" onClick={this.reset}>重置</Button>
      </div>
    )
  }

}

BasicFilterDropdown.propTypes = {
  placeholder: PropTypes.string,
  field: PropTypes.string.isRequired,
  onFilter: PropTypes.func.isRequired,
};

export default BasicFilterDropdown;
