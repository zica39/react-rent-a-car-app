import React, {useEffect, useState} from 'react';
import { Modal, Button,Steps } from 'antd';
import {SaveOutlined,ArrowRightOutlined,ArrowLeftOutlined,CheckCircleTwoTone} from "@ant-design/icons";
import CarForm from "../carForm/CarForm";
import {FILE_URL, FORM_MODE, MESSAGE_TYPE} from "../../../../constants/config";
import './style.css';
import ImageUpload from "../imageUpload/ImageUpload";
import {createVehicle, getVehicle, updateVehicle} from "../../../../services/cars";
import {showMessage} from "../../../../functions/tools";

const { Step } = Steps;
const steps = [
    {
        title: 'Korak 1',
        description:"Osnovni podaci",
    },
    {
        title: 'Korak 2',
        description:"Fotografije"
    },
    {
        title: 'Kraj',
        description: 'Sacuvaj izmjene'
    },
];

const StepFormModal = ({openModal,setOpenModal,title,form:{control,errors,handleSubmit,reset},queryClient}) => {
    const [isLoading,setIsLoading] = useState(false);
    const [fileList, setFileList] = useState([]);
    const[formData,setFormData] = useState({});

    const [current, setCurrent] = useState(0);

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };


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
                       setFileList(data.photos.map(e=>{return {'uid': e.id,'status': 'done','url': FILE_URL+e.photo }}))
                    }).catch(err=>{
                        //console.log(err?.response?.statusText);
                        showMessage(err?.response?.data?.message, MESSAGE_TYPE.ERROR);
                    })
                }
            }
        },[openModal])

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
            createVehicle(form).then(res=>{
                queryClient.invalidateQueries('cars');
                showMessage('Vozilo je uspjesno kreirano!', MESSAGE_TYPE.SUCCESS);
                setOpenModal({});
                setFileList([]);
                setIsLoading(false);
            }).catch(err=>{
                showMessage(err?.response?.data?.message, MESSAGE_TYPE.ERROR);
                setIsLoading(false);
            })
        }else {
            updateVehicle(openModal.id, form).then(res=>{
                queryClient.invalidateQueries('cars');
                showMessage('Vozilo je uspjesno izmjenjeno!', MESSAGE_TYPE.SUCCESS);
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
    const onFinishStep2 = (data) => {
        if(fileList.length > 0 && fileList.length <= 5){
            next();
        }else{
            showMessage('Morate postaviti makra jednu fotografju, maksimalno pet', MESSAGE_TYPE.ERROR);
        }
    }

    const footer =  [
        <Button disabled={isLoading} className="login-form-button" key='cancel' onClick={handleCancel}>
            Odustani
        </Button>,

        <Button loading={isLoading} disabled={current!==2} type="primary" key="ok" icon={<SaveOutlined />} onClick={onSave} className="login-form-button">
            Sacuvaj
        </Button>
    ]

    return (
        <>
            <Modal title={title} visible={openModal.open &&(openModal.mode===FORM_MODE.EDIT || openModal.mode===FORM_MODE.CREATE)} onCancel={handleCancel} footer={footer} >
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
                            <ArrowLeftOutlined /> Previous
                        </Button>
                    )}
                    {current < steps.length - 1 && (current===0?
                        <Button loading={isLoading} type="primary" form="edit-car-form" htmlType="submit" className="login-form-button">
                            Next <ArrowRightOutlined />
                        </Button>:
                        <Button type="primary" onClick={onFinishStep2}>
                            Next <ArrowRightOutlined />
                        </Button>
                    )}
                </div>

            </Modal>
        </>
    );
};

export default StepFormModal;