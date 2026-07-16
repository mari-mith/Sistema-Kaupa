import { create } from 'zustand';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/',
});

export const useProdutoStore = create((set) => ({
  setBusca: (termo) => set({ termoBusca: termo}),
  termoBusca: '',
  addProduto: async (FormData) => {
    try {
      await api.post('produtos/', FormData, {
        headers: {'Content-Type': 'multipart/form-data',},
      });

      await useProdutoStore.getState().fetchProdutos();
      return { success: true };
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
      return {success: false, error: error.message}
    }
  },
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