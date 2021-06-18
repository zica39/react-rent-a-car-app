import {Button, Dropdown, Menu} from "antd";
import {CalendarOutlined, CarOutlined, DownOutlined, PlusSquareOutlined, UserOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import React from "react";
import {storeData,_} from "../../functions/tools";

const AddItemDropdown = () => {

    const menu = (
        <Menu theme="light">
            <Menu.Item key="1" onClick={()=>storeData('open_modal',true)} icon={<UserOutlined />}>
                <Link to="/clients">{_('add_client')}</Link>
            </Menu.Item>
            <Menu.Item onClick={()=>storeData('open_modal',true)} key="2" icon={<CarOutlined />}>
                <Link to="/cars">{_('add_vehicle')}</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<CalendarOutlined />}>
                <Link to="/reservations/create">{_('add_reservation')}</Link>
            </Menu.Item>
        </Menu>
    );

    return <Dropdown overlay={menu}>
        <Button icon={ <PlusSquareOutlined />}>
            {_('add')} <DownOutlined />
        </Button>
    </Dropdown>

}

export default AddItemDropdown;