import {INPUT_TYPE} from "../../../../constants/config";
import {_, getEquipmentPrice} from "../../../../functions/tools";
import FormInput from "../../../../components/formInput/FormInput";
import React from "react";
import PropTypes from "prop-types";

const InputDate = ({isFrom,control,errors,setValue,getValues,pricePerDay}) => {

    return isFrom?
        <FormInput data={{
        type:INPUT_TYPE.DATE,
        name:'from_date',
        label:_('from_date'),
        required:true,
        input_params:{
            style:{width:'100%'},
            placeholder:_("from_date_placeholder"),
            allowClear:true,
            onChange:(e) => {
                let equipment_price = (getEquipmentPrice(getValues()));
                let to_date = getValues('to_date');
                let price_per_day = pricePerDay || getValues('price_per_day');
                let from_date = e;
                if(from_date && to_date){
                    let days =  to_date.diff(from_date, 'days')   // =1

                    if(days>0)setValue('total_price',days*price_per_day + equipment_price)
                    else setValue('total_price',0);
                }else{
                    setValue('total_price',0);
                }
                setValue('from_date',e,{shouldValidate:true,shouldDirty:true,shouldTouch:true})
            }
        }
    }} errors={errors} control={control}/>:

        <FormInput data={{
        type:INPUT_TYPE.DATE,
        name:'to_date',
        label:_('to_date'),
        required:true,
        input_params:{
            style:{width:'100%'},
            placeholder:_("to_date_placeholder"),
            allowClear:true,
            onChange:(e) => {
                let equipment_price = (getEquipmentPrice(getValues()));
                let from_date = getValues('from_date');
                let price_per_day = pricePerDay || getValues('price_per_day');
                let to_date = e;
                if(from_date && to_date){
                    let days =  to_date.diff(from_date, 'days')   // =1

                    if(days>0)setValue('total_price',days*price_per_day + equipment_price)
                    else setValue('total_price',0);
                }else{
                    setValue('total_price',0);
                }
                setValue('to_date',e,{shouldValidate:true,shouldDirty:true,shouldTouch:true})
            }
        }
    }} errors={errors} control={control}/>
}

InputDate.propTypes ={
    isFrom: PropTypes.bool.isRequired,
    control: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    setValue: PropTypes.func.isRequired,
    getValues: PropTypes.func.isRequired,
    pricePerDay: PropTypes.number
}
export default InputDate;