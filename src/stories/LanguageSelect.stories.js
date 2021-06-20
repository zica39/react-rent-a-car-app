import React from 'react';
import LanguageSelect from "../components/languageSelect/LanguageSelect";

export default {
    title: 'Components/LanguageSelect',
    component: LanguageSelect,
};

const Template = (args) =>  <LanguageSelect {...args} />;

export const Primary = Template.bind({});
