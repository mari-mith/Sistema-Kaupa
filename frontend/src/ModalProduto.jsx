import { useState, useEffect, useRef } from 'react';
import { useProdutoStore } from './store/useProdutoStore';
import { Pencil } from 'lucide-react';
import ConfirmacaoModal from './ConfirmacaoModal';
import toast from 'react-hot-toast';

const InputComIcone = ({ value, onChange, type = "text", placeholder, isTextarea = false }) => (
  <div className="input-wrapper">
    {isTextarea ? (
      <textarea
        value={value}
        onChange={onChange}
        maxLength={200}
        style={{ resize: 'none', paddingRight: '40px' }}
      />
    ) : (
      <input
        type={type}
        value={value}
        onChange={onChange}
        step={type === "number" ? "0.01" : undefined}
      />
    )}
    <Pencil className="input-icon" size={16} />
  </div>
);

export default function ModalProduto({ onClose, produtoParaEditar = null }) {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [descricao, setDescricao] = useState('');
  const [imagem, setImagem] = useState(null);
  const [erros, setErros] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);

  const fileInputRef = useRef(null);
  const max = 200;
  const isEdicao = !!produtoParaEditar;

  const { updateProduto, addProduto, deleteProduto } = useProdutoStore();

  useEffect(() => {
    if (produtoParaEditar) {
      setNome(produtoParaEditar.nome);
      setPreco(produtoParaEditar.preco);
      setQuantidade(produtoParaEditar.quantidade);
      setDescricao(produtoParaEditar.descricao);
    }
  }, [produtoParaEditar]);

  const handleDelete = async (e) => {

    e.preventDefault();
    e.stopPropagation();
    try {
      await deleteProduto(produtoParaEditar.id);
      toast.success(`${nome} deletado com sucesso!`);
      setShowConfirm(false);
      onClose();
    } catch (err) {
      toast.error(`Não foi possível deletar ${nome}`);
    }
  };

  const validar = () => {
    const novosErros = {};
    if (!nome.trim()) novosErros.nome = "Nome é obrigatório";
    if (!preco || preco <= 0) novosErros.preco = "Preço inválido";
    if (!quantidade || quantidade < 0) novosErros.quantidade = "Qtd inválida";
    if (!descricao.trim()) novosErros.descricao = "Descrição é obrigatória";
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
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

    try {
      if (isEdicao) {
        await updateProduto(produtoParaEditar.id, formData);
        toast.success(`Alterações em ${nome} salvas!`);
      } else {
        await addProduto(formData);
        toast.success(`${nome} adicionado!`);
      }
      onClose();
    } catch (err) {
      toast.error(`Não foi possível ${isEdicao ? 'alterar' : 'salvar'} ${nome}`);
    }
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit} className="modal-content">
        <button type="button" className="close-btn" onClick={onClose}>&times;</button>
        <h2>{isEdicao ? 'Detalhes do Produto' : 'Adicionar Produto'}</h2>

        <label>Nome:</label>
        <InputComIcone value={nome} onChange={(e) => setNome(e.target.value)} />
        {erros.nome && <span className="error-message">{erros.nome}</span>}

        <label>Preço:</label>
        <InputComIcone type="number" value={preco} onChange={(e) => setPreco(e.target.value)} />
        {erros.preco && <span className="error-message">{erros.preco}</span>}

        <label>Quantidade:</label>
        <InputComIcone type="number" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} />
        {erros.quantidade && <span className="error-message">{erros.quantidade}</span>}

        <label>Descrição:</label>
        <InputComIcone isTextarea value={descricao} onChange={(e) => setDescricao(e.target.value)} />
        {erros.descricao && <span className="error-message">{erros.descricao}</span>}

        <span className="contador" style={{ color: (max - descricao.length) < 20 ? 'red' : '#666' }}>
          {max - descricao.length} caracteres restantes
        </span>

        <div className="upload-area" onClick={() => fileInputRef.current.click()}>
          <input type="file" ref={fileInputRef} hidden onChange={(e) => setImagem(e.target.files[0])} />
          <p>{imagem ? imagem.name : (isEdicao ? "Clique para trocar a imagem" : "Selecionar imagem")}</p>
        </div>

        <div className="button-group">
          <button type="submit">
            {isEdicao ? 'Salvar Alterações' : 'Cadastrar'}
          </button>

          {isEdicao &&
            <button
              type="button"
              onClick={() => setShowConfirm(true)}
              className="btn-deletar">
              Deletar
            </button>}

          {showConfirm && (
            <ConfirmacaoModal
              onCancel={() => setShowConfirm(false)}
              onConfirm={handleDelete}
            />
          )}
        </div>
      </form>
    </div>
  );
}