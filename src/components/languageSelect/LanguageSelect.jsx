import {TranslationOutlined} from "@ant-design/icons";
import {Select} from "antd";
import {LANGUAGE} from "../../constants/config";
import {getLang, setLang} from "../../functions/tools";

const LanguageSelect = () => {
    const onChange = (e) => {
        setLang(e);
    }
    return <Select
        defaultValue={getLang()}
        suffixIcon={<TranslationOutlined style={{color:'black'}} />}
        onChange={onChange}
    >
        <Select.Option value={LANGUAGE.MNE}>CG</Select.Option>
        <Select.Option value={LANGUAGE.EN}>EN</Select.Option>
    </Select>
}

export default LanguageSelect;