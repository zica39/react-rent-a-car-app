import React from 'react';
import ChangePassword from "../components/changePassword/ChangePassword";
import {BrowserRouter} from "react-router-dom";

export default {
    title: 'Components/ChangePassword',
    component: ChangePassword,
};

const Template = (args) =>  <BrowserRouter><ChangePassword {...args} /></BrowserRouter>;

export const Primary = Template.bind({});
