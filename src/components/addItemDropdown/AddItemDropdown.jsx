import {Button, Dropdown, Menu} from "antd";
import {CalendarOutlined, CarOutlined, DownOutlined, PlusSquareOutlined, UserOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import React from "react";
import {storeData} from "../../functions/tools";

const AddItemDropdown = () => {

    const menu = (
        <Menu /*onClick={}*/ theme="light">
            <Menu.Item key="1" onClick={()=>storeData('open_modal',true)} icon={<UserOutlined />}>
                <Link to="/clients">Klijenta</Link>
            </Menu.Item>
            <Menu.Item onClick={()=>storeData('open_modal',true)} key="2" icon={<CarOutlined />}>
                <Link to="/cars">Vozilo</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<CalendarOutlined />}>
                <Link to="/reservations/create">Rezervaciju</Link>
            </Menu.Item>
        </Menu>
    );

    return <Dropdown overlay={menu}>
        <Button icon={ <PlusSquareOutlined />}>
            Dodaj <DownOutlined />
        </Button>
    </Dropdown>

}

export default AddItemDropdown;