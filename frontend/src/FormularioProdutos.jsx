import { useState, useRef } from 'react';
import { useProdutoStore } from './store/useProdutoStore';

export default function FormularioProduto({ onClose }) {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [descricao, setDescricao] = useState('');
  const [imagem, setImagem] = useState(null);
  const [erros, setErros] = useState({});
  
  const fileInputRef = useRef(null);
  const max = 200; 

  const addProduto = useProdutoStore((state) => state.addProduto);

  const validar = () => {
    const novosErros = {};
    if (!nome) novosErros.nome = "Nome é obrigatório";
    if (!preco || preco <= 0) novosErros.preco = "Preço inválido";
    if (!quantidade || quantidade < 0) novosErros.quantidade = "Qtd inválida";
    if (!descricao) novosErros.descricao = "Descrição é Obrigatória";
    
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleDescricaoChange = (e) => {
    const valor = e.target.value;
    if (valor.length <= max) {
      setDescricao(valor);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validar()) return;

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
      <input 
      className={erros.nome ? 'input-error' : ''}
      type="text" 
      value={nome} 
      onChange={(e) => setNome(e.target.value)} 
      />

      {erros.nome && <span className="error-message">{erros.nome}</span>}

      <label>Preço:</label>
      <input 
      className={erros.preco ? 'input-error' : ''}
      type="number" 
      min="0" step="0.01" 
      value={preco} 
      onChange={(e) => setPreco(e.target.value)} />

      {erros.preco && <span className="error-message">{erros.preco}</span>}


      <label>Quantidade:</label>
      <input 
      className={erros.quantidade ? 'input-error' : ''}
      type="number" 
      min="0" value={quantidade} 
      onChange={(e) => setQuantidade(e.target.value)} />

      {erros.quantidade && <span className="error-message">{erros.quantidade}</span>} 

      <div className="box">
        <label>Descrição:</label>
        <textarea 
          className={erros.descricao ? 'input-error' : ''}
          maxLength={max} 
          value={descricao} 
          onChange={handleDescricaoChange}
        />
        <span 
        className="contador" 
        style={{ color: (max - descricao.length) < 20 ? 'red' : '#666' }}>
          {max - descricao.length} caracteres restantes
        </span>
      </div>

      {erros.descricao && <span className="error-message">{erros.descricao}</span>}

      <div 
      className="upload-area" 
      onClick={() => fileInputRef.current.click()}>

        <input 
        type="file" 
        ref={fileInputRef} 
        hidden onChange={(e) => setImagem(e.target.files[0])} 
        />

        <p>{imagem ? imagem.name : "Clique aqui para selecionar a imagem"}</p>

      </div>

      <button type="submit">Cadastrar Produto</button>
    </form>
  );
}