import { Result, Button } from 'antd';
import {Link} from 'react-router-dom'
import {_} from "../../functions/tools";

const Forbidden = () => {

    return <Result
        status="403"
        title="403"
        subTitle={_('403')}
        extra={<Button type="primary"><Link to="/">{_('back_home')}</Link></Button>}
    />
}

export default Forbidden;