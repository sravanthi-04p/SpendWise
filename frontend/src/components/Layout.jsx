import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, ArrowLeftRight, User, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import LogoutModal from './LogoutModal';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const confirmLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/transactions', label: 'Transactions', icon: ArrowLeftRight },
    { to: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <div style={{ padding: '20px', minHeight: '100vh' }}>
      <div style={{ display: 'flex', background: 'var(--color-bg-app)', borderRadius: '16px', overflow: 'hidden', minHeight: 'calc(100vh - 40px)' }}>
        {/* Sidebar */}
        <div
          style={{
            width: '250px',
            background: 'var(--color-white)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '28px 24px',
          }}
        >
          <div>
            <h2 style={{ margin: '0 0 40px', fontSize: '20px' }}>
              Spend <span style={{ color: 'var(--color-primary)' }}>Wise</span>
            </h2>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {navItems.map(({ to, label, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  style={({ isActive }) => ({
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    textDecoration: 'none',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    color: isActive ? 'var(--color-primary)' : 'var(--color-text-muted)',
                    fontWeight: isActive ? 600 : 500,
                    fontSize: '14px',
                    background: isActive ? '#eef1ff' : 'transparent',
                  })}
                >
                  <Icon size={18} />
                  {label}
                </NavLink>
              ))}
            </nav>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontWeight: 600, fontSize: '14px', margin: 0 }}>{user?.name}</p>
                <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', margin: 0 }}>{user?.email}</p>
              </div>
              <button className="icon-btn" onClick={() => setShowLogoutModal(true)} title="Logout">
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div style={{ flex: 1, padding: '32px' }}>{children}</div>
      </div>

      <LogoutModal
        isOpen={showLogoutModal}
        onCancel={() => setShowLogoutModal(false)}
        onConfirm={confirmLogout}
      />
    </div>
  );
};

export default Layout;