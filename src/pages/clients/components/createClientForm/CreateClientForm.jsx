import React from "react";
import {Button, Form, Input, Select, Tooltip} from "antd";
import {Controller} from "react-hook-form";
import {Link} from 'react-router-dom';
import {
    SaveOutlined,
    IdcardOutlined,
    InfoCircleOutlined,
    MailOutlined,
    PhoneOutlined
} from "@ant-design/icons";


const CreateUserForm = ({onFinish,handleSubmit,errors,control}) => {

    return  <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
        layout="horizontal"
        initialValues={{ }}
        onFinish={handleSubmit(onFinish)}
        onValuesChange={()=>{}}
        /* size={componentSize as SizeType}*/
    >
        <Form.Item
            validateStatus={errors && errors['firstname'] ? 'error' : ''}
            help={errors?.firstname?.message}
            label="Ime"
            htmlFor="firstname"
            required
        >
            <Controller
                name="firstname"
                control={control}
                render={({ field }) => (
                    <Input  {...field} placeholder="Unesite ime" id="firstname" />
                )}
            />
        </Form.Item>

        <Form.Item
            validateStatus={errors && errors['lastname'] ? 'error' : ''}
            help={errors?.lastname?.message}
            label="Prezime"
            htmlFor="lastname"
            required
        >
            <Controller
                name="lastname"
                control={control}
                render={({ field }) => (
                    <Input  {...field} placeholder="Unesite prezime" id="lastname" />
                )}
            />
        </Form.Item>

        <Form.Item
            validateStatus={errors && errors['country'] ? 'error' : ''}
            help={errors?.country?.message}
            label="Drzava"
            htmlFor="country"
            required
        >
            <Controller
                name="country"
                control={control}
                render={({ field }) => (
                    <Select
                        {...field}
                        defaultValue=""
                        placeholder="Izaberite drzavu"
                        id="country"
                    >
                        <Select.Option value="">-Izaberte drzavu-</Select.Option>
                        <Select.Option value="1">Crna Gora</Select.Option>
                    </Select>
                )}
            />
        </Form.Item>

        <Form.Item
            validateStatus={errors && errors['id_card'] ? 'error' : ''}
            help={errors?.id_card?.message}
            label="Broj LK/Pasosa"
            htmlFor="id_card"
            required
        >
            <Controller
                name="id_card"
                control={control}
                render={({ field }) => (
                    <Input
                        {...field}
                        prefix={<IdcardOutlined className="site-form-item-icon" />}
                        placeholder="Unesite broj lk/pasosa"
                        id="id_card"
                        suffix={
                            <Tooltip title="Unesite broj licne karte ili pasosa">
                                <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                            </Tooltip>
                        }
                    />
                )}
            />
        </Form.Item>

        <Form.Item
            validateStatus={errors && errors['phone'] ? 'error' : ''}
            help={errors?.phone?.message}
            label="Telefon"
            htmlFor="phone"
            required
        >
            <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                    <Input
                        {...field}
                        prefix={<PhoneOutlined className="site-form-item-icon" />}
                        placeholder="Unesite broj telefona"
                        id="phone"
                        htmlType="phone"
                    />
                )}
            />
        </Form.Item>

        <Form.Item
            validateStatus={errors && errors['email'] ? 'error' : ''}
            help={errors?.email?.message}
            label="Email"
            htmlFor="email"
            required
        >
            <Controller
                name="email"
                control={control}
                render={({ field }) => (
                    <Input
                        {...field}
                        prefix={<MailOutlined className="site-form-item-icon" />}
                        placeholder="Unesite email"
                        id="email"
                        htmlType="email"
                    />
                )}
            />
        </Form.Item>

        <Form.Item
            validateStatus={errors && errors['remark'] ? 'error' : ''}
            help={errors?.remark?.message}
            label="Napomena"
            htmlFor="remark"
        >
            <Controller
                name="remark"
                control={control}
                render={({ field }) => (
                    <Input.TextArea
                        {...field}
                        placeholder="Napomena..."
                        id="remark"
                        htmlType="remark"
                        allowClear
                    />
                )}
            />
        </Form.Item>

        <Button type="primary" icon={<SaveOutlined />} htmlType="submit" className="login-form-button">
            Sacuvaj
        </Button>
        <Button className="login-form-button" style={{marginLeft:15}}>
           <Link to="/users">Odustani</Link>
        </Button>

    </Form>
}

export default CreateUserForm;