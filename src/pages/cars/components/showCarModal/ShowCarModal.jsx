import React, {useEffect, useState} from 'react';
import {Modal, Button, Spin} from 'antd';
import {FORM_MODE, MESSAGE_TYPE} from "../../../../constants/config";
import {getVehicle} from "../../../../services/cars";
import ImagePreview from "../../../../components/imagePreview/ImagePreview";
import {showMessage,_} from "../../../../functions/tools";

const ShowCarModal = ({openModal,setOpenModal,title}) => {
    const [isLoading,setIsLoading] = useState(false);
    const [data,setData] = useState({});

    useEffect(()=>{
        console.log(openModal.id)
        setIsLoading(true)
        if(openModal.open && openModal.id && openModal.mode === FORM_MODE.SHOW){
            getVehicle(openModal.id).then(res=>{
                let data = res?.data;
                setData(data);
                setIsLoading(false)
            }).catch(err=>{
                showMessage(err?.response?.data?.message, MESSAGE_TYPE.ERROR);
                setIsLoading(false)
            })
        }
        },[openModal]);

    const handleCancel = () => {
        if(isLoading === false)
            setOpenModal({...openModal,open:false});
    };

    const footer =  [
        <Button key="close" className="login-form-button" onClick={()=>{setOpenModal({})}}>
            {_('close')}
        </Button>
    ]

    return (
        <>
            <Modal title={title} visible={openModal.open && openModal.mode === FORM_MODE.SHOW} onCancel={handleCancel} footer={footer}>
                {isLoading?
                    <Spin tip={_('loading')} />:
                <>
                    <p>Broj tablica :{data?.plate_no}</p>
                    <p>Tip vozila:{data?.car_type_id}</p>
                    <p>Broj sjedista:{data?.no_of_seats}</p>
                    <p>Cijena po danu :{data?.price_per_day}</p>
                    <p>Godina prozivodnje :{data?.production_year}</p>
                    <p>Napomene :{data?.remarks}</p>
                    <ImagePreview photos={data?.photos?data?.photos:[]} />
                </>
                }

            </Modal>
        </>
    );
};

export default ShowCarModal;