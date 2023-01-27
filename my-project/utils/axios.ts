import axios, { AxiosInstance } from 'axios'

export const axiosInstance = axios.create({
    baseURL: "http://localhost:5000",
    timeout: 1000,
    validateStatus: (status) => status < 500,
    headers: {
        "content-type": "application/json"
    }
})

export const tokenAxiosInstance = (token: string): AxiosInstance => {
    axiosInstance.interceptors.request.use(function (config: any) {
        if (!config || !config?.headers) return {}

        config.headers["token"] = token
        return config;
    }, function (error) {
        return Promise.reject(error);
    });
    return axiosInstance
}
