import React, {useEffect, useState} from 'react';
import {Modal, Button} from 'antd';
import {SaveOutlined} from "@ant-design/icons";
import CreateForm from "../createForm/CreateForm";
import moment from "moment";
import {createReservation} from "../../../../services/reservations";
import {calcDays, getEquipmentData, showMessage} from "../../../../functions/tools";
import {MESSAGE_TYPE} from "../../../../constants/config";

const CreateModal = ({openModal,setOpenModal,title,form:{control,errors,handleSubmit,reset,setValue,getValues},queryClient,params}) => {
    const [isLoading,setIsLoading] = useState(false);

    const handleCancel = () => {
        if(isLoading === false)
            setOpenModal({...openModal,open:false});
    };

    useEffect(()=>{
        if(openModal.open && openModal.id){
            reset({
                total_price:calcDays(moment(params.start_date),moment(params.end_date),openModal?.data?.price_per_day),
                vehicle_id:openModal.id,
                vehicle:openModal.data?.plate_no,
                from_date:moment(params.start_date),
                to_date:moment(params.end_date)
            });
        }
    },[openModal]);

    const onFinish = (data) => {
        let formData = getEquipmentData(data) ;
        console.log(formData)
        //delete formData.client;
        delete formData.vehicle;
        delete formData.total_price;
        formData.to_date = moment(formData.to_date).format('YYYY-MM-DD');
        formData.from_date = moment(formData.from_date).format('YYYY-MM-DD');

        console.log(formData);
        setIsLoading(true);
        createReservation(formData).then(res=>{
            queryClient.invalidateQueries('cars-available');
            showMessage('Rezervacija je uspjesno kreirana!', MESSAGE_TYPE.SUCCESS);
            setIsLoading(false);
            setOpenModal({});
        }).catch(err=>{
            showMessage(err?.response?.data?.message, MESSAGE_TYPE.ERROR);
            setIsLoading(false);
        });
    }

    const footer =  [
        <Button disabled={isLoading} className="login-form-button" key='cancel' onClick={handleCancel}>
            Odustani
        </Button>,

        <Button loading={isLoading} type="primary" key="ok" form="create-reservation-form" icon={<SaveOutlined />} htmlType="submit" className="login-form-button">
            Sacuvaj
        </Button>
    ];

    return (
        <>
            <Modal title={title} visible={openModal.open} onCancel={handleCancel} footer={footer}>
                    <CreateForm
                        control={control}
                        errors={errors}
                        setValue={setValue}
                        getValues={getValues}
                        handleSubmit={handleSubmit}
                        onFinish={onFinish}
                        price_per_day={openModal?.data?.price_per_day}
                    />
            </Modal>
        </>
    );
};

export default CreateModal;