import {Button, Checkbox, Form, Input} from "antd";
import {Controller} from "react-hook-form";
import {LockOutlined, MailOutlined} from "@ant-design/icons";
import React from "react";

const LoginForm = ({onFinish,handleSubmit,errors,control,loading}) => {

    return <Form
        name="normal_login"
        className="login-form"
        layout="vertical"
        initialValues={{
            remember: true,
        }}
        onFinish={handleSubmit(onFinish)}
    >
        <Form.Item
            validateStatus={errors && errors['email'] ? 'error' : ''}
            help={errors?.email?.message}
            label="Email"
            htmlFor="email"
            required
        >
            <Controller
                name="email"
                autoComplete="email"
                control={control}
                render={({ field }) => (
                    <Input  {...field} prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" id="email" />
                )}
            />
        </Form.Item>
        <Form.Item
            validateStatus={errors && errors['password'] ? 'error' : ''}
            help={errors?.password?.message}
            label="Password"
            htmlFor="password"
            required
            tooltip=""
        >
            <Controller
                name="password"
                control={control}
                autoComplete="new-password"
                defaultValue=""
                render={({ field }) => (
                    <Input.Password
                        {...field}
                        id="password"
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
            <Button loading={loading} type="primary" htmlType="submit" className="login-form-button">
                Log in
            </Button>
            {/*Or <a href="">register now!</a>*/}
        </Form.Item>
    </Form>
}

export default LoginForm;