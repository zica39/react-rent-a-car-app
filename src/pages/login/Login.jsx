import React,{useState} from 'react';
import { Row,Col, Typography } from 'antd';
import { UserOutlined} from '@ant-design/icons';
import {saveAuth, error, _, getLang} from "../../functions/tools";
import {useHistory} from 'react-router-dom';
import {ROLES} from "../../constants/config";

import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import LoginForm from "./components/loginForm/LoginForm";
import{login,me} from "../../services/auth";

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
                  });
                  history.push('/');
              }).catch(err=>{
                  error(err.name,err?.response?.statusText);
                  setIsLoading(false);
              })
          }else{
              error('Gresk','Problemi sa internet konekcijom');
          }
        }).catch(err=>{
            console.log(err?.response);
            console.log(err?.name);
            console.log(err?.message)
            console.log(err?.status);//401 ....
            error(err.name,err?.response?.statusText);
            setIsLoading(false);
        })

    };
    //console.log(_('login','en'))
    //console.log(getLang())

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
