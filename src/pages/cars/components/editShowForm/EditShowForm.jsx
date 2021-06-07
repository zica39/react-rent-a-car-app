import React from "react";
import {Form} from "antd";
import FormInput from "../../../../components/formInput/FormInput";
import {INPUT_TYPE,CAR_MIN_YEAR} from "../../../../constants/config";

const EditShowForm = ({onFinish,handleSubmit,errors,control,disabled}) => {

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
            name:'car_plates',
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
            name:'year',
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
            name:'type',
            label:'Tip vozila',
            required:true,
            input_params:{
                placeholder:"Izaberite tip vozila",
                disabled:disabled
            },
            options:[{label: 'Luksuzno',value: '1'},{label: 'Sportsko',value:2}]
        }} errors={errors} control={control}/>

        <FormInput data={{
            type: INPUT_TYPE.NUMBER,
            name:'seats_number',
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
            name:'price',
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
            name:'remark',
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

export default EditShowForm;