import React from 'react';
import NavbarTop from "../components/navbarTop/NavbarTop";
import {BrowserRouter} from "react-router-dom";

export default {
  title: 'Example/Header',
  component: NavbarTop,
};

const Template = (args) => <BrowserRouter><NavbarTop {...args} /></BrowserRouter>;

export const navBar = Template.bind({});

