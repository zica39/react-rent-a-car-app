import React from 'react';
import {auth} from "../../functions/tools";
import {ROLES} from "../../constants/config";
import {Menu,Layout} from "antd";
import LanguageSelect from "../languageSelect/LanguageSelect";

import Logo from "../logo/Logo";
import UserInfo from "../userInfo/UserInfo";
import AddItemDropdown from "../addItemDropdown/AddItemDropdown";
import ChangePassword from "../changePassword/ChangePassword";
import LogOut from "../logOut/LogOut";
const {Header} = Layout;

const NavbarTop = () => {

    return <Header className="header" >
        <Logo/>
        <Menu selectable={false} mode="horizontal" theme="dark">
            <Menu.Item key="1" style={{background:'none',marginLeft:150}}>{auth()?.role === ROLES.EMPLOYEE ? <AddItemDropdown/>:<ChangePassword/> }</Menu.Item>
            <Menu.Item key="2" style={{float:"right",background:'none',padding:0}}><LogOut/></Menu.Item>
            <Menu.Item key="3" style={{float:"right",background:'none',margin:0}}> <LanguageSelect/> </Menu.Item>
            <Menu.Item key="4" style={{float:"right",background:'none',padding:0}}> <UserInfo/> </Menu.Item>
        </Menu>

    </Header>
}

export default NavbarTop;