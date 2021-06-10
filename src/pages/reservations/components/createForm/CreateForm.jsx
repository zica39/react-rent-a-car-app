import React, {useEffect, useState} from "react";
import {Form} from "antd";
import FormInput from "../../../../components/formInput/FormInput";
import {INPUT_TYPE} from "../../../../constants/config";
import {getLocations} from "../../../../services/reservations";
import {getClients} from "../../../../services/clients";

const CreateForm = ({onFinish,handleSubmit,errors,control}) => {

    const [locationOptions,setLocationOptions] = useState([]);
    const [clientOptions,setClientOptions] = useState([]);
    useEffect(()=>{
        getLocations().then(res=>{
            let data = res?.data;
            setLocationOptions(data.map(e=>Object({value:e.id,label:e.name})));
        });
        getClients().then(res=>{
            let data=res?.data?.data;
            setClientOptions(data.map(e=>Object({value:e.id,label:e.name})));
        })
    },[]);

    return  <Form
        id="create-reservation-form"
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 17 }}
        layout="horizontal"
        initialValues={{ }}
        onFinish={handleSubmit(onFinish)}
        onValuesChange={()=>{}}
        size="default"
    >
        <FormInput data={{
            type: INPUT_TYPE.TEXT,
            name:'vehicle',
            label:'Vozilo',
            required:false,
            input_params:{
                disabled:true,
                style:{width:'100%',color:'black'}
            },
        }} errors={errors} control={control}/>

        <FormInput data={{
            type:INPUT_TYPE.SELECT,
            name:'client_id',
            label:'Klijent',
            required:true,
            input_params:{
                placeholder:"Izaberite klijenta"
            },
            options:clientOptions
        }} errors={errors} control={control}/>

        <FormInput data={{
            type:INPUT_TYPE.DATE,
            name:'from_date',
            label:'Datum od',
            required:true,
            input_params:{
                style:{width:'100%'},
                placeholder:"Izaberite datum od",
                allowClear:true
            }
        }} errors={errors} control={control}/>

        <FormInput data={{
            type:INPUT_TYPE.DATE,
            name:'to_date',
            label:'Datum do',
            required:true,
            input_params:{
                style:{width:'100%'},
                placeholder:"Izaberite datum do",
                allowClear:true
            }
        }} errors={errors} control={control}/>

        <FormInput data={{
            type:INPUT_TYPE.SELECT,
            name:'rent_location_id',
            label:'Lokacija preuzimanja',
            required:true,
            input_params:{
                placeholder:"Izaberite lokaciju preuzimanja"
            },
            options:locationOptions
        }} errors={errors} control={control}/>

        <FormInput data={{
            type:INPUT_TYPE.SELECT,
            name:'return_location_id',
            label:'Lokacija vracanja',
            required:true,
            input_params:{
                placeholder:"Izaberite lokaciju vracanja"
            },
            options:locationOptions
        }} errors={errors} control={control}/>
        <FormInput data={{
            type: INPUT_TYPE.NUMBER,
            name:'total_price',
            label:'Ukupna cijena',
            /* required:true,*/
            input_params:{
                readOnly:true,
                min:0,
                formatter:value => `${value}€`,
                parser:value => value.replace('€', ''),
                style:{width:'100%',color:'black'}
            }
        }} errors={errors} control={control}/>


    </Form>
}

export default CreateForm;