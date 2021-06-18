import { Result, Button } from 'antd';
import {Link} from 'react-router-dom'
import {_} from "../../functions/tools";

const NotFound = () => {

    return <Result
        status="404"
        title="404"
        subTitle={_('404')}
        extra={<Button type="primary"><Link to="/">{_('back_home')}</Link></Button>}
    />
}

export default NotFound;