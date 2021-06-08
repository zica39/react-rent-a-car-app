import React, {useEffect, useState} from 'react';
import { Modal, Button } from 'antd';
import EditShowForm from "../carForm/CarForm";
import {FORM_MODE} from "../../../../constants/config";

const ShowCarModal = ({openModal,setOpenModal,title,form:{control,errors,handleSubmit,reset}}) => {
    const [isLoading,setIsLoading] = useState(false);

    useEffect(()=>{
        if(openModal.data)reset(openModal.data);

        },[openModal]);

    const handleCancel = () => {
        if(isLoading === false)
            setOpenModal({...openModal,open:false});
    };

    const onFinish = (data) => {
        console.log(data)
    }

    const footer =  [
        <Button loading={isLoading} key="close" className="login-form-button" onClick={()=>{setOpenModal({})}}>
            Zatvori
        </Button>
    ]

    return (
        <>
            <Modal title={title} visible={openModal.open && openModal.mode === FORM_MODE.SHOW} onCancel={handleCancel} footer={footer}>
                <EditShowForm disabled={true} control={control} errors={errors} handleSubmit={handleSubmit} onFinish={onFinish} />
            </Modal>
        </>
    );
};

export default ShowCarModal;