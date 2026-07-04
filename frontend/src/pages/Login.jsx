import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AuthLayout from '../components/AuthLayout';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <h2 style={{ margin: '0 0 6px' }}>Welcome back</h2>
      <p style={{ color: 'var(--color-text-muted)', fontSize: '14px', margin: '0 0 28px' }}>
        Log in to continue to your dashboard
      </p>

      {error && (
        <p style={{ color: 'var(--color-debit)', fontSize: '13px', background: '#fdeaea', padding: '10px 14px', borderRadius: '8px' }}>
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div className="auth-input-group">
          <Mail size={16} />
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="auth-input-group">
          <Lock size={16} />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%', padding: '13px' }}>
          {loading ? 'Logging in...' : 'Log In'}
        </button>

        <p style={{ marginTop: '20px', fontSize: '14px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
          No account? <Link to="/register" style={{ color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'none' }}>Sign up</Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Login;