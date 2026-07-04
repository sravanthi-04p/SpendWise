import { LogOut } from 'lucide-react';

const LogoutModal = ({ isOpen, onCancel, onConfirm }) => {
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
      <div className="card" style={{ padding: '32px', width: '420px', textAlign: 'left' }}>
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
            <LogOut color="#f2994a" size={22} />
          </div>
          <div>
            <h3 style={{ margin: '0 0 6px' }}>Are you sure you want to Logout?</h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '14px', margin: 0 }}>
              You'll need to log in again to access your account.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
          <button className="btn-danger" onClick={onConfirm} style={{ flex: 1 }}>
            Yes, Logout
          </button>
          <button className="btn-secondary" onClick={onCancel} style={{ flex: 1 }}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;