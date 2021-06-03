import {Breadcrumb} from "antd";

const BreadcrumbNav = () => {

    return <Breadcrumb style={{ margin: '5px 0' , display:'flex', justifyContent:'start' }}>
        <Breadcrumb.Item>Pocetna</Breadcrumb.Item>
        <Breadcrumb.Item>Korisnici</Breadcrumb.Item>
    </Breadcrumb>
}

export default  BreadcrumbNav;