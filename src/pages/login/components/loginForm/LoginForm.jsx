import {Button, Checkbox, Form, Input} from "antd";
import {Controller} from "react-hook-form";
import {LockOutlined, MailOutlined} from "@ant-design/icons";
import {_} from "../../../../functions/tools";
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
            label={_('email')}
            htmlFor="email"
            required
        >
            <Controller
                name="email"
                autoComplete="email"
                control={control}
                render={({ field }) => (
                    <Input  {...field} prefix={<MailOutlined className="site-form-item-icon" />} placeholder={_('email')} id="email" />
                )}
            />
        </Form.Item>
        <Form.Item
            validateStatus={errors && errors['password'] ? 'error' : ''}
            help={errors?.password?.message}
            label={_('password')}
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
                        placeholder={_('password')}
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
                        <Checkbox  {...field} >{_('remember_me')}</Checkbox>
                    )}
                />
            </Form.Item>
        </Form.Item>

        <Form.Item>
            <Button loading={loading} type="primary" htmlType="submit" className="login-form-button">
                {_('login')}
            </Button>
        </Form.Item>
    </Form>
}

export default LoginForm;