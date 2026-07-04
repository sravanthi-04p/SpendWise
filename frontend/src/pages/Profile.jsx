import { useEffect, useState } from 'react';
import api from '../api/axios';

const FIELD_CONFIG = [
  { key: 'name', label: 'Your Name' },
  { key: 'email', label: 'Email', readOnly: true },
  { key: 'date_of_birth', label: 'Date of Birth', type: 'date' },
  { key: 'present_address', label: 'Present Address' },
  { key: 'permanent_address', label: 'Permanent Address' },
  { key: 'city', label: 'City' },
  { key: 'postal_code', label: 'Postal Code' },
  { key: 'country', label: 'Country' },
];

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const loadProfile = async () => {
    try {
      const { data } = await api.get('/rest/profile');
      const user = data.users[0];
      setProfile(user);
      setForm(user);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSaving(true);

    try {
      const { data } = await api.put('/rest/profile', {
        name: form.name,
        date_of_birth: form.date_of_birth,
        present_address: form.present_address,
        permanent_address: form.permanent_address,
        city: form.city,
        postal_code: form.postal_code,
        country: form.country,
      });
      setProfile(data.users[0]);
      setSuccess('Profile updated successfully');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading profile...</p>;
  if (error && !profile) return <p style={{ color: 'var(--color-debit)' }}>{error}</p>;

  const initial = profile?.name?.charAt(0).toUpperCase() || '?';

  return (
    <div>
      <h2 style={{ marginTop: 0 }}>Profile</h2>

      <div className="card" style={{ padding: '32px', maxWidth: '720px', width: '100%', boxSizing: 'border-box' }}>
        <div
          style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            background: 'var(--color-primary)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '28px',
            fontWeight: 700,
            marginBottom: '28px',
          }}
        >
          {initial}
        </div>

        {error && <p style={{ color: 'var(--color-debit)', fontSize: '13px' }}>{error}</p>}
        {success && <p style={{ color: 'var(--color-credit)', fontSize: '13px' }}>{success}</p>}

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '20px' }}>
            {FIELD_CONFIG.map(({ key, label, type, readOnly }) => (
              <div key={key}>
                <label style={{ display: 'block', fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '6px' }}>
                  {label}
                </label>
                <input
                  type={type || 'text'}
                  value={form[key] || ''}
                  onChange={(e) => handleChange(key, e.target.value)}
                  readOnly={readOnly}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    boxSizing: 'border-box',
                    background: readOnly ? '#f7f8fa' : 'white',
                    color: readOnly ? 'var(--color-text-muted)' : 'var(--color-text)',
                  }}
                />
              </div>
            ))}
          </div>

          <button type="submit" className="btn-primary" disabled={saving} style={{ marginTop: '24px' }}>
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
};

const inputStyleBase = {};

export default Profile;