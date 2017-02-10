import React from 'react';
import { Input, Select } from 'antd';
const Option = Select.Option;
const Search = Input.Search;

import styles from './SearchBar.less';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    console.log(props);

    this.state = {
      field: this.props.searchOptions[0].value,
    };

    this.onChange = this.onChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  onChange(value) {
    this.setState({field: value});
  }

  onSearch(value) {
    this.props.onSearch(this.state.field, value)
  }

  render() {

    const options = this.props.searchOptions.map(option =>
      <Option key={option.value} value={option.value}>{option.text}</Option>
    );

    return (
      <div>
        <Select
          style={{width: this.props.fieldWidth}}
          defaultValue={this.props.searchOptions[0].value}
          onChange={this.onChange}
          className={styles.select}
        >
          {options}
        </Select>
        <span className={styles.span}> : </span>
        <div className={styles.searchBar} style={{width: this.props.barWidth || 200}}>
          <Search
            placeholder="搜索" onSearch={this.onSearch}
          />
        </div>
      </div>
    )
  }
}

export default SearchBar;
