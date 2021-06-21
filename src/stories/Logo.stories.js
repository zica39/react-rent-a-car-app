import React from 'react';
import Logo from "../components/logo/Logo";
import {BrowserRouter} from "react-router-dom";

export default {
    title: 'Components/Logo',
    component: Logo,
};

const Template = (args) =>  <BrowserRouter><Logo {...args} /></BrowserRouter>;

export const Default = Template.bind({});
