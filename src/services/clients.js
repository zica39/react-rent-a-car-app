import axiosInstance from "./axios";
import {getToken} from "../functions/tools";

export const getClients = (search, page) => {
    let params = {}
    if(search)params.search = search;
    if(page)params.page = page;

    return axiosInstance.get('/clients',{
        params:params,
        headers:{'Authorization': getToken()}
    });
}

export async function getClients1 (queryKey) {
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
    return axiosInstance.post('/create-client',data,{
        headers:{'Authorization': getToken()},
    });
}

export const getCountries = () => {
    return axiosInstance.get('/countries',{
        headers:{'Authorization': getToken()}
    });
}