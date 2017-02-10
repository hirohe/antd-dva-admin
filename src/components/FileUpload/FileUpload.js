import React, { PropTypes } from 'react';
import { Upload, message, Button } from 'antd'

class FileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };

    this.beforeUpload = this.beforeUpload.bind(this);
    this.onChange = this.onChange.bind(this)
  }

  beforeUpload(file) {
    if (this.props.beforeUpload) {
      if (!this.props.beforeUpload(file)) {
        return false
      }
    } else {
      return true
    }
    this.setState({loading: true});
  }

  onChange(info) {
    if (info.file.status === 'done') {
      this.setState({loading: false});
      this.props.onUploadSuccess(info.file.response, info.file)
    } else if (info.status === 'error') {
      this.setState({loading: false});
      this.props.onUploadError(info.file.response, info.file)
    }
  }

  render() {
    const uploadProps = {
      name: this.props.name,
      accept: this.props.accept,
      action: this.props.action,
      data: this.props.data || {},
      showUploadList: this.props.showUploadList || false,
      disabled: this.props.disabled || false,
      beforeUpload: this.beforeUpload,
      onChange: this.onChange,
    };

    return(
      <Upload {...uploadProps}>
        <Button
          type="primary"
          icon="upload"
          disabled={this.props.disabled || false}
          loading={this.state.loading}>
          {this.props.title}
        </Button>
      </Upload>
    )
  }

}

/*const FileUpload = ({
  name,
  action,
  loading,
  beforeUpload,
  onUploadSuccess,
  onUploadError
}) => {

  const uploadProps = {
    name: name,
    action: action,
    /!*headers: {

    }*!/
    showUploadList: false,
    beforeUpload: beforeUpload,
    onChange(info) {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} 上传成功!`);
        onUploadSuccess()
      } else if (info.status === 'error') {
        message.error(`${info.file.name} 上传失败!`);
        onUploadError()
      }
    },
  };

  return (
    <div>
      <Upload {...uploadProps}>
        <Spin size="small" spinning={loading}>
          <Button type="primary">
            <span><Icon type="upload" /> 点击上传文件</span>
          </Button>
        </Spin>
      </Upload>
    </div>
  )
};*/

FileUpload.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string.isRequired,
  accept: PropTypes.string,
  action: PropTypes.string.isRequired,
  data: PropTypes.object,
  beforeUpload: PropTypes.func,
  onUploadError: PropTypes.func,
  onUploadSuccess: PropTypes.func,
};

export default FileUpload;
