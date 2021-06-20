import React from 'react';
import Login from "../pages/login/Login";

export default {
  title: 'Example/Login',
  component: Login,
};

const Template = (args) => <Login {...args} />;

export const LoggedIn = Template.bind({});
