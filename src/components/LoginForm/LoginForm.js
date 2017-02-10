import React, { PropTypes } from 'react';
import { Form, Input, Button, Icon } from 'antd';

import styles from './LoginForm.less';

const LoginForm = Form.create()(({
  onLogin,
  loading,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  }
}) => {

  function handleSubmit(e) {
    e.preventDefault();
    validateFields((errors) => {
      if (!!errors) {
        return;
      }
      onLogin(getFieldsValue())
    });
  }

  return (
    <div className={styles.normal}>
      <Form vertical={true} onSubmit={handleSubmit}>
        <div className={styles.cardBackground}>
          <label>用户名:</label>
          <Form.Item>
            {
              getFieldDecorator('username',{
                rules: [{required: true, message: '请输入用户名'}]
              })(
                <Input
                  addonBefore={<Icon type="user"/>}
                  placeholder="Username"
                  className={styles.input}
                  onChange={()=>{}}
                  onPressEnter={handleSubmit}
                  disabled={loading}
                />
              )
            }
          </Form.Item>
          <label>密码:</label>
          <Form.Item>
            {
              getFieldDecorator('password', {
                rules: [{required: true, message: '请输入密码'}]
              })(
                <Input
                  addonBefore={<Icon type="lock"/>}
                  placeholder="Password"
                  type="password"
                  className={styles.input}
                  onChange={()=>{}}
                  onPressEnter={handleSubmit}
                  disabled={loading}
                />
              )
            }
          </Form.Item>
          <div>
            <Button
              loading={loading}
              type="primary"
              htmlType="submit"
              className={styles.btnLogin}
            >登录</Button>
          </div>
        </div>
      </Form>
    </div>
  )
});

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default LoginForm;
