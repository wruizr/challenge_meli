import { create } from 'zustand'
import { ItemDetailResponse, ItemsResponse } from '../interfaces/backendResponse';

interface StoreState {
  searchTerm: string;
  items: ItemsResponse | null;
  selectedItem: ItemDetailResponse | null;
  setSearchTerm: (term: string) => void;
  setItems: (items: ItemsResponse) => void;
  setSelectedItem: (item: ItemDetailResponse | null) => void;
}

const useStore = create<StoreState>((set) => ({
  searchTerm: '',
  items: null,
  selectedItem: null,
  setSearchTerm: (term) => set({ searchTerm: term }),
  setItems: (items) => set({ items }),
  setSelectedItem: (item) => set({ selectedItem: item }),
}));

export default useStore;