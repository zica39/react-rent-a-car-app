import React, {useEffect, useState} from 'react';
import {Modal, Button, message} from 'antd';
import {SaveOutlined} from "@ant-design/icons";
import EditForm from "../editForm/EditForm";
import {getReservation} from "../../../../services/reservations";
import {FORM_MODE, MESSAGE_TYPE} from "../../../../constants/config";
import moment from 'moment';
import {updateReservation} from "../../../../services/reservations";
import {getEquipmentData, getEquipmentObj, setEquipmentData, showMessage} from "../../../../functions/tools";

const EditModal = ({openModal,setOpenModal,title,form:{control,errors,handleSubmit,reset,getValues,setValue},queryClient}) => {
    const [isLoading,setIsLoading] = useState(false);
    const[showData,setShowData] = useState({});

    const handleCancel = () => {
        if(isLoading === false)
            setOpenModal({...openModal,open:false});
    };

   // console.log(control)

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

        updateReservation(openModal.id, formData).then(res=>{
            queryClient.invalidateQueries('reservations');
            showMessage('Rezervacija je uspjesno izmjenjena!', MESSAGE_TYPE.SUCCESS);
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
                    })
                }).catch(err=>{
                    //console.log(err?.response?.statusText);
                    message.error(err?.response?.statusText);
                })
            }
        }else{
            if(openModal.id){
                getReservation(openModal.id).then(res=>{
                    setShowData(res?.data);
                }).catch(err=>{
                    message.error(err?.response?.statusText);
                })
            }

        }
    },[openModal])

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
                {(openModal.mode===FORM_MODE.EDIT || openModal.mode===FORM_MODE.CREATE)?
                    <EditForm
                        control={control}
                        errors={errors}
                        handleSubmit={handleSubmit}
                        onFinish={onFinish}
                        getValues={getValues}
                        setValue={setValue}
                    />:
                    <div>
                        <h3>Rezervacija:</h3>
                        <p>Od :{showData?.from_date}</p>
                        <p>Do:{showData?.to_date}</p>
                        <p>Lokacija peruzimanja:{showData?.rent_location?.name}</p>
                        <p>Lokcaija vracanja :{showData?.return_location?.name}</p>
                        <p>Ukupna cijena :{showData?.total_price}</p>
                        <h3>Klijent:</h3>
                        <p>Ime i prezime :{showData?.client?.name}</p>
                        <h3>Vozilo:</h3>
                        <p>Broj tablica :{showData?.vehicle?.plate_no}</p>
                        <p>Godina proizvodnje:{showData?.vehicle?.production_year}</p>
                        <p>Tip vozila:{showData?.vehicle?.car_type?.name}</p>
                        <p>Broj sjedista :{showData?.vehicle?.no_of_seats}</p>
                        <p>Cijena rezervacije po danu :{showData?.vehicle?.price_per_day}</p>
                        {/*<p>Dodatna oprema: ????</p>*/}
                    </div>
                }
            </Modal>
        </>
    );
};

export default EditModal;