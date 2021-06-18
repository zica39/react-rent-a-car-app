import React,{useState} from 'react';
import { Row,Col, Typography } from 'antd';
import { UserOutlined} from '@ant-design/icons';
import {saveAuth, error, _} from "../../functions/tools";
import {useHistory} from 'react-router-dom';
import {ROLES} from "../../constants/config";

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {loginSchema} from "../../constants/schemes";

import LoginForm from "./components/loginForm/LoginForm";
import {login,me} from "../../services/auth";



const Login = () => {

    const {formState: { errors }, handleSubmit, control} = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        resolver: yupResolver(loginSchema()),
        defaultValues:{
            email:'',
            password:'',
            remember: false
        }
    });

    const [isLoading,setIsLoading] = useState(false);
    const history = useHistory();

    const onFinish = values => {
        console.log(values);
        setIsLoading(true);
        login({
            email:values.email,
            password:values.password
        }).then(res=>{
          let token =  res?.data?.access_token;
          if(token){
              me(token).then(res=>{
                  saveAuth({
                      name:res?.data?.name,
                      role:res?.data?.role_id === 1? ROLES.EMPLOYEE:ROLES.CLIENT,
                      token:token
                  },values.remember);
                  history.push('/');
              }).catch(err=>{
                  error(err?.response?.data?.message);
                  setIsLoading(false);
              })
          }else{
              error(_('error'),'');
          }
        }).catch(err=>{
            error(_(err.name.toLowerCase()),_(err?.response?.status+'_login'));
            setIsLoading(false);
        })
    };

    return (
        <Row type="flex" justify="center" align="center">
            <Col span={8}  style={{padding:30,marginTop:'10%',boxShadow:'1px 1px 3px black'}}>
                <Typography.Title level={2}><UserOutlined/>{_('login')}</Typography.Title>
                <LoginForm loading={isLoading} onFinish={onFinish} errors={errors} control={control} handleSubmit={handleSubmit} />
            </Col>
        </Row>
    );
};

export  default Login;
