import {TranslationOutlined} from "@ant-design/icons";
import {Select} from "antd";
import {LANGUAGE} from "../../constants/config";
import {getLang, setLang, _} from "../../functions/tools";
import {useHistory} from "react-router-dom";

const LanguageSelect = () => {
    const history = useHistory();
    const onChange = (e) => {
        setLang(e);
        history.push(window.location.pathname);
    }
    return <Select
        defaultValue={getLang()}
        suffixIcon={<TranslationOutlined style={{color:'black'}} />}
        onChange={onChange}
    >
        <Select.Option value={LANGUAGE.MNE}>{_('mne')}</Select.Option>
        <Select.Option value={LANGUAGE.EN}>{_('en')}</Select.Option>
    </Select>
}

export default LanguageSelect;