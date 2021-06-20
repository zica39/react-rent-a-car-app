import React from 'react';

import AddItemDropdown from "../components/addItemDropdown/AddItemDropdown";
import {BrowserRouter} from "react-router-dom";

export default {
    title: 'Components/AddItemDropdown',
    component: AddItemDropdown,
};

const Template = (args) =>  <BrowserRouter><AddItemDropdown {...args} /></BrowserRouter>;

export const Primary = Template.bind({});
