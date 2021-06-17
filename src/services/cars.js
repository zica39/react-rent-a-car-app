import axiosInstance from "./axios";
import {getToken} from "../functions/tools";

export async function getVehicles (queryKey) {
    //console.log(queryKey)
    const page = queryKey?.pageParam || 1;
    const search = queryKey?.queryKey[1];
    const res = await axiosInstance.get('/vehicles',{
        params: {search:search,page:page},
        headers:{'Authorization': getToken()}
    });

    return {
        items: res?.data?.data,
        page: res?.data?.current_page,
        last_page:res?.data?.last_page
    }
}

export async function getAvailableVehicles (queryKey) {
    //console.log(queryKey)
    const page = queryKey?.pageParam || 1;
    const search = queryKey?.queryKey[1];
    const res = await axiosInstance.get('/cars-available',{
        params: {...search,page:page},
        headers:{'Authorization': getToken()}
    });

    return {
        items: res?.data?.data,
        page: res?.data?.current_page,
        last_page:res?.data?.last_page
    }
}

export const getAvailableVehicles1 = (start_date,end_date,car_type) => {
   // console.log(start_date,end_date,car_type)
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