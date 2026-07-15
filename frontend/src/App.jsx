import { useEffect } from 'react';
import { useProdutoStore } from './store/useProdutoStore';
import './index.css'

function App() {
  const { produtos, fetchProdutos } = useProdutoStore();

  useEffect(() => {
    fetchProdutos();
  }, [fetchProdutos]);

  if (!produtos) return <div>Carregando...</div>;
  if (produtos.length === 0) return <div>Nenhum produto cadastrado.</div>;

  return (
    <div className="product-grid">
      {produtos.map((p) => (
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
      
      {}
      <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: '40px', color: '#aaa' }}>+</span>
      </div>
    </div>
  );
}

export default App;