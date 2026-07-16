import { useState, useEffect } from 'react';
import { useProdutoStore } from './store/useProdutoStore';
import './index.css'
import FormularioProduto from './FormularioProdutos';

function App() {
  const { produtos, fetchProdutos, termoBusca, setBusca } = useProdutoStore();
  const [formAberto, setFormAberto] = useState(false);
  const produtosFiltrados = (produtos || []).filter((p) =>
    p.nome.toLowerCase().includes(termoBusca.toLowerCase())
  );

  useEffect(() => {
    fetchProdutos();
  }, [fetchProdutos]);

  return (
    <>
      <nav className="navbar">
        <div className="Logo">Kaupa.</div>
        <input 
          type="text" 
          placeholder="Pesquisar..." 
          value={termoBusca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </nav>
    
      <div className="container">

        {formAberto && (
          <div className="modal">
            <div className="modal-content">
              {}
              <FormularioProduto onClose={() => setFormAberto(false)} />
              <button onClick={() => setFormAberto(false)}>Fechar</button>
            </div>
          </div>
        )}

        <hr />

        <div className="product-grid">

        <div id= "add" className="card" 
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        onClick={() => setFormAberto(true)}
        >
            
            <span> + Adicionar Produto</span>
          </div>

          {produtosFiltrados.map((p) => (
            <div key={p.id} className="card">
              {p.imagem ? (
                <img src={p.imagem} alt={p.nome} className="card-image-real" />
              ) : (
                <div className="card-image-placeholder"> Sem Imagem </div>
              )}
              <h3>{p.nome}</h3>
              <p>Qnt: {p.quantidade}</p>
              <p>R$ {p.preco}</p>
              <button className="details-btn">Detalhes &gt;</button>
            </div>
          ))}

        </div>
      </div>
    </>
  );
}

export default App;