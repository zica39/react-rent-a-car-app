import React,{useState} from "react";
import {Layout, Menu} from "antd";
import {CalendarOutlined, CarOutlined, UserOutlined} from "@ant-design/icons";

/*const { SubMenu } = Menu;*/
const {  Sider } = Layout;

const SideBar = () => {

    const[collapsed, setCollapsed] = useState(false);

    return <Sider width={200} collapsible collapsed={collapsed} onCollapse={(collapsed)=>setCollapsed(collapsed)} className="site-layout-background">
        <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            /*defaultOpenKeys={['sub1']}*/
            style={{ height: '100%', borderRight: 0 }}
            theme="dark"
        >
            <Menu.Item key="1" icon={<UserOutlined />} >Korisnici</Menu.Item>
            <Menu.Item key="2" icon={<CarOutlined />}>Vozila</Menu.Item>
            <Menu.Item key="3" icon={<CalendarOutlined />}>Rezervacije</Menu.Item>
        </Menu>
    </Sider>
}

export  default SideBar;