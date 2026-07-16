import { create } from 'zustand';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/',
});

export const useProdutoStore = create((set) => ({
  setBusca: (termo) => set({ termoBusca: termo }),
  termoBusca: '',
  addProduto: async (FormData) => {
    try {
      await api.post('produtos/', FormData, {
        headers: { 'Content-Type': 'multipart/form-data', },
      });

      await useProdutoStore.getState().fetchProdutos();
      return { success: true };
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
      return { success: false, error: error.message }
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

  updateProduto: async (id, formData) => {
    const res = await fetch(`http://127.0.0.1:8000/api/produtos/${id}/`, {
      method: 'PATCH',
      body: formData,
    });

    if (res.ok) {
      const produtoAtualizado = await res.json();

      set((state) => ({
        produtos: state.produtos.map((p) =>
          p.id === id ? produtoAtualizado : p
        ),
      }));
    }
  },

  deleteProduto: async (id) => {
    await fetch(`http://127.0.0.1:8000/api/produtos/${id}/`, {
      method: 'DELETE',
    });

    set((state) => ({
      produtos: state.produtos.filter((p) => p.id !== id),
    }));
  },
}));