import { useState, useEffect } from 'react';
import { useProdutoStore } from './store/useProdutoStore';
import './index.css'
import ModalProduto from './ModalProduto';
import { Toaster } from 'react-hot-toast';
import Header from './Header';

function App() {
  const { produtos, fetchProdutos, termoBusca } = useProdutoStore();

  const [produtoParaEditar, setProdutoParaEditar] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchProdutos(termoBusca);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [termoBusca, fetchProdutos]);

  const abrirParaAdicionar = () => {
    setProdutoParaEditar(null);
    setIsModalOpen(true);
  };

  const abrirParaEditar = (produto) => {
    setProdutoParaEditar(produto);
    setIsModalOpen(true);
  };

  const fecharModal = () => {
    setIsModalOpen(false);
    setProdutoParaEditar(null);
  };


  return (
    <>
    <Toaster position="bottom-right" reverseOrder={false} />
    <Header />
      <div className="container">
        <hr />
        <div className="product-grid">

          { }
          <div id="add" className="card" onClick={abrirParaAdicionar}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span> + Adicionar Produto</span>
          </div>

          { }
          {(produtos || []).map((p) => (
            <div key={p.id} className="card">
              {p.imagem ? (
                <img src={p.imagem} alt={p.nome} className="card-image-real" />
              ) : (
                <img
                  src=".\public\image_placeholder.png"
                  alt="Sem imagem"
                  className="card-image-placeholder"
                />
              )}
              <h3>{p.nome}</h3>
              <p id="produto-id">ID: {p.id}</p>
              <p id="qnt">Qnt: {p.quantidade}</p>
              <p>R$ {p.preco}</p>
              <button className="details-btn" onClick={() => abrirParaEditar(p)}>
                + Detalhes
              </button>
            </div>
          ))}

          { }
          {isModalOpen && (
            <ModalProduto
              produtoParaEditar={produtoParaEditar}
              onClose={fecharModal}
            />
          )}

        </div>
      </div>
    </>
  );
}

export default App;