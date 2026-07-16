import { useProdutoStore } from './store/useProdutoStore';

export default function Navbar({ onOpenForm }) {
  const setBusca = useProdutoStore((state) => state.setBusca);

  return (
    <nav className="navbar">
      <div className="logo">Kaupa</div>
      
      <input 
        type="text" 
        placeholder="Pesquisar produto..." 
        onChange={(e) => setBusca(e.target.value)}
      />
    </nav>
  );
}