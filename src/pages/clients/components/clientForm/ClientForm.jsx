import React from "react";
import {Form} from "antd";
import FormInput from "../../../../components/formInput/FormInput";
import {INPUT_TYPE} from "../../../../constants/config";
import {IdcardOutlined, MailOutlined, PhoneOutlined} from "@ant-design/icons";

const ClientForm = ({onFinish,handleSubmit,errors,control,disabled}) => {

    return  <Form
        id="edit-reservation-form"
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
            name:'firstname',
            label:'Ime',
            required:true,
            input_params:{
                disabled:disabled,
                placeholder:"Unesite ime"
            }
        }} errors={errors} control={control}/>

        <FormInput data={{
            type:INPUT_TYPE.TEXT,
            name:'lastname',
            label:'Prezime',
            required:true,
            input_params:{
                disabled:disabled,
                placeholder:"Unesite prezime"
            }
        }} errors={errors} control={control}/>

        <FormInput data={{
            type:INPUT_TYPE.SELECT,
            name:'country',
            label:'Drzava',
            required:true,
            input_params:{
                disabled:disabled,
                placeholder:"Izaberite drzavu"
            },
            options:[{label:'-Izaberite drzavu-',value:''},{label: 'Crna Gora',value: '1'}]
        }} errors={errors} control={control}/>

        <FormInput data={{
            type:INPUT_TYPE.TEXT,
            name:'id_card',
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
            name:'phone',
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

        <FormInput data={{
            type:INPUT_TYPE.DATE,
            name:'date_first_reservation',
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
            name:'date_last_reservation',
            label:'Datum zadnje rezervacije',
            required:true,
            input_params:{
                style:{width:'100%'},
                disabled:disabled,
                placeholder:"Izaberite datum zadnje rezervacije",
                allowClear:true
            }
        }} errors={errors} control={control}/>

        <FormInput data={{
            type:INPUT_TYPE.TEXTAREA,
            name:'remark',
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