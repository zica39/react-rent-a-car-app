import React, {useEffect, useState} from 'react';
import {Modal, Button, Spin} from 'antd';
import {SaveOutlined} from "@ant-design/icons";
import {getReservation} from "../../../../services/reservations";
import {FORM_MODE, MESSAGE_TYPE} from "../../../../constants/config";
import moment from 'moment';
import {updateReservation} from "../../../../services/reservations";
import {getEquipmentData, getEquipmentObj, setEquipmentData, showMessage, _} from "../../../../functions/tools";
import DataView from "../dataView/DataView";
import ReservationForm from "../reservationForm/ReservationForm";
import PropTypes from "prop-types";

const EditModal = ({openModal,setOpenModal,title,form:{control,errors,handleSubmit,reset,getValues,setValue},queryClient}) => {
    const [isLoading,setIsLoading] = useState(false);
    const [isFetching,setIsFetching] = useState(false);
    const[showData,setShowData] = useState({});

    const handleCancel = () => {
        if(isLoading === false)
            setOpenModal({...openModal,open:false});
    };

    const onFinish = (data) => {
        //let formData = data;
        let formData = getEquipmentData(data) ;
        delete formData.client;
        delete formData.vehicle;
        delete formData.total_price;
        delete formData.price_per_day;
        formData.to_date = moment(formData.to_date).format('YYYY-MM-DD');
        formData.from_date = moment(formData.from_date).format('YYYY-MM-DD');
        setIsLoading(true);

        console.log(formData)

        updateReservation(openModal.id, formData).then(()=>{
            queryClient.invalidateQueries('reservations').then();
            showMessage(_('reservation_edit_success'), MESSAGE_TYPE.SUCCESS);
            setOpenModal({});
            setIsLoading(false);
        }).catch(err=>{
            showMessage(err?.response?.data?.message, MESSAGE_TYPE.ERROR);
            setIsLoading(false);
        })

    }
    useEffect(()=>{
        if(openModal.open && (openModal.mode===FORM_MODE.EDIT || openModal.mode===FORM_MODE.CREATE)){
            if(openModal.id) {
                //reset({});
                setIsFetching(true);
                getReservation(openModal.id).then(res=>{
                    let data = res?.data;
                    //console.log(data);
                    data = setEquipmentData(data);
                    console.log(data);
                   // console.log(formatDate(data.to_date));
                    reset({
                        vehicle_id:data.vehicle_id,
                        client_id:data.client_id,
                        vehicle:data.vehicle.plate_no,
                        price_per_day: data.vehicle.price_per_day,
                        client:data.client.name,
                        to_date: moment(data.to_date),
                        from_date: moment(data.from_date),
                        rent_location_id:data.rent_location_id,
                        return_location_id:data.return_location_id,
                        total_price:data.total_price,
                        ...getEquipmentObj(data)
                    });
                    setIsFetching(false);
                }).catch(err=>{
                    showMessage(err?.response?.data?.message, MESSAGE_TYPE.ERROR);
                    setIsFetching(false);
                })
            }
        }else{
            if(openModal.id){
                setIsFetching(true);
                getReservation(openModal.id).then(res=>{
                    setShowData(res?.data);
                    setIsFetching(false);
                }).catch(err=>{
                    showMessage(err?.response?.data?.message, MESSAGE_TYPE.ERROR);
                    setIsFetching(false);
                })
            }

        }
    },[openModal,reset])

    const footer = (openModal.mode===FORM_MODE.EDIT || openModal.mode===FORM_MODE.CREATE)? [
        <Button disabled={isLoading} className="login-form-button" key='cancel' onClick={handleCancel}>
            {_('cancel')}
        </Button>,

        <Button loading={isLoading} type="primary" key="ok" form="reservation-form" icon={<SaveOutlined />} htmlType="submit" className="login-form-button">
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
                    <Spin tip={_('loading')} />:
                (openModal.mode===FORM_MODE.EDIT || openModal.mode===FORM_MODE.CREATE)?
                    <ReservationForm
                        control={control}
                        errors={errors}
                        setValue={setValue}
                        getValues={getValues}
                        handleSubmit={handleSubmit}
                        onFinish={onFinish}
                        isCreate={false}
                    />:
                    <DataView showData={showData}/>
                }
            </Modal>
        </>
    );
};

EditModal.propTypes = {
    openModal: PropTypes.shape({
        id: PropTypes.number,
        mode: PropTypes.number,
        open: PropTypes.bool,
    }),
    setOpenModal: PropTypes.func.isRequired,
    title: PropTypes.string,
    form: PropTypes.object,
    queryClient: PropTypes.object
}
export default EditModal;