import axiosInstance from "./axios";
import {getToken} from "../functions/tools";

export async function getReservations (queryKey) {
    console.log(queryKey)
    const page = queryKey?.pageParam || 1;
    const search = queryKey?.queryKey[1];
    const res = await axiosInstance.get('/reservations',{
        params: {search:search,page:page},
        headers:{'Authorization': getToken()}
    });

    return {
        items: res?.data?.data,
        page: res?.data?.current_page,
        last_page:res?.data?.last_page
    }
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

export const getEquipment = () => {
    return axiosInstance.get('/equipment',{
        headers:{'Authorization': getToken()}
    });
}
