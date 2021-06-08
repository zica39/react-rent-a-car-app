import {TranslationOutlined} from "@ant-design/icons";
import {Select} from "antd";

const LanguageSelect = () => {
    return <Select size="default" defaultValue="CG" suffixIcon={<TranslationOutlined style={{color:'black'}} />}>
        <Select.Option key="1">CG</Select.Option>
        <Select.Option key="2">EN</Select.Option>
    </Select>
}

export default LanguageSelect;