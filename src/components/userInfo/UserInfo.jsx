import {Avatar,Typography} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {auth} from "../../functions/tools";

const UserInfo = () => {

    const name = auth()?.name;
    return <>
        <Typography.Text style={{color:'white',textTransform:'capitalize'}}>{name} </Typography.Text>
        <Avatar icon={<UserOutlined />} />
        </>
}

export default UserInfo;