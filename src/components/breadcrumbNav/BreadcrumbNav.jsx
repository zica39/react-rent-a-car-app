import {Breadcrumb} from "antd";
import {useLocation,Link} from 'react-router-dom';
import {toTitleCase} from "../../functions/tools";

const BreadcrumbNav = () => {

    const location = useLocation();

    const path = location.pathname.split('/');

    return <Breadcrumb style={{ margin: '5px 0' , display:'flex', justifyContent:'start', background:'#d9d9d9',padding:'0 5px' }}>
        {Array(path.length).fill('').map((item,index)=>{
            return <Breadcrumb.Item key={index}>
                <Link to={path.slice(0,index+1).join('/')}>
                    {(index===0)?'Home':toTitleCase(path[index])}
                </Link>
            </Breadcrumb.Item>
        })}
    </Breadcrumb>
}

export default  BreadcrumbNav;