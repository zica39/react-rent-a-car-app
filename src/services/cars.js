import axiosInstance from "./axios";
import {getToken} from "../functions/tools";

export const getVehicles = (search) => {
    let params = {}
    if(search)params.search = search;

    return axiosInstance.get('/vehicles',{
        params:params,
        headers:{'Authorization': getToken()}
    });
}

export const createVehicle = (data) => {
    return axiosInstance.post('/vehicle',data,{
        headers:{'Authorization': getToken()},
    });
}

export const updateVehicle = (id,data) => {
    return axiosInstance.post('/vehicle-update/'+id,data,{
        headers:{'Authorization': getToken()},
    });
}

export const getVehicle = (id) => {
    return axiosInstance.get('/vehicle-show/'+id,{
        headers:{'Authorization': getToken()}
    });
}

export const deleteVehicle = (id) => {
    return axiosInstance.delete('/vehicle-delete/'+id,{
        headers:{'Authorization': getToken()}
    });
}

