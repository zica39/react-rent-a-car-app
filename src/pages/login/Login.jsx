import React from 'react';
import { Row,Col, Typography } from 'antd';
import { UserOutlined} from '@ant-design/icons';
import {saveAuth} from "../../functions/tools";
import {useHistory} from 'react-router-dom';
import {ROLES} from "../../constants/config";

import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import LoginForm from "./components/loginForm/LoginForm";

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
                <LoginForm onFinish={onFinish} errors={errors} control={control} handleSubmit={handleSubmit} />
            </Col>
        </Row>
    );
};

export  default Login;
