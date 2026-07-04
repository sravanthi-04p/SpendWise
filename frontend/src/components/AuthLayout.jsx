import { TrendingUp, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

const AuthLayout = ({ children }) => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#fff' }}>
      {/* Left hero panel */}
      <div
        style={{
          flex: 1,
          background: 'linear-gradient(135deg, #12153d 0%, #1c2158 60%, #2a2f7a 100%)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '60px',
          color: 'white',
          minWidth: '460px',
        }}
        className="auth-hero-panel"
      >
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '48px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'var(--color-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <TrendingUp size={20} color="white" />
            </div>
            <span style={{ fontSize: '18px', fontWeight: 700 }}>Spend Wise</span>
          </div>

          <h1 style={{ fontSize: '38px', lineHeight: 1.2, fontWeight: 700, margin: '0 0 16px', maxWidth: '380px' }}>
            Take control of your money, one transaction at a time.
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', maxWidth: '360px' }}>
            Track spending, monitor income, and see exactly where your money goes.
          </p>
        </div>

        {/* Floating preview cards */}
        <div
          style={{
            position: 'absolute',
            top: '18%',
            right: '10%',
            background: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '14px',
            padding: '16px 20px',
            animation: 'float 6s ease-in-out infinite',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'rgba(39,174,96,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ArrowUpRight size={14} color="#6fe3a0" />
            </div>
            <div>
              <p style={{ margin: 0, fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>Freelance Payment</p>
              <p style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#6fe3a0' }}>+$1,200</p>
            </div>
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: '2%',
            right: '16%',
            background: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '14px',
            padding: '16px 20px',
            animation: 'floatDelayed 7s ease-in-out infinite',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'rgba(235,87,87,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ArrowDownLeft size={14} color="#ff8a8a" />
            </div>
            <div>
              <p style={{ margin: 0, fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>Grocery Store</p>
              <p style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#ff8a8a' }}>-$220</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
        <div style={{ width: '100%', maxWidth: '360px' }}>{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;