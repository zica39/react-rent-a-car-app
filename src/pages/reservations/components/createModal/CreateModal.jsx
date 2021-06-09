import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import {SaveOutlined} from "@ant-design/icons";
import CreateForm from "../createForm/CreateForm";

const CreateModal = ({openModal,setOpenModal,title,form:{control,errors,handleSubmit,reset}}) => {
    const [isLoading,setIsLoading] = useState(false);

    const handleCancel = () => {
        if(isLoading === false)
            setOpenModal({...openModal,open:false});
    };

    const onFinish = (data) => {
        console.log(data)
    }

    const footer =  [
        <Button disabled={isLoading} className="login-form-button" key='cancel' onClick={handleCancel}>
            Odustani
        </Button>,

        <Button loading={isLoading} type="primary" key="ok" form="edit-reservation-form" icon={<SaveOutlined />} htmlType="submit" className="login-form-button">
            Sacuvaj
        </Button>
    ];

    return (
        <>
            <Modal title={title} visible={openModal.open} onCancel={handleCancel} footer={footer}>
                    <CreateForm control={control} errors={errors} handleSubmit={handleSubmit} onFinish={onFinish} />:
            </Modal>
        </>
    );
};

export default CreateModal;