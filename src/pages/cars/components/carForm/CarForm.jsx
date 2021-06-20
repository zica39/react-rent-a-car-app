import React, {useEffect, useState} from "react";
import {Form} from "antd";
import FormInput from "../../../../components/formInput/FormInput";
import {INPUT_TYPE,CAR_MIN_YEAR} from "../../../../constants/config";
import {getVehicleTypes} from "../../../../services/cars";
import {_} from "../../../../functions/tools";
import PropTypes from 'prop-types';

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
            label:_('plate_no'),
            required:true,
            input_params:{
                placeholder:_('plate_no_placeholder'),
                disabled:disabled
            },
            tooltip:"Tablice su formata XX-XXNNN"
        }} errors={errors} control={control}/>

        <FormInput data={{
            type: INPUT_TYPE.NUMBER,
            name:'production_year',
            label:_('production_year'),
            required:true,
            input_params: {
                min: CAR_MIN_YEAR,
                max: (new Date()).getFullYear(),
                step: 1,
                disabled:disabled,
                placeholder:_('production_year_placeholder'),
                style:{width:'100%'}
            }
        }} errors={errors} control={control}/>

        <FormInput data={{
            type:INPUT_TYPE.SELECT,
            name:'car_type_id',
            label:_('car_type'),
            required:true,
            input_params:{
                placeholder:_('car_type_placeholder'),
                disabled:disabled
            },
            options:carTypeOptions
        }} errors={errors} control={control}/>

        <FormInput data={{
            type: INPUT_TYPE.NUMBER,
            name:'no_of_seats',
            label:_('no_of_seats'),
            required:true,
            disabled:disabled,
            input_params:{
                disabled:disabled,
                placeholder:_('no_of_seats_placeholder'),
                min:2,
                max:10,
                step:1,
                style:{width:'100%'}
            }

        }} errors={errors} control={control}/>

        <FormInput data={{
            type: INPUT_TYPE.NUMBER,
            name:'price_per_day',
            label:_('price_per_day'),
            required:true,
            disabled:disabled,
            input_params:{
                disabled:disabled,
                placeholder:_('price_per_day_placeholder'),
                min:0,
                formatter:value => `${value}€`,
                parser:value => value.replace('€', ''),
                style:{width:'100%'}
            }

        }} errors={errors} control={control}/>

        <FormInput data={{
            type: INPUT_TYPE.TEXTAREA,
            name:'remarks',
            label:_('remarks'),
            required:false,
            input_params:{
                placeholder:_('remarks_placeholder'),
                allowClear:true,
                disabled:disabled
            }
        }} errors={errors} control={control}/>

    </Form>
}
CarForm.propTypes = {
    onFinish: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    control: PropTypes.object.isRequired,
    disabled: PropTypes.bool
}

export default CarForm;