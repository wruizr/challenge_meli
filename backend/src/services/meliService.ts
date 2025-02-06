import HttpAdapter from '../adapters/httpAdapter'
import { handleError } from '../utils/errorHandler'
import { CONFIG } from '../config'
import { ItemResponse } from '../interfaces/meli/itemResponse'
import { ItemsResponse } from '../interfaces/meli/itemsResponse'
import { DescriptionResponse } from '../interfaces/meli/descriptionResponse'
import { SellerResponse } from '../interfaces/meli/sellerResponse'
 
const { API_BASE_URL_MELI } = CONFIG
if(typeof API_BASE_URL_MELI !== 'string') {
    throw new Error('La variable API_BASE_URL_MELI  no está definida en el archivo .env.')
}
const httpAdapter = new HttpAdapter(API_BASE_URL_MELI)

export const searchItems = async (query: string): Promise<ItemsResponse> => {
    try {
        const response = await httpAdapter.get<ItemsResponse>(`/sites/MLA/search?q=${query}`)
        return response
    } catch (error) {
        throw handleError(error, `Error buscando artículos`) 
    }
}

export const getItemDetail = async (id: string) => {
    try {
        const [itemResponse, descriptionResponse ] = await Promise.all([
            httpAdapter.get<ItemResponse>(`/items/${id}`),
            httpAdapter.get<DescriptionResponse>(`/items/${id}/description`),
        ]);
        const sellerResponse = await httpAdapter.get<SellerResponse>(`users/${itemResponse.seller_id}`)
        return {
            itemResponse,
            descriptionResponse,
            sellerResponse,
        }
    } catch (error) {
        throw handleError(error, `Error obteniendo detalles del artículo`)
    }
  };
