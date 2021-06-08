import React, { useState } from 'react';
import { Modal, Button,Steps,message } from 'antd';
import {SaveOutlined,ArrowRightOutlined,ArrowLeftOutlined} from "@ant-design/icons";
import CarForm from "../carForm/CarForm";
import {FORM_MODE} from "../../../../constants/config";
import './style.css';
import ImageUpload from "../imageUpload/ImageUpload";

const { Step } = Steps;
const steps = [
    {
        title: 'Korak 1',
        description:"Osnovni podaci",
    },
    {
        title: 'Korak 2',
        description:"Fotografije"
    },
    {
        title: 'Kraj',
        description: 'Sacuvaj izmjene'
    },
];

const StepFormModal = ({openModal,setOpenModal,title,form:{control,errors,handleSubmit}}) => {
    const [isLoading,setIsLoading] = useState(false);
    const [current, setCurrent] = useState(0);

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const onSave = () => {
        message.success('Processing complete!');
       // setOpenModal({...openModal,open:false});
    };

    const handleCancel = () => {
        if(isLoading === false)
            setOpenModal({...openModal,open:false});
    };

    const onFinish = (data) => {
        console.log(data)
        next();
    }

    const footer =  [
        <Button disabled={isLoading} className="login-form-button" key='cancel' onClick={handleCancel}>
            Odustani
        </Button>,

        <Button loading={isLoading} disabled={current!==2} type="primary" key="ok" icon={<SaveOutlined />} onClick={onSave} className="login-form-button">
            Sacuvaj
        </Button>
    ]

    return (
        <>
            <Modal title={title} visible={openModal.open &&(openModal.mode===FORM_MODE.EDIT || openModal.mode===FORM_MODE.CREATE)} onCancel={handleCancel} footer={footer} >
                <Steps  type="navigation" current={current} style={{paddingTop:0}}>
                    {steps.map(item => (
                        <Step key={item.title} title={item.title} description={item.description} />
                    ))}
                </Steps>
                <div className="steps-content">
                    {
                        current === 0?
                            <CarForm disabled={openModal.mode===FORM_MODE.SHOW} control={control} errors={errors} handleSubmit={handleSubmit} onFinish={onFinish} />:
                        current === 1?
                            <ImageUpload />:''
                    }
                </div>
                <div className="steps-action">
                    {current > 0 && (
                        <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                            <ArrowLeftOutlined /> Previous
                        </Button>
                    )}
                    {current < steps.length - 1 && (current===0?
                        <Button loading={isLoading} type="primary" form="edit-car-form" htmlType="submit" className="login-form-button">
                            Next <ArrowRightOutlined />
                        </Button>:
                        <Button type="primary" onClick={() => next()}>
                            Next <ArrowRightOutlined />
                        </Button>
                    )}
                </div>

            </Modal>
        </>
    );
};

export default StepFormModal;