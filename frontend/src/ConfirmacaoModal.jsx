import { Trash2 } from 'lucide-react';

export default function ConfirmacaoModal({ onConfirm, onCancel }) {
  return (
    <div className="modal-overlay-confirmacao">
      <div className="modal-confirmacao">
        <Trash2 className="icon-lixeira" size={48} color="#dc3545" />
        <p>Certeza que quer deletar o produto?</p>
        <div className="button-group-confirm">
          <button className="btn-cancelar" onClick={onCancel}>Não, cancelar</button>
          <button className="btn-confirmar" onClick={onConfirm}>Sim, tenho certeza</button>
        </div>
      </div>
    </div>
  );
}