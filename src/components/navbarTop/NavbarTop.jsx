import React from 'react';
import {useHistory} from 'react-router-dom';
import {auth,removeAuth} from "../../functions/tools";
import {ROLES} from "../../constants/config";
import {Menu,Layout} from "antd";
import LanguageSelect from "../languageSelect/LanguageSelect";
import {LogoutOutlined} from '@ant-design/icons';

import Logo from "../logo/Logo";
import UserInfo from "../userInfo/UserInfo";
import AddItemDropdown from "../addItemDropdown/AddItemDropdown";
const {Header} = Layout;

const NavbarTop = () => {

    const history = useHistory();
    return <Header className="header" >
        <Logo/>
        <Menu selectable={false} mode="horizontal" theme="dark">
            {auth()?.role === ROLES.EMPLOYEE && <Menu.Item key="1"> <AddItemDropdown/> </Menu.Item>}
            <Menu.Item key="2" style={{float:"right"}}
                       icon={<LogoutOutlined />}
                       onClick={()=>{removeAuth();history.push('/login')}}>
                Odjavi se
            </Menu.Item>
            <Menu.Item key="3" style={{float:"right"}}> <LanguageSelect/> </Menu.Item>
            <Menu.Item key="4" style={{float:"right"}}> <UserInfo/> </Menu.Item>
        </Menu>

    </Header>
}

export default NavbarTop;