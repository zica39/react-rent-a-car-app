import React from 'react';
import Logout from "../components/logout/Logout";
import {BrowserRouter} from "react-router-dom";

export default {
    title: 'Components/Logout',
    component: Logout,
};

const Template = (args) =>  <BrowserRouter><div style={{backgroundColor:'black',width:'120px'}}><Logout {...args} /></div></BrowserRouter>;

export const Default = Template.bind({});
