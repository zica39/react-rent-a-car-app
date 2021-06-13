import {Avatar,Typography} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {auth, removeAuth, showMessage} from "../../functions/tools";
import {useEffect} from "react";
import {me, refresh} from "../../services/auth";
import axios from "axios";
import {useHistory} from "react-router-dom";
import {MESSAGE_TYPE} from "../../constants/config";

const UserInfo = () => {
    const ourRequest = axios.CancelToken.source();
    const history = useHistory();

    useEffect(()=>{
        me(auth()?.token).then((r)=>{
                console.log(3)
            }).catch(err=>{
                if(err?.response?.status === 401){
                    showMessage('Istekao je token,...',MESSAGE_TYPE.WARNING);
                    console.log(err?.response)
                    removeAuth();
                    history.push('/login');
                }else{
                    showMessage('Problemi sa internet konekcijom,...',MESSAGE_TYPE.WARNING);
                }
            });
        return () => {
            ourRequest.cancel();
        }
    },[ourRequest]);

    const name = auth()?.name;
    return <>
        <Typography.Text style={{color:'white',textTransform:'capitalize'}}>{name} </Typography.Text>
        <Avatar icon={<UserOutlined />} />
        </>
}

export default UserInfo;