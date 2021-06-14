import React, {useEffect, useState} from "react";
import {Form} from "antd";
import FormInput from "../../../../components/formInput/FormInput";
import {INPUT_TYPE,CAR_MIN_YEAR} from "../../../../constants/config";
import {getVehicleTypes} from "../../../../services/cars";


const CarForm = ({onFinish,handleSubmit,errors,control,disabled}) => {

    const [carTypeOptions,setCarTypeOptions] = useState([]);
    useEffect(()=>{
        getVehicleTypes().then(res=>{
            let data = res?.data?.data;
            setCarTypeOptions(data.map(e=>Object({value:e.id,label:e.name})));
        });
    },[]);

    return  <Form
        id="edit-car-form"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        layout="horizontal"
        initialValues={{ }}
        onFinish={handleSubmit(onFinish)}
        onValuesChange={()=>{}}
        size="default"
    >
        <FormInput data={{
            type: INPUT_TYPE.TEXT,
            name:'plate_no',
            label:'Tablice',
            required:true,
            input_params:{
                placeholder:"Unesite broj tablica",
                disabled:disabled
            },
            tooltip:"Tablice su formata XX-XXNNN"
        }} errors={errors} control={control}/>

        <FormInput data={{
            type: INPUT_TYPE.NUMBER,
            name:'production_year',
            label:'Godina',
            required:true,
            input_params: {
                min: CAR_MIN_YEAR,
                max: (new Date()).getFullYear(),
                step: 1,
                disabled:disabled,
                placeholder:"Unesite godinu proizvodnje",
                style:{width:'100%'}
            }
        }} errors={errors} control={control}/>

        <FormInput data={{
            type:INPUT_TYPE.SELECT,
            name:'car_type_id',
            label:'Tip vozila',
            required:true,
            input_params:{
                placeholder:"Izaberite tip vozila",
                disabled:disabled
            },
            options:carTypeOptions
        }} errors={errors} control={control}/>

        <FormInput data={{
            type: INPUT_TYPE.NUMBER,
            name:'no_of_seats',
            label:'Broj sjedista',
            required:true,
            disabled:disabled,
            input_params:{
                disabled:disabled,
                placeholder:"Unesite broj sjedista",
                min:0,
                max:10,
                step:1,
                style:{width:'100%'}
            }

        }} errors={errors} control={control}/>

        <FormInput data={{
            type: INPUT_TYPE.NUMBER,
            name:'price_per_day',
            label:'Cijena',
            required:true,
            disabled:disabled,
            /*tooltip:'Cijena po danu',*/
            input_params:{
                disabled:disabled,
                placeholder:"Unesite cijenu po danu",
                min:0,
                formatter:value => `${value}€`,
                parser:value => value.replace('€', ''),
                style:{width:'100%'}
            }

        }} errors={errors} control={control}/>

        <FormInput data={{
            type: INPUT_TYPE.TEXTAREA,
            name:'remarks',
            label:'Napomena',
            required:false,
            input_params:{
                placeholder:"Napomena...",
                allowClear:true,
                disabled:disabled
            }
        }} errors={errors} control={control}/>

    </Form>
}

export default CarForm;