import { useState, useRef } from 'react';
import { useProdutoStore } from './store/useProdutoStore';

export default function FormularioProduto({ onClose }) {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [descricao, setDescricao] = useState('');
  const [imagem, setImagem] = useState(null);
  
  const fileInputRef = useRef(null);
  const max = 200; 

  const addProduto = useProdutoStore((state) => state.addProduto);

  const handleDescricaoChange = (e) => {
    const valor = e.target.value;
    if (valor.length <= max) {
      setDescricao(valor);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('preco', preco);
    formData.append('quantidade', quantidade);
    formData.append('descricao', descricao);
    if (imagem) formData.append('imagem', imagem);

    const res = await addProduto(formData);
    
    alert("Produto salvo!");
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="form-modal">
      <h2>Adicionar Produto</h2>

      <label>Nome:</label>
      <input required type="text" value={nome} onChange={(e) => setNome(e.target.value)} />

      <label>Preço:</label>
      <input required type="number" min="0" step="0.01" value={preco} onChange={(e) => setPreco(e.target.value)} />

      <label>Quantidade:</label>
      <input required type="number" min="0" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} />

      <div className="box">
        <label>Descrição:</label>
        <textarea 
          required 
          maxLength={max} 
          value={descricao} 
          onChange={handleDescricaoChange}
        />
        <span className="contador" style={{ color: (max - descricao.length) < 20 ? 'red' : '#666' }}>
          {max - descricao.length} caracteres restantes
        </span>
      </div>

      <div className="upload-area" onClick={() => fileInputRef.current.click()}>
        <input type="file" ref={fileInputRef} hidden onChange={(e) => setImagem(e.target.files[0])} />
        <p>{imagem ? imagem.name : "Clique aqui para selecionar a imagem"}</p>
      </div>

      <button type="submit">Cadastrar Produto</button>
    </form>
  );
}