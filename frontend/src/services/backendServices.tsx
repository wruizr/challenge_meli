import {
  ItemsResponse,
  ItemDetailResponse,
  GenerateTitleResponse,
  SaveItemTitleResponse,
  SaveItemTitle,
} from "../interfaces/backendResponse";
import HttpAdapter from "../adapters/httpAdapter";

const httpAdapter = new HttpAdapter(import.meta.env.VITE_API_BACKEND_URL);

export const getItems = async (query: string): Promise<ItemsResponse> => {
  const response = await httpAdapter.get<ItemsResponse>(`/items?q=${query}`);
  return response;
};

export const getItemDetail = async (
  id: string
): Promise<ItemDetailResponse> => {
  const response = await httpAdapter.get<ItemDetailResponse>(`/items/${id}`);
  return response;
};

export const getNewTitleIA = async (
  title: string
): Promise<GenerateTitleResponse> => {
  const response = await httpAdapter.get<GenerateTitleResponse>(
    `/generate-title/${title}`
  );
  return response;
};

export const saveItemTitle = async (
  request: SaveItemTitle
): Promise<SaveItemTitleResponse> => {
  const response = await httpAdapter.post<SaveItemTitleResponse>(
    `/items`,
    request
  );
  return response;
};
