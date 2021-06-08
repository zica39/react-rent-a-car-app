import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import {SaveOutlined} from "@ant-design/icons";
import EditShowForm from "../clientForm/ClientForm";
import {FORM_MODE} from "../../../../constants/config";

const ClientModal = ({openModal,setOpenModal,title,form:{control,errors,handleSubmit}}) => {
    const [isLoading,setIsLoading] = useState(false);


    const handleCancel = () => {
        if(isLoading === false)
            setOpenModal({...openModal,open:false});
    };

    const onFinish = (data) => {
        console.log(data)
    }

    const footer = (openModal.mode===FORM_MODE.EDIT || openModal.mode===FORM_MODE.CREATE)? [
        <Button disabled={isLoading} className="login-form-button" key='cancel' onClick={handleCancel}>
            Odustani
        </Button>,

        <Button loading={isLoading} type="primary" key="ok" form="edit-client-form" icon={<SaveOutlined />} htmlType="submit" className="login-form-button">
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