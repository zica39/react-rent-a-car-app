import React from 'react';
import BreadcrumbNav from "../components/breadcrumbNav/BreadcrumbNav";
import {BrowserRouter} from "react-router-dom";

export default {
    title: 'Components/BreadcrumbNav',
    component: BreadcrumbNav,
};

const Template = (args) =>  <BrowserRouter><BreadcrumbNav {...args} /></BrowserRouter>;

export const Primary = Template.bind({});
