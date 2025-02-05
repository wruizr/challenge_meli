import { ItemsResponse, ItemDetailResponse } from '../interfaces/backendResponse';
import HttpAdapter from '../adapters/httpAdapter';

const httpAdapter = new HttpAdapter(import.meta.env.VITE_API_BACKEND_URL)

export const getItems = async (query: string): Promise<ItemsResponse> => {
    const response = await httpAdapter.get<ItemsResponse>(`/items?q=${query}`)
    return response;
};

export const getItemDetail = async (id: string): Promise<ItemDetailResponse> => {
    const response = await httpAdapter.get<ItemDetailResponse>(`/items/${id}`);
    return response;
};