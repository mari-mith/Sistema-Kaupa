import { create } from 'zustand';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/',
});

export const useProdutoStore = create((set) => ({
  produtos: [], 
  fetchProdutos: async () => {
    try {
      const response = await api.get('produtos/');
      set({ produtos: response.data });
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  },
}));