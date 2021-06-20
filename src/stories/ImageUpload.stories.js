import React from 'react';
import ImageUpload from "../components/imageUpload/ImageUpload";

export default {
    title: 'Components/ImageUpload',
    component: ImageUpload,
};

const Template = (args) =>  <ImageUpload {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    fileList:[],
    setFileList: ()=>{}
};