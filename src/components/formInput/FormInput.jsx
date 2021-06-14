import {Controller} from "react-hook-form";
import {Form, Input, InputNumber, Select, Tooltip,DatePicker} from "antd";
import {InfoCircleOutlined} from "@ant-design/icons";
import React from "react";
import {INPUT_TYPE} from "../../constants/config";
import {AsyncPaginate} from "react-select-async-paginate";

const FormInput = ({data:{name,type,
    label,required,icon,tooltip,defaultValue,
    input_params, helper_params, options},errors,control,setValue}) => {

    return <Form.Item
        validateStatus={errors && errors[name] ? 'error' : ''}
        help={errors[name]?.message}
        label={label}
        htmlFor={name}
        required={required}
    >
        <Controller
            name={name}
            control={control}
            render={({ field }) => {
                switch(type){
                    case INPUT_TYPE.TEXT:
                        return <Input
                            {...field}
                            prefix={icon?icon:''}
                            {...input_params}
                            id={name}
                            suffix={tooltip?
                                <Tooltip title={tooltip?tooltip:''}>
                                    <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                </Tooltip>:''
                            }
                        />
                    case INPUT_TYPE.NUMBER:
                        return <InputNumber
                            {...field}
                            prefix={icon?icon:''}
                            {...input_params}
                            defaultValue={defaultValue}
                            id={name}
                            suffix={tooltip?
                                <Tooltip title={tooltip?tooltip:''}>
                                    <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                </Tooltip>:''
                            }
                        />
                    case INPUT_TYPE.SELECT:
                       return <Select
                            {...field}
                            defaultValue={defaultValue}
                            {...input_params}
                            id={name}
                        >
                            {options.map((option,index) => {
                                return  <Select.Option key={index} value={option.value}>{option.label}</Select.Option>
                            })}

                        </Select>

                    case INPUT_TYPE.SELECT_ASYNC:

                        return <div>
                            <AsyncPaginate
                            defaultValue={defaultValue}
                            additional={{
                                page: 1,
                            }}
                            onChange={(e)=>{
                                setValue(name,e.value,{shouldValidate:true,shouldDirty:true,shouldTouch:true});
                            }}
                            {...helper_params}
                        />
                            <input type="hidden" id={name} {...field} {...input_params} />
                        </div>

                    case INPUT_TYPE.TEXTAREA:
                       return <Input.TextArea
                            {...field}
                            id={name}
                            {...input_params}
                            suffix={tooltip?
                                <Tooltip title={tooltip?tooltip:''}>
                                    <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                </Tooltip>:''
                            }
                        />
                    case INPUT_TYPE.DATE:
                        return <DatePicker
                            {...field}
                            id={name}
                            {...input_params}
                        />
                    case INPUT_TYPE.PASSWORD:
                        return <Input.Password
                            {...field}
                            prefix={icon?icon:''}
                            {...input_params}
                            id={name}
                            suffix={tooltip?
                                <Tooltip title={tooltip?tooltip:''}>
                                    <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                </Tooltip>:''
                            }
                        />
                        default:
                            return <></>
            }

            }}
        />
    </Form.Item>
}

export default FormInput;