import React from 'react';
import FormInput from "../components/formInput/FormInput";
import {INPUT_TYPE} from "../constants/config";
import {useForm} from "react-hook-form";

export default {
    title: 'Components/FormInput',
    component: FormInput,
};

const Template = (args) => {

    const {formState: { errors }, control} = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        defaultValues:{
            input_field:''
        }
    });

   return <FormInput {...args} control={control} errors={errors}/>;
}

export const Default = Template.bind({});
Default.args = {
    data:{
        'name': 'input_field',
        'type': INPUT_TYPE.TEXT
    }
};