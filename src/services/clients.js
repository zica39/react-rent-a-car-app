import axiosInstance from "./axios";
import {getToken} from "../functions/tools";

export const getClients = (search) => {
    let params = {}
    if(search)params.search = search;

    return axiosInstance.get('/clients',{
        params:params,
        headers:{'Authorization': getToken()}
    });
}