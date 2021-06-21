import React, {useEffect, useState} from 'react';
import {Modal, Button, Steps, Spin} from 'antd';
import {SaveOutlined,ArrowRightOutlined,ArrowLeftOutlined,CheckCircleTwoTone} from "@ant-design/icons";
import CarForm from "../carForm/CarForm";
import {FILE_URL, FORM_MODE, MESSAGE_TYPE} from "../../../../constants/config";
import './style.css';
import ImageUpload from "../../../../components/imageUpload/ImageUpload";
import {createVehicle, getVehicle, updateVehicle} from "../../../../services/cars";
import {showMessage, _, getImage} from "../../../../functions/tools";
import PropTypes from 'prop-types';
import ShowCarModal from "../showCarModal/ShowCarModal";

const { Step } = Steps;

const StepFormModal = ({openModal,setOpenModal,title,form:{control,errors,handleSubmit,reset},queryClient}) => {
    const [isLoading,setIsLoading] = useState(false);
    const [isFetching,setIsFetching] = useState(false);

    const [fileList, setFileList] = useState([]);
    const[formData,setFormData] = useState({});

    const [current, setCurrent] = useState(0);

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };
    const steps = [
        {
            title: _('step1'),
            description:_('step1_desc'),
        },
        {
            title: _('step2'),
            description:_('step2_desc'),
        },
        {
            title: _('finish'),
            description: _('step3_desc')
        },
    ];

        useEffect(()=>{
            if(openModal.open && (openModal.mode === FORM_MODE.EDIT || openModal.mode === FORM_MODE.CREATE)){
                setCurrent(0);
                if(openModal.id === 0) reset({
                    plate_no:'',
                    production_year:'',
                    no_of_seats:'',
                    price_per_day:0,
                    remarks:''
                });else{
                    setIsFetching(true);
                    reset({})
                    getVehicle(openModal.id).then(res=>{
                        let data = res?.data;
                        console.log(data);
                        reset({
                            plate_no:data.plate_no,
                            production_year:data.production_year,
                            car_type_id:data.car_type_id,
                            no_of_seats:data.no_of_seats,
                            price_per_day:data.price_per_day,
                            remarks:data.remarks
                        })
                       setFileList(data.photos.map(e=>{return getImage({'uid': e.id,'status': 'done','url': FILE_URL+e?.photo })}))
                        setIsFetching(false);
                    }).catch(err=>{
                        //console.log(err?.response?.statusText);
                        showMessage(err?.response?.data?.message, MESSAGE_TYPE.ERROR);
                        setIsFetching(false);
                    })
                }
            }
        },[openModal,reset])

    const onSave = () => {
            console.log(formData)
            setIsLoading(true);
            let photos = fileList.filter(e=>e.originFileObj).map(e=>e.originFileObj);
            console.log(photos);
            const form = new FormData();

            for (let name in formData) {
                form.append(name, formData[name]);
            }
            photos.forEach((e,i)=>form.append(`photo[${i}]`,e));
            //if(photos.length === 0)

        if(!openModal.id){
            createVehicle(form).then(()=>{
                queryClient.invalidateQueries('cars').then();
                showMessage(_('vehicle_create_success'), MESSAGE_TYPE.SUCCESS);
                setOpenModal({});
                setFileList([]);
                setIsLoading(false);
            }).catch(err=>{
                showMessage(err?.response?.data?.message, MESSAGE_TYPE.ERROR);
                setIsLoading(false);
            })
        }else {
            updateVehicle(openModal.id, form).then(()=>{
                queryClient.invalidateQueries('cars').then();
                showMessage(_('vehicle_edit_success'), MESSAGE_TYPE.SUCCESS);
                setOpenModal({});
                setIsLoading(false);
                setFileList([]);
            }).catch(err=>{
                showMessage(err?.response?.data?.message, MESSAGE_TYPE.ERROR);
                setIsLoading(false);
            })
        }
    };

    const handleCancel = () => {
        if(isLoading === false){
            setOpenModal({...openModal,open:false});
            setFileList([]);
        }

    };

    const onFinishStep1 = (data) => {
        console.log(data);
        data.production_year = String(data.production_year);
        setFormData({...data});
        next();
    }
    const onFinishStep2 = () => {
        if(fileList.length > 0 && fileList.length <= 5){
            next();
        }else{
            showMessage(_('vehicle_photos_error'), MESSAGE_TYPE.ERROR);
        }
    }

    const footer =  [
        <Button disabled={isLoading} className="login-form-button" key='cancel' onClick={handleCancel}>
            {_('cancel')}
        </Button>,

        <Button loading={isLoading} disabled={current!==2} type="primary" key="ok" icon={<SaveOutlined />} onClick={onSave} className="login-form-button">
            {_('save')}
        </Button>
    ]

    return (
        <>
            <Modal title={title} visible={openModal.open &&(openModal.mode===FORM_MODE.EDIT || openModal.mode===FORM_MODE.CREATE)} onCancel={handleCancel} footer={footer} >
                {isFetching?
                    <Spin tip={_('loading')} />:<>
                <Steps  type="navigation" current={current} style={{paddingTop:0}}>
                    {steps.map(item => (
                        <Step key={item.title} title={item.title} description={item.description} />
                    ))}
                </Steps>
                <div className="steps-content">
                    {
                        current === 0?
                            <CarForm disabled={openModal.mode===FORM_MODE.SHOW} control={control} errors={errors} handleSubmit={handleSubmit} onFinish={onFinishStep1} />:
                        current === 1?
                            <ImageUpload fileList={fileList} setFileList={setFileList} />:
                            current ===2?
                                <p><CheckCircleTwoTone style={{margin:'auto', fontSize: '72px'}} /></p>:''
                    }
                </div>
                <div className="steps-action">
                    {current > 0 && (
                        <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                            <ArrowLeftOutlined /> {_('previous')}
                        </Button>
                    )}
                    {current < steps.length - 1 && (current===0?
                        <Button loading={isLoading} type="primary" form="edit-car-form" htmlType="submit" className="login-form-button">
                            {_('next')} <ArrowRightOutlined />
                        </Button>:
                        <Button type="primary" onClick={onFinishStep2}>
                            {_('next')} <ArrowRightOutlined />
                        </Button>
                    )}
                </div>
                    </>}
            </Modal>
        </>
    );
};

ShowCarModal.propTypes = {
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

export default StepFormModal;