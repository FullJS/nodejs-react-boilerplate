import React, { Component } from 'react';
import { Form, Input, Tabs, Button, Icon, Checkbox, Row, Col, Alert } from 'antd';

import { Link } from 'react-router-dom';

import styles from './index.less';

const FormItem = Form.Item;
const { TabPane } = Tabs;

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = { email: '', senha: '' };

    this.state = {
      count: 0,
      type: 'account',
      status: '',
      submitting: false
    }
  }


  render() {
    return (
      <div className={styles.main}>
        <Form onSubmit={this.handleSubmit}>
          <Tabs animated={false} className={styles.tabs} activeKey={this.state.type} onChange={this.onSwitch}>
            <TabPane tab="账户密码登录" key="account">
              {
                this.state.status === 'error' &&
                this.state.type === 'account' &&
                this.state.submitting === false &&
                this.renderMessage('账户或密码错误')
              }
              <FormItem>
              </FormItem>
              <FormItem>

              </FormItem>
            </TabPane>
            <TabPane tab="手机号登录" key="mobile">
              {
                this.state.status === 'error' &&
                this.state.type === 'mobile' &&
                this.state.submitting === false &&
                this.renderMessage('验证码错误')
              }
              <FormItem>

              </FormItem>
              <FormItem>
                <Row gutter={8}>
                  <Col span={16}>
                  </Col>
                  <Col span={8}>
                    <Button
                      disabled={this.state.count}
                      className={styles.getCaptcha}
                      size="large"
                      onClick={this.onGetCaptcha}
                    >
                      {this.state.count ? `${this.state.count} s` : '获取验证码'}
                    </Button>
                  </Col>
                </Row>
              </FormItem>
            </TabPane>
          </Tabs>
          <FormItem className={styles.additional}>
            <a className={styles.forgot} href="">忘记密码</a>
            <Button size="large" loading={this.state.submitting} className={styles.submit} type="primary" htmlType="submit">
              登录
          </Button>
          </FormItem>
        </Form>
        <div className={styles.other}>
          其他登录方式
        {/* 需要加到 Icon 中 */}
          <span className={styles.iconAlipay} />
          <span className={styles.iconTaobao} />
          <span className={styles.iconWeibo} />
          <Link className={styles.register} to="/user/register">注册账户</Link>
        </div>
      </div>
    );
  }
}


export default Login;