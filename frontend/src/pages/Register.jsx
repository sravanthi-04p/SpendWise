import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AuthLayout from '../components/AuthLayout';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(name, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <h2 style={{ margin: '0 0 6px' }}>Create your account</h2>
      <p style={{ color: 'var(--color-text-muted)', fontSize: '14px', margin: '0 0 28px' }}>
        Start tracking your spending in minutes
      </p>

      {error && (
        <p style={{ color: 'var(--color-debit)', fontSize: '13px', background: '#fdeaea', padding: '10px 14px', borderRadius: '8px' }}>
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div className="auth-input-group">
          <User size={16} />
          <input
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

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
          {loading ? 'Creating account...' : 'Create Account'}
        </button>

        <p style={{ marginTop: '20px', fontSize: '14px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'none' }}>Log in</Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Register;