import React from 'react';
import { Card, Row, Col } from 'antd';
import { connect } from 'dva';
import LoginForm from '../components/LoginForm/LoginForm';


import styles from './LoginPage.less';

function LoginPage({
  dispatch,
  login: {
    loading
  }
}) {

  const LoginFormProps = {
    loading: loading,
    onLogin(user) {
      dispatch({
        type: 'login/login',
        payload: {
          user: user,
        }
      })
    }
  };

  return (
    <div className={styles.background}>
      <div className={styles.normal}>
        <Card title="登录 | ...管理系统">
          <Row>
            <Col span={14}>
              <div className={styles.logo}></div>
            </Col>
            <Col span={10}>
              <LoginForm {...LoginFormProps}/>
            </Col>
          </Row>
        </Card>
      </div>
    </div>
  )
}

function mapStateToProps({ login }) {
  return { login }
}

export default connect(mapStateToProps)(LoginPage);
