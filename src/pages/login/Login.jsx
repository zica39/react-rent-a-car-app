import React from 'react';
import { Form, Input, Button, Checkbox,Row,Col, Typography } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined} from '@ant-design/icons';
import {saveAuth} from "../../functions/tools";
import {useHistory} from 'react-router-dom';
import {ROLES} from "../../constants/config";

const Login = () => {

    const history = useHistory();
    const onFinish = values => {
        console.log('Received values of form: ', values);
        saveAuth({
            name:values.email,
            token:'BJDFJDKFJGKJDSHFDKFD',
            role: values?.remember?ROLES.EMPLOYEE:ROLES.CLIENT
        });
        history.push('/');

    };

    return (
        <Row type="flex" justify="center" align="center">
            <Col span={8}  style={{padding:30,marginTop:'10%',boxShadow:'1px 1px 3px black'}}>
                <Typography.Title level={2}><UserOutlined/>Login</Typography.Title>
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
        >
            <Form.Item
                name="email"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Username!',
                    },
                ]}
            >
                <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Password!',
                    },
                ]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>
            <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                {/*<a className="login-form-forgot" href="">
                    Forgot password
                </a>*/}
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                </Button>
                  {/*Or <a href="">register now!</a>*/}
            </Form.Item>
        </Form>
            </Col>
        </Row>
    );
};

export  default Login;
