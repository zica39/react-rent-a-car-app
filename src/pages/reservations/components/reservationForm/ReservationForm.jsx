import React, {useEffect, useState} from "react";
import {Form} from "antd";
import FormInput from "../../../../components/formInput/FormInput";
import {INPUT_TYPE} from "../../../../constants/config";
import {getEquipment, getLocations} from "../../../../services/reservations";
import {_} from "../../../../functions/tools";
import EquipmentGroup from "../equipmentGroup/EquipmentGroup";
import InputDate from "../inputDate/InputDate";
import {getClientsOptions} from "../../../../services/clients";
import PropTypes from "prop-types";
import {AsyncPaginate} from "react-select-async-paginate";
import {Controller} from "react-hook-form";

const ReservationForm = ({onFinish,handleSubmit,errors,control,getValues,setValue,isCreate,pricePerDay,openModal}) => {

    const [equipment,setEquipment] = useState([]);
    const [locationOptions,setLocationOptions] = useState([]);
    const [select,setSelect] = useState('');

    useEffect(()=>setSelect(''),[openModal]);

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
        id="reservation-form"
        labelCol={{ span: 12 }}
        wrapperCol={{ span: 17 }}
        layout="horizontal"
        onFinish={handleSubmit(onFinish)}
        size="default"
    >
        {isCreate?
            <Form.Item
                validateStatus={errors && errors['client_id'] ? 'error' : ''}
                help={errors['client_id']?.message}
                label={_('client')}
                htmlFor={'client_id'}
                required={true}
            >
                <Controller
                    name={'client_id'}
                    control={control}
                    render={() => {
                        return <AsyncPaginate
                            placeholder={_('select_client')}
                            value={select}
                            loadOptions={getClientsOptions}
                            additional={{
                                page: 1,
                            }}
                            onChange={(e)=>{
                                setSelect(e)
                                setValue('client_id',e.value,{shouldValidate:true,shouldDirty:true,shouldTouch:true});
                            }}

                        />
                    }}
                />
            </Form.Item>:
            <FormInput data={{
                type: INPUT_TYPE.TEXT,
                name:'client',
                label:_('client'),
                required:false,
                input_params:{
                    disabled:true,
                    style:{width:'100%',color:'black'}
                },
            }} errors={errors} control={control}/>}

        <FormInput data={{
            type: INPUT_TYPE.TEXT,
            name:'vehicle',
            label:_('vehicle'),
            required:false,
            input_params:{
                disabled:true,
                style:{width:'100%',color:'black'}
            },
        }} errors={errors} control={control}/>

        <InputDate isFrom={true} control={control} errors={errors} setValue={setValue} getValues={getValues} pricePerDay={pricePerDay}/>
        <InputDate isFrom={false} control={control} errors={errors} setValue={setValue} getValues={getValues} pricePerDay={pricePerDay} />

        <FormInput data={{
            type:INPUT_TYPE.SELECT,
            name:'rent_location_id',
            label:_("rent_location"),
            required:true,
            input_params:{
                placeholder:_("rent_location_placeholder")
            },
            options:locationOptions
        }} errors={errors} control={control}/>

        <FormInput data={{
            type:INPUT_TYPE.SELECT,
            name:'return_location_id',
            label:_("return_location"),
            required:true,
            input_params:{
                placeholder:_("return_location_placeholder")
            },
            options:locationOptions
        }} errors={errors} control={control}/>

        <EquipmentGroup equipment={equipment} errors={errors} control={control} setValue={setValue} getValues={getValues} />

        <FormInput data={{
            type: INPUT_TYPE.NUMBER,
            name:'total_price',
            label:_('reservation_total_price'),
            /* required:true,*/
            input_params:{
                disabled:false,
                readOnly:true,
                min:0,
                formatter:value => `${value}€`,
                parser:value => value.replace('€', ''),
                style:{width:'100%',color:'black',marginTop:5}
            }
        }} errors={errors} control={control}/>


    </Form>
}
ReservationForm.propTypes = {
    onFinish: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    control: PropTypes.object.isRequired,
    getValues: PropTypes.func.isRequired,
    setValue: PropTypes.func.isRequired,
    isCreate: PropTypes.bool.isRequired,
    pricePerDay: PropTypes.number
}

export default ReservationForm;