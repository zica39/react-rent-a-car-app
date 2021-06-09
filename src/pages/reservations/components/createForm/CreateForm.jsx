import React from "react";
import {Form} from "antd";
import FormInput from "../../../../components/formInput/FormInput";
import {INPUT_TYPE} from "../../../../constants/config";

const CreateForm = ({onFinish,handleSubmit,errors,control}) => {

    return  <Form
        id="edit-reservation-form"
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 17 }}
        layout="horizontal"
        initialValues={{ }}
        onFinish={handleSubmit(onFinish)}
        onValuesChange={()=>{}}
        size="default"
    >

        <FormInput data={{
            type:INPUT_TYPE.SELECT,
            name:'client',
            label:'Klijent',
            required:true,
            input_params:{
                placeholder:"Izaberite klijenta"
            },
            options:[{label: 'Marko Markovic',value: '1'},{label: 'Janko Jankovic',value: '2'}]
        }} errors={errors} control={control}/>

        <FormInput data={{
            type:INPUT_TYPE.DATE,
            name:'date_from',
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
            name:'date_to',
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
            name:'pick_up_location',
            label:'Lokacija preuzimanja',
            required:true,
            input_params:{
                placeholder:"Izaberite lokaciju preuzimanja"
            },
            options:[{label: 'Aerodrom Podgorica',value: '1'},{label: 'Aerodrom Tivat',value: '2'}]
        }} errors={errors} control={control}/>

        <FormInput data={{
            type:INPUT_TYPE.SELECT,
            name:'return_location',
            label:'Lokacija vracanja',
            required:true,
            input_params:{
                placeholder:"Izaberite lokaciju vracanja"
            },
            options:[{label: 'Aerodrom Podgorica',value: '1'},{label: 'Aerodrom Tivat',value: '2'}]
        }} errors={errors} control={control}/>
        <FormInput data={{
            type: INPUT_TYPE.NUMBER,
            name:'total_price',
            label:'Ukupna cijena',
            /* required:true,*/
            input_params:{
                disabled:true,
                min:0,
                formatter:value => `${value}€`,
                parser:value => value.replace('€', ''),
                style:{width:'100%',color:'black'}
            }
        }} errors={errors} control={control}/>


    </Form>
}

export default CreateForm;