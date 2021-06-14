import React, {useEffect, useState} from 'react';
import {Modal, Button, message} from 'antd';
import {SaveOutlined} from "@ant-design/icons";
import EditShowForm from "../clientForm/ClientForm";
import {FORM_MODE, MESSAGE_TYPE} from "../../../../constants/config";
import {createClient, getClient, updateClient} from "../../../../services/clients";
import {showMessage} from "../../../../functions/tools";
import {getReservation, updateReservation} from "../../../../services/reservations";
import moment from "moment";
import * as yup from "yup";

const ClientModal = ({openModal,setOpenModal,title,form:{control,errors,handleSubmit,reset},queryClient}) => {
    const [isLoading,setIsLoading] = useState(false);

    useEffect(()=>{
         if(openModal.open && openModal.mode === FORM_MODE.CREATE){
            reset({});
        }else if(openModal.open && (openModal.mode === FORM_MODE.EDIT || openModal.mode === FORM_MODE.SHOW) && openModal.id){
            console.log(openModal.id)
             getClient(openModal.id).then(res=>{
                let data = res?.data?.client;
                // console.log(data);
                reset({
                    email: data?.email,
                    name: data?.name,
                    country_id: data?.country_id,
                    identification_document_no: data?.identification_document_no,
                    phone_no: data?.phone_no,
                   /* remarks: data?.remarks*/
                })
            }).catch(err=>{
                //console.log(err?.response?.statusText);
                showMessage(err?.response?.data?.message, MESSAGE_TYPE.ERROR);
            });
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
                showMessage('Klient je uspjesno kreiran!', MESSAGE_TYPE.SUCCESS);
                setIsLoading(false);
                setOpenModal({});
            }).catch(err=>{
                showMessage(err?.response?.data?.message, MESSAGE_TYPE.ERROR);
                setIsLoading(false);
            });
        }else  if(openModal.open && openModal.mode ===FORM_MODE.EDIT){
            setIsLoading(true);
            updateClient(openModal.id, data).then(()=>{
                queryClient.invalidateQueries('clients');
                showMessage('Podaci o klijentu su uspjeno izmjenjeni!!!', MESSAGE_TYPE.SUCCESS);
                setOpenModal({});
                setIsLoading(false);
            }).catch(err=>{
                showMessage(err?.response?.data?.message, MESSAGE_TYPE.ERROR);
                setIsLoading(false);
            })
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