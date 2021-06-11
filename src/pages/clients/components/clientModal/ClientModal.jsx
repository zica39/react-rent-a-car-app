import React, {useEffect, useState} from 'react';
import {Modal, Button, message} from 'antd';
import {SaveOutlined} from "@ant-design/icons";
import EditShowForm from "../clientForm/ClientForm";
import {FORM_MODE} from "../../../../constants/config";
import {createClient} from "../../../../services/clients";

const ClientModal = ({openModal,setOpenModal,title,form:{control,errors,handleSubmit,reset},queryClient}) => {
    const [isLoading,setIsLoading] = useState(false);

    useEffect(()=>{
        if(openModal.open && openModal.mode === FORM_MODE.SHOW && openModal.data){
            reset(openModal.data);
        }else if(openModal.open && openModal.mode === FORM_MODE.CREATE){
            reset({});
        }
    },[openModal]);
    const handleCancel = () => {
        if(isLoading === false)
            setOpenModal({...openModal,open:false});
    };

    const onFinish = (data) => {
        if(openModal.open && openModal.mode ===FORM_MODE.CREATE){
            console.log(data);
            setIsLoading(true);
            createClient(data).then(res=>{
                queryClient.invalidateQueries('clients');
                message.success(res?.statusText);
                setOpenModal({});
            }).catch(err=>{
                message.error(err?.response?.statusText);
                setIsLoading(false);
            });
        }
    }

    const footer = (openModal.mode===FORM_MODE.EDIT || openModal.mode===FORM_MODE.CREATE)? [
        <Button disabled={isLoading} className="login-form-button" key='cancel' onClick={handleCancel}>
            Odustani
        </Button>,

        <Button loading={isLoading} type="primary" key="ok" form="client-form" icon={<SaveOutlined />} htmlType="submit" className="login-form-button">
            Sacuvaj
        </Button>
    ]:[
        <Button loading={isLoading} key="close" className="login-form-button" onClick={()=>{setOpenModal({})}}>
            Zatvori
        </Button>
    ]

    return (
        <>
            <Modal title={title} visible={openModal.open} onCancel={handleCancel} footer={footer}>
                <EditShowForm disabled={openModal.mode===FORM_MODE.SHOW} control={control} errors={errors} handleSubmit={handleSubmit} onFinish={onFinish} />
            </Modal>
        </>
    );
};

export default ClientModal;