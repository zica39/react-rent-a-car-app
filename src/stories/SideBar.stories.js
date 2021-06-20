import React from 'react';
import SideBar from "../components/sideBar/SideBar";
import {BrowserRouter} from "react-router-dom";

export default {
    title: 'Components/SideBar',
    component: SideBar,
};

const Template = (args) =>  <BrowserRouter><SideBar {...args} /></BrowserRouter>;

export const Primary = Template.bind({});