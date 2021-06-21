import React from 'react';
import ImagePreview from "../components/imagePreview/ImagePreview";

export default {
    title: 'Components/ImagePreview',
    component: ImagePreview,
};

const Template = (args) =>  <div><ImagePreview {...args} /></div>

export const Default = Template.bind({});
Default.args = {
    photos:[]
};