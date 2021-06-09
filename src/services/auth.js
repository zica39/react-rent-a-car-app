import axiosInstance from "../services/axios";
import {getToken} from "../functions/tools";

export const login = (data) => {
    return axiosInstance.post('/auth/login',data);
}

export const me = (token) => {
    return axiosInstance.post('/auth/me',{},{
        headers:{'Authorization': 'Bearer '+ token},
    });
}

export const logout = () =>{
    return axiosInstance.post('/auth/logout',{},{
        headers:{'Authorization': getToken()}
    });
}