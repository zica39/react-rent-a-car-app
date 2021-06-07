import React from 'react';
import { PageHeader} from 'antd';

import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {useHistory} from "react-router-dom";
import CreateClientForm from "./components/createClientForm/CreateClientForm";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const passportRegExp = new RegExp("^[A-Z0-9.,/ $@()]+$");

const schema = yup.object().shape({
    email: yup.string().email().required(),
    firstname:yup.string().min(3).max(255),
    lastname:yup.string().min(3).max(255),
    country:yup.string().required(),
    id_card:yup.string().min(9).max(9).matches(passportRegExp, 'Passport is not yet valid.'),
    phone:yup.string().matches(phoneRegExp, 'Phone number is not valid'),
    remark:yup.string().max(500)

});

const CreateClient = () => {

    const {formState: { errors }, handleSubmit, control,reset} = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        resolver: yupResolver(schema),
        defaultValues:{
            firstname:'',
            lastname:'',
            country: '',
            id_card:'',
            phone:'',
            email:'',
            remark:'',
        }
    });
    const history = useHistory();

    const onFinish = values => {
        console.log('Received values of form: ', values);
       // history.push('/clients');

    };

    return (
        <>
            <PageHeader
                className="site-page-header"
                title="Create new client"
               /* breadcrumb={{ routes }}*/
               /* subTitle="This is a subtitle"*/
            />

           <CreateClientForm onFinish={onFinish} errors={errors} control={control} handleSubmit={handleSubmit} />
        </>
    );

}

export default CreateClient;