import React from 'react';

import UserInfo from "../components/userInfo/UserInfo";
import 'antd/dist/antd.css';

export default {
    title: 'Components/UserInfo',
    component: UserInfo,
};

const Template = (args) => <span style={{backgroundColor:'black'}}><UserInfo {...args} /></span>;

export const Default = Template.bind({});
