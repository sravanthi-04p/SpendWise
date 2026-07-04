import { AlertTriangle } from 'lucide-react';

const DeleteModal = ({ isOpen, onCancel, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(20,30,60,0.4)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 200,
      }}
    >
      <div className="card" style={{ padding: '32px', width: '420px' }}>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
          <div
            style={{
              background: '#fff4d6',
              borderRadius: '50%',
              width: '48px',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <AlertTriangle color="#f2994a" size={22} />
          </div>
          <div>
            <h3 style={{ margin: '0 0 6px' }}>Are you sure you want to Delete?</h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '14px', margin: 0 }}>
              This transaction will be deleted immediately. You can't undo this action.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
          <button className="btn-danger" onClick={onConfirm} style={{ flex: 1 }}>
            Yes, Delete
          </button>
          <button className="btn-secondary" onClick={onCancel} style={{ flex: 1 }}>
            No, Leave it
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;