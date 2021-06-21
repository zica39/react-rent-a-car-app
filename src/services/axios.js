import axios from 'axios';
import {BASE_URL} from "../constants/config";
import {auth} from "../functions/tools";

const axiosInstance = axios.create({
    baseURL:BASE_URL
});

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        const originalRequest = error.config;

        // Prevent infinite loops
        if (error.response.status === 401 && originalRequest.url === BASE_URL+'auth/refresh') {
            window.location.href = '/login';
            return Promise.reject(error);
        }

        if (
            error.response.status === 401 &&
            error.response.statusText === "Unauthorized")
        {
            const refreshToken = auth().token;
            console.log(refreshToken)

            if (refreshToken){
                const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));

                // exp date in token is expressed in seconds, while now() returns milliseconds:
                const now = Math.ceil(Date.now() / 1000);
                console.log(tokenParts.exp);

                if (tokenParts.exp > now) {
                    return axiosInstance
                        .post('/auth/refresh', {})
                        .then((response) => {

                            refreshToken(response?.data?.access_token);

                            return axiosInstance(originalRequest);
                        })
                        .catch(err => {
                            console.log(err)
                        });
                }else{
                    console.log("Refresh token is expired", tokenParts.exp, now);
                    window.location.href = '/login';
                }
            }else{
                console.log("Refresh token not available.")
                window.location.href = '/login';
            }
        }


        // specific error handling done elsewhere
        return Promise.reject(error);
    }
);

export default axiosInstance;