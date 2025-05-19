import { BaseQueryFn } from "@reduxjs/toolkit/query/react";
import { AxiosError, AxiosRequestConfig } from "axios";
import axiosInstance from "./axiosConfig";

interface AxiosBaseQueryArgs {
    url: string;
    method: AxiosRequestConfig["method"];
    data?: AxiosRequestConfig["data"];
    params?: AxiosRequestConfig["params"];
    headers?: AxiosRequestConfig["headers"];
}

/**
 * Creates a custom BaseQuery function using Axios
 * This helps integrate axios with RTK Query
 */
export const axiosBaseQuery = (): BaseQueryFn<
    AxiosBaseQueryArgs,
    unknown,
    unknown
> => async ({ url, method, data, params, headers }) => {
    try {
        const result = await axiosInstance({
            url,
            method,
            data,
            params,
            headers,
        });

        return { data: result.data };
    } catch (axiosError) {
        const err = axiosError as AxiosError;
        return {
            error: {
                status: err.response?.status,
                data: err.response?.data || err.message,
            },
        };
    }
};