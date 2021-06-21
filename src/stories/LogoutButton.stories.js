import React from 'react';
import LogoutButton from "../components/logoutButton/LogoutButton";
import {BrowserRouter} from "react-router-dom";

export default {
    title: 'Components/Logout',
    component: LogoutButton,
};

const Template = (args) =>  <BrowserRouter><div style={{backgroundColor:'black',width:'120px'}}><LogoutButton {...args} /></div></BrowserRouter>;

export const Default = Template.bind({});
