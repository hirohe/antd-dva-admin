import React from 'react';
import { Modal, Spin } from 'antd';

const BasicModal = ({
  title,
  loading,
  tip,
  visible,
  width,
  content,
  onCancel,
}) => {
  return (
    <Modal
      title={title}
      visible={visible}
      footer={[]}
      width={width}
      onCancel={onCancel}
    >
      <Spin spinning={loading} tip={tip}>
        <div>
          {content}
        </div>
      </Spin>
    </Modal>
  )
};

export default BasicModal;
