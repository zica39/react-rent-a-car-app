import {LogoutOutlined} from "@ant-design/icons";
import {removeAuth, showMessage} from "../../functions/tools";
import {Button} from "antd";
import {useHistory} from "react-router-dom";
import {logout} from "../../services/auth";
import {MESSAGE_TYPE} from "../../constants/config";
import {useState} from "react";

const LogOut = () => {
    const[isLoading,setIsLoading] = useState(false);
    const history = useHistory();
    const onLogOut = ()=>{
        setIsLoading(true);
        logout().then(()=>{
            removeAuth();
            history.push('/login');
            setIsLoading(false);
        }).catch(()=>{
            showMessage('Problem sa internet konekcijom',MESSAGE_TYPE.WARNING);
            removeAuth();
            history.push('/login');
            setIsLoading(false);
        })

    }
    return <Button
        icon={<LogoutOutlined />}
        onClick={onLogOut}
        disabled={isLoading}
        style={{backgroundColor:'transparent',color:'white',border:'none'}}
    >
        Odjavi se
    </Button>
}

export default LogOut;