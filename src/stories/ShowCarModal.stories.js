import React from 'react';
import ShowCarModal from "../pages/cars/components/showCarModal/ShowCarModal";
import {FORM_MODE} from "../constants/config";

export default {
    title: 'Modals/ShowCarModal',
    component: ShowCarModal
};

const Template = (args) =>  <ShowCarModal {...args} />;

export const Default = Template.bind({});
Default.args = {
    openModal:{
        'open': true,
        'mode': FORM_MODE.SHOW,
        'id': 1
    },
    title:'Modal'
};