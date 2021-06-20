import {Col, Collapse, Input, Row} from "antd";
import {_} from "../../../../functions/tools";
import FormInput from "../../../../components/formInput/FormInput";
import {INPUT_TYPE} from "../../../../constants/config";
import React from "react";
import PropTypes from "prop-types";

const EquipmentGroup = ({equipment,errors,control}) => {

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