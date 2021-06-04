import {GlobalOutlined} from "@ant-design/icons";
import {Select} from "antd";

const LanguageSelect = () => {
    return <Select size="large" defaultValue="CG" suffixIcon={<GlobalOutlined />} style={{background:'black'}}>
        <Select.Option key="1">CG</Select.Option>
        <Select.Option key="2">EN</Select.Option>
    </Select>
}

export default LanguageSelect;