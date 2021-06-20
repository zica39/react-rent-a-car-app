import React, {useEffect, useState} from 'react';
import {Modal, Button, Spin} from 'antd';
import {SaveOutlined} from "@ant-design/icons";
import EditShowForm from "../clientForm/ClientForm";
import {FORM_MODE, MESSAGE_TYPE} from "../../../../constants/config";
import {createClient, getClient, updateClient} from "../../../../services/clients";
import {showMessage, _} from "../../../../functions/tools";
import PropTypes from "prop-types";

const ClientModal = ({openModal,setOpenModal,title,form:{control,errors,handleSubmit,reset},queryClient}) => {
    const [isLoading,setIsLoading] = useState(false);
    const [isFetching,setIsFetching] = useState(false);

    useEffect(()=>{
         if(openModal.open && openModal.mode === FORM_MODE.CREATE){
            reset({});
        }else if(openModal.open && (openModal.mode === FORM_MODE.EDIT || openModal.mode === FORM_MODE.SHOW) && openModal.id){
            console.log(openModal.id);
            setIsFetching(true);
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
                });
                 setIsFetching(false);
            }).catch(err=>{
                //console.log(err?.response?.statusText);
                showMessage(err?.response?.data?.message, MESSAGE_TYPE.ERROR);
                 setIsFetching(false);
            });
        }
    },[openModal,reset]);
    const handleCancel = () => {
        if(isLoading === false)
            setOpenModal({...openModal,open:false});
    };

    const onFinish = (data) => {
        if(openModal.open && openModal.mode ===FORM_MODE.CREATE){
            console.log(data);
            setIsLoading(true);
            createClient(data).then(()=>{
                queryClient.invalidateQueries('clients').then();
                showMessage(_('client_create_success'), MESSAGE_TYPE.SUCCESS);
                setIsLoading(false);
                setOpenModal({});
            }).catch(err=>{
                showMessage(err?.response?.data?.message, MESSAGE_TYPE.ERROR);
                setIsLoading(false);
            });
        }else  if(openModal.open && openModal.mode ===FORM_MODE.EDIT){
            setIsLoading(true);
            updateClient(openModal.id, data).then(()=>{
                queryClient.invalidateQueries('clients').then();
                showMessage(_('client_edit_success'), MESSAGE_TYPE.SUCCESS);
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
            {_('cancel')}
        </Button>,

        <Button loading={isLoading} type="primary" key="ok" form="client-form" icon={<SaveOutlined />} htmlType="submit" className="login-form-button">
            {_('save')}
        </Button>
    ]:[
        <Button loading={isLoading} key="close" className="login-form-button" onClick={()=>{setOpenModal({})}}>
            {_('close')}
        </Button>
    ]

    return (
        <>
            <Modal title={title} visible={openModal.open} onCancel={handleCancel} footer={footer}>
                {isFetching?
                    <Spin style={{marginLeft:'auto'}} tip={_('loading')} />:
                    <EditShowForm disabled={openModal.mode===FORM_MODE.SHOW} control={control} errors={errors} handleSubmit={handleSubmit} onFinish={onFinish} />
                }
            </Modal>
        </>
    );
};

ClientModal.propTypes = {
    openModal: PropTypes.shape({
        id: PropTypes.number,
        mode: PropTypes.number,
        open: PropTypes.bool,
    }),
    setOpenModal: PropTypes.func.isRequired,
    title: PropTypes.string,
    form: PropTypes.object
}

export default ClientModal;