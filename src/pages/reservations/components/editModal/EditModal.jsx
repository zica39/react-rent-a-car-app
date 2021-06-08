import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import {SaveOutlined} from "@ant-design/icons";
import EditForm from "../editForm/EditForm";
import {FORM_MODE} from "../../../../constants/config";

const EditModal = ({openModal,setOpenModal,title,form:{control,errors,handleSubmit,reset}}) => {
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

        <Button loading={isLoading} type="primary" key="ok" form="edit-reservation-form" icon={<SaveOutlined />} htmlType="submit" className="login-form-button">
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
                {openModal.mode===FORM_MODE.EDIT?
                    <EditForm control={control} errors={errors} handleSubmit={handleSubmit} onFinish={onFinish} />:
                    <></>
                }
            </Modal>
        </>
    );
};

export default EditModal;