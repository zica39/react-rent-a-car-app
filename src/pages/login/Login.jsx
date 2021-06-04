import React from 'react';
import { Form, Input, Button, Checkbox,Row,Col, Typography } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined} from '@ant-design/icons';
import {saveAuth} from "../../functions/tools";
import {useHistory} from 'react-router-dom';
import {ROLES} from "../../constants/config";

import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string()
        .required('required')
        .min(4, 'Password is too short - should be 4 chars minimum.')
        .max(12,'Password is too long - should be 12 chars maximum.')
        .matches(/^[a-zA-Z0-9!#%&]*$/g, 'Password can only contain Latin letters, numbers and chars(!,#,%,&)')
});

const Login = () => {

    const {formState: { errors }, handleSubmit, control} = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        resolver: yupResolver(schema),
        defaultValues:{
            email:'',
            password:'',
            remember: false
        }
    });

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
                    onFinish={handleSubmit(onFinish)}
                >
                    <Form.Item
                        validateStatus={errors && errors['email'] ? 'error' : ''}
                        help={errors?.email?.message}
                    >
                        <Controller
                            name="email"
                            autoComplete="email"
                            control={control}
                            placeholder="email"
                            render={({ field }) => (
                                <Input  {...field} prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
                            )}
                        />
                    </Form.Item>
                    <Form.Item
                        validateStatus={errors && errors['password'] ? 'error' : ''}
                        help={errors?.password?.message}
                    >
                        <Controller
                            name="password"
                            type="password"
                            control={control}
                            autoComplete="new-password"
                            defaultValue=""
                            placeholder="password"
                            render={({ field }) => (
                                <Input
                                {...field}
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                                />
                            )}
                        />

                    </Form.Item>
                    <Form.Item>
                        <Form.Item valuePropName="checked" noStyle>
                            <Controller
                                name="remember"
                                type="checkbox"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <Checkbox  {...field} >Remember me</Checkbox>
                                )}
                            />
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
