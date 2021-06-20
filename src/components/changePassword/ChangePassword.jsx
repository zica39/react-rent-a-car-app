import {useEffect, useState} from "react";
import {Modal, Button,Form} from 'antd';
import {KeyOutlined, SaveOutlined} from "@ant-design/icons";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {INPUT_TYPE, MESSAGE_TYPE} from "../../constants/config";
import FormInput from "../formInput/FormInput";
import {changePassword} from "../../services/auth";
import {showMessage,_} from "../../functions/tools";
import {changePasswordSchema} from "../../constants/schemes";

const ChangePassword = () => {
    const[openModal,setOpenModal] = useState(false);
    const[isLoading,setIsLoading] = useState(false);
    const {formState: { errors }, handleSubmit, control,reset} = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        resolver: yupResolver(changePasswordSchema()),
        defaultValues:{old_password:'', new_password:'', confirm_password: '' }
    });
    const handleCancel = () => {
        if(isLoading === false)
            setOpenModal(false);
    };
    useEffect(()=>{
        if(openModal)reset({});
    },[openModal,reset])

    const onFinish = (data) => {
        setIsLoading(true);
        changePassword(data).then(()=>{
            setIsLoading(false);
            showMessage(_('change_password_success'));
            setOpenModal(false);
        }).catch(err=>{
            //console.log(err?.response);
            showMessage(err?.response?.data?.message,MESSAGE_TYPE.ERROR)
            setIsLoading(false);
        })
    }

    const footer =  [
        <Button disabled={isLoading} className="login-form-button" key='cancel' onClick={handleCancel}>
            {_('cancel')}
        </Button>,

        <Button loading={isLoading} type="primary" key="ok" form="change-password-form" icon={<SaveOutlined />} htmlType="submit" className="login-form-button">
            {_('change')}
        </Button>
    ];

return <>
    <Button onClick={()=>setOpenModal(true)} icon={<KeyOutlined />}>{_('change_password')}</Button>
    <Modal title={_('change_password')} visible={openModal} onCancel={handleCancel} footer={footer}>
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
                label:_('old_password'),
                required:true,
                input_params:{
                    placeholder:_('insert_old_password'),
                }
            }} errors={errors} control={control}/>
            <FormInput data={{
                type:INPUT_TYPE.TEXT,
                name:'new_password',
                label:_('new_password'),
                required:true,
                input_params:{
                    type:'password',
                    placeholder:_('insert_new_password')
                }
            }} errors={errors} control={control}/>
            <FormInput data={{
                type:INPUT_TYPE.TEXT,
                name:'confirm_password',
                label:_('confirm_password'),
                required:true,
                input_params:{
                    type:'password',
                    placeholder:_('confirm_new_password'),
                }
            }} errors={errors} control={control}/>
        </Form>
    </Modal>
</>
}

export default ChangePassword;