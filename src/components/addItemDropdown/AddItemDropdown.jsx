import {Button, Dropdown, Menu} from "antd";
import {CalendarOutlined, CarOutlined, DownOutlined, PlusSquareOutlined, UserOutlined} from "@ant-design/icons";
import React from "react";

const AddItemDropdown = () => {

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

    return <Dropdown overlay={menu}>
        <Button icon={ <PlusSquareOutlined />}>
            Dodaj <DownOutlined />
        </Button>
    </Dropdown>

}

export default AddItemDropdown;