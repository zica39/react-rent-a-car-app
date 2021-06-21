import {Col, Collapse, Input, Row} from "antd";
import {_, getEquipmentPrice} from "../../../../functions/tools";
import FormInput from "../../../../components/formInput/FormInput";
import {INPUT_TYPE} from "../../../../constants/config";
import React from "react";
import PropTypes from "prop-types";

const EquipmentGroup = ({equipment,errors,control,getValues,setValue}) => {

    return <Collapse defaultActiveKey={['1']} >
        <Collapse.Panel header={_('equipment')} key="1">
            <Input.Group>
                <Row gutter={12}>
                    {equipment.map((e,i)=>{

                        return  <Col key={i} span={11}><FormInput key={i} data={{
                            type: INPUT_TYPE.NUMBER,
                            name: '_'+e.id,
                            label:e.name,
                            input_params:{
                                onChange:(r) => {
                                    console.log(getValues())
                                    let old_price = (getEquipmentPrice(getValues()));
                                    setValue('_'+e.id, r);
                                    let new_price = (getEquipmentPrice(getValues()));
                                    console.log( new_price - old_price)
                                    let total_price = getValues('total_price');
                                    setValue('total_price', total_price + (new_price - old_price)*(total_price !== 0));
                                },
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
        </Collapse.Panel>
    </Collapse>

}
EquipmentGroup.propType = {
    equipment: PropTypes.array.isRequired,
    errors: PropTypes.object.isRequired,
    control: PropTypes.object.isRequired
}

export default EquipmentGroup;