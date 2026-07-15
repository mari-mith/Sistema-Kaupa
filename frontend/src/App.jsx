import { useEffect } from 'react';
import { useProdutoStore } from './store/useProdutoStore'; // Note as chaves {}

function App() {
  const { produtos, fetchProdutos } = useProdutoStore();

  useEffect(() => {
    fetchProdutos();
  }, [fetchProdutos]);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Sistema Kaupa</h1>
      {}
      <pre>{JSON.stringify(produtos, null, 2)}</pre>
    </div>
  );
}

export default App;