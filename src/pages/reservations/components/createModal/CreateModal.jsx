import React, {useEffect, useState} from 'react';
import {Modal, Button} from 'antd';
import {SaveOutlined} from "@ant-design/icons";
import moment from "moment";
import {createReservation} from "../../../../services/reservations";
import {calcDays, getEquipmentData, showMessage, _} from "../../../../functions/tools";
import {MESSAGE_TYPE} from "../../../../constants/config";
import ReservationForm from "../reservationForm/ReservationForm";
import PropTypes from "prop-types";

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
    },[openModal,reset,params]);

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
        createReservation(formData).then(()=>{
            queryClient.invalidateQueries('cars-available').then();
            showMessage(_('reservation_create_success'), MESSAGE_TYPE.SUCCESS);
            setIsLoading(false);
            setOpenModal({});
        }).catch(err=>{
            showMessage(err?.response?.data?.message, MESSAGE_TYPE.ERROR);
            setIsLoading(false);
        });
    }

    const footer =  [
        <Button disabled={isLoading} className="login-form-button" key='cancel' onClick={handleCancel}>
            {_('cancel')}
        </Button>,

        <Button loading={isLoading} type="primary" key="ok" form="reservation-form" icon={<SaveOutlined />} htmlType="submit" className="login-form-button">
            {_('save')}
        </Button>
    ];

    return (
        <>
            <Modal title={title} visible={openModal.open} onCancel={handleCancel} footer={footer}>
                <ReservationForm
                    control={control}
                    errors={errors}
                    setValue={setValue}
                    getValues={getValues}
                    handleSubmit={handleSubmit}
                    onFinish={onFinish}
                    pricePerDay={openModal?.data?.price_per_day}
                    isCreate={true}
                    openModal={openModal}
                />
            </Modal>
        </>
    );
};

CreateModal.propTypes = {
    openModal: PropTypes.shape({
        id: PropTypes.number,
        mode: PropTypes.number,
        open: PropTypes.bool,
    }),
    setOpenModal: PropTypes.func.isRequired,
    title: PropTypes.string,
    form: PropTypes.object,
    queryClient: PropTypes.object,
    params: PropTypes.object
}

export default CreateModal;