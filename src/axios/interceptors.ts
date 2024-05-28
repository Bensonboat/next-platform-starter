import axios, { AxiosError } from "axios";

export interface IAxiosError extends AxiosError {
    data: any;
}

const service = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}`,
    timeout: 1000 * 100,
});

service.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return error.request;
    }
);

service.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // if (error.response.data.code === 499) {
        // alert("Please login first!");
        // window.location.href = "/login";
        // }
        // alert(error.response.data.message);
        // console.log(error.response, "error.response");
        return error.response;
    }
);

export default service;
