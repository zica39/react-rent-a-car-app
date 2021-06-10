import React, {useEffect, useState} from 'react';
import { Modal, Button, message } from 'antd';
import {FORM_MODE} from "../../../../constants/config";
import {getVehicle} from "../../../../services/cars";
import ImagePreview from "../imagePreview/ImagePreview";

const ShowCarModal = ({openModal,setOpenModal,title}) => {
    const [isLoading,setIsLoading] = useState(false);
    const [data,setData] = useState({});

    useEffect(()=>{
        console.log(openModal.id)
        if(openModal.open && openModal.id && openModal.mode === FORM_MODE.SHOW){
            getVehicle(openModal.id).then(res=>{
                let data = res?.data;
                setData(data);
            }).catch(err=>{
                //console.log(err?.response?.statusText);
                message.err(err?.response?.statusText)
            })
        }
        },[openModal]);

    const handleCancel = () => {
        if(isLoading === false)
            setOpenModal({...openModal,open:false});
    };

    const footer =  [
        <Button loading={isLoading} key="close" className="login-form-button" onClick={()=>{setOpenModal({})}}>
            Zatvori
        </Button>
    ]

    return (
        <>
            <Modal title={title} visible={openModal.open && openModal.mode === FORM_MODE.SHOW} onCancel={handleCancel} footer={footer}>

                    <p>Broj tablica :{data?.plate_no}</p>
                    <p>Tip vozila:{data?.car_type_id}</p>
                    <p>Broj sjedista:{data?.no_of_seats}</p>
                    <p>Cijena po danu :{data?.price_per_day}</p>
                    <p>Godina prozivodnje :{data?.production_year}</p>
                    <p>Napomene :{data?.remarks}</p>


                <ImagePreview photos={data?.photos?data?.photos:[]} />
            </Modal>
        </>
    );
};

export default ShowCarModal;