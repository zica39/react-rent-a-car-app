import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import {SaveOutlined} from "@ant-design/icons";

const FormModal = ({openModal,setOpenModal,title,children}) => {
    const [isLoading,setIsLoading] = useState(false);

    const handleOk = () => {
        setOpenModal(false);
    };

    const handleCancel = () => {
        if(isLoading === false)
        setOpenModal(false);
    };

    return (
        <>
            <Modal title={title} visible={openModal} onCancel={handleCancel} footer={[
                <Button disabled={isLoading} className="login-form-button" key='cancel' onClick={handleCancel}>
                   Odustani
                </Button>,

                <Button loading={isLoading} type="primary" key="ok" form="edit-car-form" icon={<SaveOutlined />} htmlType="submit" className="login-form-button">
                    Sacuvaj
                </Button>
            ]}>
                {children}
            </Modal>
        </>
    );
};

export default FormModal;