import React,{useState} from "react";
import {Layout, Menu} from "antd";
import {useHistory,useLocation} from 'react-router-dom';
import {CalendarOutlined, CarOutlined, UserOutlined} from "@ant-design/icons";
import {PAGE_INDEX} from "../../constants/config";
import {_} from "../../functions/tools";

const {  Sider } = Layout;

const SideBar = () => {

    const[collapsed, setCollapsed] = useState(false);
    const history = useHistory();
    const location = useLocation();

    const switchToPage = (path) => {
        history.push(path);
    }

    return <Sider
          width={200}
          collapsible
          collapsed={collapsed}
          onCollapse={(collapsed)=>setCollapsed(collapsed)}
          className="site-layout-background"
    >
        <Menu
            mode="inline"
            defaultSelectedKeys={[PAGE_INDEX[location.pathname]]}
            style={{ height: '100%', borderRight: 0 }}
            theme="dark"
        >
            <Menu.Item key="1" onClick={()=>switchToPage('/clients')} icon={<UserOutlined />} >{_('clients')}</Menu.Item>
            <Menu.Item key="2" onClick={()=>switchToPage('/cars')} icon={<CarOutlined />}>{_('cars')}</Menu.Item>
            <Menu.Item key="3" onClick={()=>switchToPage('/reservations')} icon={<CalendarOutlined />}>{_('reservations')}</Menu.Item>
        </Menu>
    </Sider>
}

export  default SideBar;