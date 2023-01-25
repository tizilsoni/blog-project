import axios, { AxiosInstance } from 'axios'

export const axiosInstance = axios.create({
    baseURL: "http://localhost:5000",
    timeout: 1000,
    validateStatus: (status) => status < 500
})

export const tokenAxiosInstance = (token): AxiosInstance => {
    axiosInstance.interceptors.request.use(function (config) {
        if (!config || !config?.headers) return {}

        config.headers["token"] = token
        return config;
    }, function (error) {
        return Promise.reject(error);
    });
    return axiosInstance
}
