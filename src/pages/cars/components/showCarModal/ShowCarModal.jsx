import React, {useEffect, useState} from 'react';
import {Modal, Button, Spin, List} from 'antd';
import {FORM_MODE, MESSAGE_TYPE} from "../../../../constants/config";
import {getVehicle} from "../../../../services/cars";
import ImagePreview from "../../../../components/imagePreview/ImagePreview";
import {showMessage,_} from "../../../../functions/tools";
import PropTypes from 'prop-types';

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
                    <List
                        size="small"
                        bordered
                        dataSource={[
                            `${_('plate_no')}: ${data?.plate_no}`,
                            `${_('production_year')}: ${data?.production_year}`,
                            `${_('car_type')}: ${data?.car_type?.name}`,
                            `${_('no_of_seats')}: ${data?.no_of_seats}`,
                            `${_('price_per_day')}: ${data?.price_per_day}€`,
                            `${_('remarks')}: ${data?.remarks?data?.remarks:''}`
                        ]}
                        renderItem={item => <List.Item>{item}</List.Item>}
                        footer={<ImagePreview photos={data?.photos?data?.photos:[]} />}
                        />

                </>
                }

            </Modal>
        </>
    );
};

ShowCarModal.propTypes = {
    openModal: PropTypes.shape({
        id: PropTypes.number,
        mode: PropTypes.number.isRequired,
        open: PropTypes.bool.isRequired,
    }),
    setOpenModal: PropTypes.func.isRequired,
    title: PropTypes.string
}
export default ShowCarModal;