import React, {useEffect, useState} from "react";
import {Form} from "antd";
import FormInput from "../../../../components/formInput/FormInput";
import {INPUT_TYPE} from "../../../../constants/config";
import {IdcardOutlined, MailOutlined, PhoneOutlined} from "@ant-design/icons";
import {getCountries} from "../../../../services/clients";
import {_} from "../../../../functions/tools";

const ClientForm = ({onFinish,handleSubmit,errors,control,disabled}) => {

    const [countryOptions,setCountryOptions] = useState([]);
    useEffect(()=>{
        getCountries().then(res=>{
            let data = res?.data;
            setCountryOptions(data.map(e=>Object({value:e.id,label:e.name})))
        })
    },[]);

    return  <Form
        id="client-form"
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 17 }}
        layout="horizontal"
        initialValues={{ }}
        onFinish={handleSubmit(onFinish)}
        onValuesChange={()=>{}}
        size="default"
    >
        <FormInput data={{
            type:INPUT_TYPE.TEXT,
            name:'name',
            label:_('client_name'),
            required:true,
            input_params:{
                disabled:disabled,
                placeholder:_('client_name_placeholder')
            }
        }} errors={errors} control={control}/>

        <FormInput data={{
            type:INPUT_TYPE.SELECT,
            name:'country_id',
            label:_('client_country'),
            required:true,
            input_params:{
                disabled:disabled,
                placeholder:_('client_country_placeholder')
            },
            options:countryOptions
        }} errors={errors} control={control}/>

        <FormInput data={{
            type:INPUT_TYPE.TEXT,
            name:'identification_document_no',
            label:_('identification_document_no'),
            required:true,
            input_params:{
                disabled:disabled,
                placeholder:_('identification_document_placeholder')
            },
            tooltip:_('passport_len'),
            icon:<IdcardOutlined className="site-form-item-icon" />
        }} errors={errors} control={control}/>

        <FormInput data={{
            type:INPUT_TYPE.TEXT,
            name:'phone_no',
            label:_('phone_no'),
            required:true,
            input_params:{
                disabled:disabled,
                placeholder:_('phone_placeholder'),
            },
            icon:<PhoneOutlined className="site-form-item-icon" />
        }} errors={errors} control={control}/>

        <FormInput data={{
            type:INPUT_TYPE.TEXT,
            name:'email',
            label:_('email'),
            required:true,
            input_params:{
                disabled:disabled,
                placeholder:_('email_placeholder')
            },
            icon:<MailOutlined className="site-form-item-icon" />
        }} errors={errors} control={control}/>

        <FormInput data={{
            type:INPUT_TYPE.TEXTAREA,
            name:'remarks',
            label:_('remarks'),
            required:false,
            input_params:{
                disabled:disabled,
                placeholder:_('remarks_placeholder'),
                allowClear:true
            }
        }} errors={errors} control={control}/>

    </Form>
}

export default ClientForm;