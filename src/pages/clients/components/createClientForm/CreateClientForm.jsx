import React from "react";
import {Button, Form} from "antd";
import {Link} from 'react-router-dom';
import {INPUT_TYPE} from "../../../../constants/config";
import {
    SaveOutlined,
    IdcardOutlined,
    MailOutlined,
    PhoneOutlined
} from "@ant-design/icons";
import FormInput from "../../../../components/formInput/FormInput";

const CreateClientForm = ({onFinish,handleSubmit,errors,control}) => {

    return  <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
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
                placeholder:"Unesite ime"
            }
        }} errors={errors} control={control}/>

        <FormInput data={{
            type:INPUT_TYPE.TEXT,
            name:'lastname',
            label:'Prezime',
            required:true,
            input_params:{
                placeholder:"Unesite prezime"
            }
        }} errors={errors} control={control}/>

        <FormInput data={{
            type:INPUT_TYPE.SELECT,
            name:'country',
            label:'Drzava',
            required:true,
            input_params:{
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
                placeholder:"Unesite email",
            },
            icon:<MailOutlined className="site-form-item-icon" />
        }} errors={errors} control={control}/>

        <FormInput data={{
            type:INPUT_TYPE.TEXTAREA,
            name:'remark',
            label:'Napomena',
            required:false,
            input_params:{
                placeholder:"Napomena...",
                allowClear:true
            }
        }} errors={errors} control={control}/>

        <Button type="primary" icon={<SaveOutlined />} htmlType="submit" className="login-form-button">
            Sacuvaj
        </Button>
        <Button className="login-form-button" style={{marginLeft:15}}>
           <Link to="/clients">Odustani</Link>
        </Button>

    </Form>
}

export default CreateClientForm;