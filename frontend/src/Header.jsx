import { useProdutoStore } from './store/useProdutoStore';

export default function Navbar({ onOpenForm }) {
  const setBusca = useProdutoStore((state) => state.setBusca);

  return (
    <header className="nav-container">
      <div className="navbar">
      <div className="logo">Kaupa.</div>
      <input
        type="text"
        placeholder="Pesquisar produto..."
        onChange={(e) => setBusca(e.target.value)}
      />
    </div>
    </header>
  );
}