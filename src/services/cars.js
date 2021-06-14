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

export const getAvailableVehicles = (start_date,end_date,car_type) => {
    let params = {}
    params.car_type = car_type;
    params.start_date = start_date?start_date:'1900-01-01';
    params.end_date = end_date?end_date:'2100-01-01';

    return axiosInstance.get('/cars-available',{
        params:params,
        headers:{'Authorization': getToken()}
    });
}

export const createVehicle = (data) => {
    return axiosInstance.post('/vehicle',data,{
        headers:{
            'Authorization': getToken(),
            'Content-Type': "multipart/form-data; charset=utf-8; boundary=" + Math.random().toString().substr(2)
        },
    });
}

export const updateVehicle = (id,data) => {
    return axiosInstance.post('/vehicle-update/'+id,data,{
        headers:{
            'Authorization': getToken(),
        },
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

export const getVehicleTypes = () => {
    return axiosInstance.get('/car-types',{
        headers:{'Authorization': getToken()}
    });
}