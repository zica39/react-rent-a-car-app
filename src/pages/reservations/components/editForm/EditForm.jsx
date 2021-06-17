import React, {useEffect, useState} from "react";
import {Col, Form, Input, Row} from "antd";
import FormInput from "../../../../components/formInput/FormInput";
import {INPUT_TYPE} from "../../../../constants/config";
import {getEquipment, getLocations} from "../../../../services/reservations";

const EditForm = ({onFinish,handleSubmit,errors,control,getValues,setValue}) => {

    const [equipment,setEquipment] = useState([]);
    const [locationOptions,setLocationOptions] = useState([]);


    useEffect(()=>{
        getLocations().then(res=>{
          let data = res?.data;
          setLocationOptions(data.map(e=>Object({value:e.id,label:e.name})))
        })
        getEquipment().then(res=>{
            let data = res?.data?.data;
            setEquipment(data.map(e=>Object({id:e.id,name:e.name,max_quantity:e.max_quantity})));
        });
    },[]);

    return  <Form
        id="edit-reservation-form"
        labelCol={{ span: 12 }}
        wrapperCol={{ span: 17 }}
        layout="horizontal"
        initialValues={{ }}
        onFinish={handleSubmit(onFinish)}
        onValuesChange={()=>{}}
        size="default"
    >
        <FormInput data={{
            type: INPUT_TYPE.TEXT,
            name:'client',
            label:'Klient',
            required:false,
            input_params:{
                disabled:true,
                style:{width:'100%',color:'black'}
            },
        }} errors={errors} control={control}/>

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
            type:INPUT_TYPE.DATE,
            name:'from_date',
            label:'Datum od',
            required:true,
            input_params:{
                style:{width:'100%'},
                placeholder:"Izaberite datum od",
                allowClear:true,
                onChange:(e) => {
                    let to_date = getValues('to_date');
                    let price_per_day = getValues('price_per_day');
                    let from_date = e;
                    if(from_date && to_date){
                        let days =  to_date.diff(from_date, 'days')   // =1

                        if(days>0)setValue('total_price',days*price_per_day)
                        else setValue('total_price',0);
                    }else{
                        setValue('total_price',0);
                    }
                    setValue('from_date',e,{shouldValidate:true,shouldDirty:true,shouldTouch:true})
                }
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
                allowClear:true,
                onChange:(e) => {
                    let from_date = getValues('from_date');
                    let price_per_day = getValues('price_per_day');
                    let to_date = e;
                    if(from_date && to_date){
                        let days =  to_date.diff(from_date, 'days')   // =1

                        if(days>0)setValue('total_price',days*price_per_day)
                        else setValue('total_price',0);
                    }else{
                        setValue('total_price',0);
                    }
                    setValue('to_date',e,{shouldValidate:true,shouldDirty:true,shouldTouch:true})
                }
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

        <p>Dodatna oprema:</p>
        <Input.Group>
            <Row gutter={12}>
                {equipment.map((e,i)=>{

                    return  <Col key={i} span={11}><FormInput key={i} data={{
                        type: INPUT_TYPE.NUMBER,
                        name: '_'+e.id,
                        label:e.name,
                        input_params:{
                            max:e.max_quantity,
                            step:1,
                            min:0,
                            placeholder:'0'
                            /* style:{width:'100%',color:'black'}*/
                        }
                    }} errors={errors} control={control}/></Col>
                })}
            </Row>
        </Input.Group>
        <p>Ukupna cijena:</p>
        <FormInput data={{
            type: INPUT_TYPE.NUMBER,
            name:'total_price',
            label:'Ukupna cijena',
           /* required:true,*/
            input_params:{
                disabled:false,
                readOnly:true,
                min:0,
                formatter:value => `${value}€`,
                parser:value => value.replace('€', ''),
                style:{width:'100%',color:'black'}
            }
        }} errors={errors} control={control}/>


    </Form>
}

export default EditForm;