import {useEffect, useState} from "react";
import {Modal, Button,Form, message} from 'antd';
import {KeyOutlined, SaveOutlined} from "@ant-design/icons";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {INPUT_TYPE, MESSAGE_TYPE} from "../../constants/config";
import FormInput from "../formInput/FormInput";
import {changePassword} from "../../services/auth";
import {showMessage} from "../../functions/tools";

const password_roules = yup.string()
    .required('required')
    .min(4, 'Password is too short - should be 4 chars minimum.')
    .max(12,'Password is too long - should be 12 chars maximum.')
    .matches(/^[a-zA-Z0-9!#%&]*$/g, 'Password can only contain Latin letters, numbers and chars(!,#,%,&)')

const schema = yup.object().shape({
    old_password: password_roules,
    new_password:password_roules,
    confirm_password: yup.string()
        .oneOf([yup.ref('new_password'), null], 'Passwords must match')

});

const ChangePassword = () => {
    const[openModal,setOpenModal] = useState(false);
    const[isLoading,setIsLoading] = useState(false);
    const {formState: { errors }, handleSubmit, control,reset} = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        resolver: yupResolver(schema),
        defaultValues:{
            email:'',
            password:'',
            remember: false
        }
    });
    const handleCancel = () => {
        if(isLoading === false)
            setOpenModal(false);
    };
    useEffect(()=>{
        if(openModal)reset({});
    },[openModal])

    const onFinish = (data) => {
        setIsLoading(true);
        changePassword(data).then(res=>{
            setIsLoading(false);
            showMessage('Lozinka uspjesno izmjenjena');
            setOpenModal(false);
        }).catch(err=>{
            //console.log(err?.response);
            showMessage(err?.response?.data?.message,MESSAGE_TYPE.ERROR)
            setIsLoading(false);
        })
    }

    const footer =  [
        <Button disabled={isLoading} className="login-form-button" key='cancel' onClick={handleCancel}>
            Odustani
        </Button>,

        <Button loading={isLoading} type="primary" key="ok" form="change-password-form" icon={<SaveOutlined />} htmlType="submit" className="login-form-button">
            Izmjeni
        </Button>
    ];

return <>
    <Button onClick={()=>setOpenModal(true)} icon={<KeyOutlined />}>Izmjeni lozinku</Button>
    <Modal title='Izmjeni lozinku' visible={openModal} onCancel={handleCancel} footer={footer}>
        <Form
            id="change-password-form"
            labelCol={{ span: 7 }}
            wrapperCol={{ span: 17 }}
            layout="horizontal"
            onFinish={handleSubmit(onFinish)}
        >
            <FormInput data={{
                type:INPUT_TYPE.PASSWORD,
                name:'old_password',
                label:'Stara lozinka',
                required:true,
                input_params:{
                    placeholder:"Unesite staru lozinku"
                }
            }} errors={errors} control={control}/>
            <FormInput data={{
                type:INPUT_TYPE.TEXT,
                name:'new_password',
                label:'Nova lozinka',
                required:true,
                input_params:{
                    type:'password',
                    placeholder:"Unesite nova lozinku"
                }
            }} errors={errors} control={control}/>
            <FormInput data={{
                type:INPUT_TYPE.TEXT,
                name:'confirm_password',
                label:'Potvdite lozinku',
                required:true,
                input_params:{
                    type:'password',
                    placeholder:"Potvrdite novu lozinku"
                }
            }} errors={errors} control={control}/>
        </Form>
    </Modal>
</>
}

export default ChangePassword;