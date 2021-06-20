import {Avatar,Typography} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {auth, removeAuth, showMessage} from "../../functions/tools";
import {useEffect} from "react";
import {me} from "../../services/auth";
import axios from "axios";
import {useHistory} from "react-router-dom";
import {MESSAGE_TYPE} from "../../constants/config";

const UserInfo = () => {
    const ourRequest = axios.CancelToken.source();
    const history = useHistory();

    useEffect(()=>{
        me(auth()?.token).then(()=>{
                console.log(3)
            }).catch(err=>{
                if(err?.response?.status === 401){
                    showMessage('Istekao je token,...',MESSAGE_TYPE.WARNING);
                    console.log(err?.response)
                    removeAuth();
                    history.push('/login');
                }else{
                    showMessage(err?.response?.data?.message, MESSAGE_TYPE.ERROR);
                }
            });
        return () => {
            ourRequest.cancel();
        }
    },[ourRequest,history]);

    const name = auth()?.name;
    return <>
        <Typography.Text style={{color:'white',textTransform:'capitalize'}}>{name} </Typography.Text>
        <Avatar icon={<UserOutlined />} />
        </>
}

export default UserInfo;