import React, {useEffect, useState} from "react";
import {Form} from "antd";
import FormInput from "../../../../components/formInput/FormInput";
import {INPUT_TYPE} from "../../../../constants/config";
import {IdcardOutlined, MailOutlined, PhoneOutlined} from "@ant-design/icons";
import {getCountries} from "../../../../services/clients";

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
            label:'Ime',
            required:true,
            input_params:{
                disabled:disabled,
                placeholder:"Unesite ime i prezime"
            }
        }} errors={errors} control={control}/>

        <FormInput data={{
            type:INPUT_TYPE.SELECT,
            name:'country_id',
            label:'Drzava',
            required:true,
            input_params:{
                disabled:disabled,
                placeholder:"Izaberite drzavu"
            },
            options:countryOptions
        }} errors={errors} control={control}/>

        <FormInput data={{
            type:INPUT_TYPE.TEXT,
            name:'identification_document_no',
            label:'Broj LK/Pasosa',
            required:true,
            input_params:{
                disabled:disabled,
                placeholder:"Unesite broj lk/pasosa"
            },
            tooltip:"Unesite broj licne karte ili pasosa",
            icon:<IdcardOutlined className="site-form-item-icon" />
        }} errors={errors} control={control}/>

        <FormInput data={{
            type:INPUT_TYPE.TEXT,
            name:'phone_no',
            label:'Telefon',
            required:true,
            input_params:{
                disabled:disabled,
                placeholder:"Unesite broj telefona",
            },
            icon:<PhoneOutlined className="site-form-item-icon" />
        }} errors={errors} control={control}/>

        <FormInput data={{
            type:INPUT_TYPE.TEXT,
            name:'email',
            label:'Email',
            required:true,
            input_params:{
                disabled:disabled,
                placeholder:"Unesite email",
            },
            icon:<MailOutlined className="site-form-item-icon" />
        }} errors={errors} control={control}/>

        {/*<FormInput data={{
            type:INPUT_TYPE.DATE,
            name:'date_of_first_reservation',
            label:'Datum prve rezervacije',
            required:true,
            input_params:{
                style:{width:'100%'},
                disabled:disabled,
                placeholder:"Izaberite datum prve rezervacije",
                allowClear:true
            }
        }} errors={errors} control={control}/>

        <FormInput data={{
            type:INPUT_TYPE.DATE,
            name:'date_of_last_reservation',
            label:'Datum zadnje rezervacije',
            required:true,
            input_params:{
                style:{width:'100%'},
                disabled:disabled,
                placeholder:"Izaberite datum zadnje rezervacije",
                allowClear:true
            }
        }} errors={errors} control={control}/>*/}

        <FormInput data={{
            type:INPUT_TYPE.TEXTAREA,
            name:'remarks',
            label:'Napomena',
            required:false,
            input_params:{
                disabled:disabled,
                placeholder:"Napomena...",
                allowClear:true
            }
        }} errors={errors} control={control}/>

    </Form>
}

export default ClientForm;