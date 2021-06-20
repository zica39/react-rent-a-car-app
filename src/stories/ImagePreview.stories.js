import React from 'react';
import ImagePreview from "../components/imagePreview/ImagePreview";

export default {
    title: 'Components/ImagePreview',
    component: ImagePreview,
};

const Template = (args) =>  <div><ImagePreview {...args} /></div>

export const Primary = Template.bind({});
Primary.args = {
    photos:[]
};