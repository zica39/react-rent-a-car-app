import axiosInstance from "./axios";
import {getToken} from "../functions/tools";

export const getReservations = (search,page) => {
    let params = {}
    if(search)params.search = search;
    if(page)params.page=page;

    return axiosInstance.get('/reservations',{
        params:params,
        headers:{'Authorization': getToken()}
    });
}

export const getReservation = (id) => {
    return axiosInstance.get('/reservation-show/'+id,{
        headers:{'Authorization': getToken()}
    });
}

export const createReservation = (data) => {
    return axiosInstance.post('/reservation-store',data,{
        headers:{'Authorization': getToken()},
    });
}

export const updateReservation = (id,data) => {
    return axiosInstance.post('/reservation-update/'+id,data,{
        headers:{'Authorization': getToken()},
    });
}

export const deleteReservation = (id) => {
    return axiosInstance.delete('/reservation-delete/'+id,{
        headers:{'Authorization': getToken()}
    });
}

export const getLocations = () => {
    return axiosInstance.get('/locations',{
        headers:{'Authorization': getToken()}
    });
}
