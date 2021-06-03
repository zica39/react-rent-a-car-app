import React from 'react';
import {Menu , Layout, Select,Dropdown,Button} from "antd";
import { Avatar } from 'antd';
import {
    UserOutlined,LogoutOutlined,GlobalOutlined,
    DownOutlined,PlusSquareOutlined,
    CalendarOutlined, CarOutlined
} from '@ant-design/icons';

import Logo from "../logo/Logo";
const {Header} = Layout;

const NavbarTop = () => {

    const menu = (
        <Menu /*onClick={}*/ theme="dark">
            <Menu.Item key="1" icon={<UserOutlined />}>
                Korisnika
            </Menu.Item>
            <Menu.Item key="2" icon={<CarOutlined />}>
                Vozilo
            </Menu.Item>
            <Menu.Item key="3" icon={<CalendarOutlined />}>
                Rezervaciju
            </Menu.Item>
        </Menu>
    );

    return <Header className="header" >
        <Logo/>
        <Menu
            selectable={false}
            mode="horizontal"
            theme="dark"
        >
            <Menu.Item key="1" >
            <Dropdown overlay={menu}>
                <Button icon={ <PlusSquareOutlined />}>
                    Dodaj <DownOutlined />
                </Button>
            </Dropdown>
            </Menu.Item>
            <Menu.Item key="2" style={{float:"right"}} icon={<LogoutOutlined />}>Odjavi se</Menu.Item>
            <Menu.Item key="3"  style={{float:"right"}}>
                <Select size="large" defaultValue="CG" suffixIcon={<GlobalOutlined />} style={{background:'black'}}>
                    <Select.Option key="1">CG</Select.Option>
                    <Select.Option key="2">EN</Select.Option>
                </Select>
            </Menu.Item>
            <Menu.Item key="4" style={{float:"right"}}>Marko Markovic <Avatar icon={<UserOutlined />} /></Menu.Item>
        </Menu>

    </Header>
}

export default NavbarTop;