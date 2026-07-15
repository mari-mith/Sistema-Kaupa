import { useState } from 'react';
import { useProdutoStore } from './store/useProdutoStore';

export default function FormularioProduto() {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [imagem, setImagem] = useState(null);
  const [quantidade, setQuantidade] = useState('');
  const [descricao, setDescricao] = useState(''); 
  
  const addProduto = useProdutoStore((state) => state.addProduto);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('preco', preco);
    formData.append('quantidade', quantidade);
    formData.append('descricao', descricao);
    if (imagem) formData.append('imagem', imagem);

    for (let pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }

    const res = await addProduto(formData);
    if (res.success) {
      alert("Produto salvo!");
      setNome(''); setPreco(''); setQuantidade(''); setDescricao(''); setImagem(null);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
      <input type="number" placeholder="Preço" value={preco} onChange={(e) => setPreco(e.target.value)} />
      <input type="number" placeholder="Quantidade" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} />
      <textarea placeholder="Descrição" value={descricao} onChange={(e) => setDescricao(e.target.value)} /> 
      <input type="file" onChange={(e) => setImagem(e.target.files[0])} />
      <button type="submit">Cadastrar Produto</button>
    </form>
  );
}