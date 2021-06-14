import axiosInstance from "./axios";
import {dataToOptions, getToken} from "../functions/tools";

export async function getClients (queryKey) {
    //console.log(queryKey)
    const page = queryKey?.pageParam || 1;
    const search = queryKey?.queryKey[1];
    const res = await axiosInstance.get('/clients',{
        params: {search:search,page:page},
        headers:{'Authorization': getToken()}
    });

    return {
        items: res?.data?.data,
        page: res?.data?.current_page,
        last_page:res?.data?.last_page
    }
}

export const createClient = (data) => {
    return axiosInstance.post('/user-store',data,{
        headers:{'Authorization': getToken()},
    });
}

export const getClient = (id) => {
    return axiosInstance.get('/user-show/'+id,{
        headers:{'Authorization': getToken()}
    });
}

export const updateClient = (id,data) => {
    return axiosInstance.post('/user-update/'+id,data,{
        headers:{
            'Authorization': getToken(),
        },
    });
}

export const deleteClient = (id) => {
    return axiosInstance.delete('/user-delete/'+id,{
        headers:{'Authorization': getToken()}
    });
}

export const getCountries = () => {
    return axiosInstance.get('/countries',{
        headers:{'Authorization': getToken()}
    });
}

export async function getClientsOptions (search, loadedOptions, { page }) {
    const res = await axiosInstance.get('/clients',{
        params: {page:page},
        headers:{'Authorization': getToken()}
    });

    return {
        options: dataToOptions(res?.data?.data),
        hasMore: res?.data?.current_page < res?.data?.last_page,
        additional: {
            page: page + 1,
        },
    }
}
