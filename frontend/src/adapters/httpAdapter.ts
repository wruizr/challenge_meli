import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { handleError } from '../utils/errorHandler'

class HttpAdapter {
    private axiosInstance: AxiosInstance

    constructor(baseURL: string) {
        this.axiosInstance = axios.create({
            baseURL,
        })
    }

    async get<T>(url: string): Promise<T> {
        try {
            const response: AxiosResponse<T> = await this.axiosInstance.get(url)
            return response.data
        } catch (error) {
            throw handleError(error, 'HTTP GET solicitud fallida')
        }
    }

    async post<T>(url: string, data: any): Promise<T> {
        try {
            const response: AxiosResponse<T> = await this.axiosInstance.post<T>(url, data);
            return response.data;
        } catch (error) {
            throw handleError(error, 'HTTP POST solicitud fallida');
        }
    }
}

export default HttpAdapter