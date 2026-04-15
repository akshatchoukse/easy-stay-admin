import { useState } from 'react';
import { LogIn, Hotel, Loader2 } from 'lucide-react';

interface AdminLoginProps {
  onLogin: () => void;
}

export function AdminLogin({ onLogin }: AdminLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || 'Invalid credentials');
      }

      const data = await res.json();
      localStorage.setItem('hotelAdminUser', JSON.stringify(data));
      onLogin();
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    height: '44px',
    padding: '0 14px',
    borderRadius: '8px',
    border: '1px solid #E5E7EB',
    fontSize: '14px',
    color: '#111111',
    outline: 'none',
    transition: 'border-color 0.15s',
    boxSizing: 'border-box',
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        backgroundColor: '#F7F9FC',
      }}
    >
      <div style={{ width: '100%', maxWidth: '400px' }}>
        {/* Card */}
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            border: '1px solid #E5E7EB',
            padding: '40px 32px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
          }}
        >
          {/* Logo */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '14px',
                backgroundColor: '#FFF1EC',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
              }}
            >
              <Hotel style={{ width: '28px', height: '28px', color: '#F24E1E' }} />
            </div>
            <h1 style={{ fontSize: '22px', fontWeight: '700', color: '#111111', marginBottom: '4px' }}>
              Hotel Admin
            </h1>
            <p style={{ fontSize: '13px', color: '#9CA3AF' }}>Sign in to your admin dashboard</p>
          </div>

          {/* Error */}
          {error && (
            <div
              style={{
                backgroundColor: '#FEF2F2',
                border: '1px solid #FECACA',
                borderRadius: '8px',
                padding: '10px 14px',
                fontSize: '13px',
                color: '#DC2626',
                marginBottom: '20px',
              }}
            >
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputStyle}
                placeholder="admin@example.com"
                required
                onFocus={(e) => (e.target.style.borderColor = '#F24E1E')}
                onBlur={(e) => (e.target.style.borderColor = '#E5E7EB')}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={inputStyle}
                placeholder="••••••••"
                required
                onFocus={(e) => (e.target.style.borderColor = '#F24E1E')}
                onBlur={(e) => (e.target.style.borderColor = '#E5E7EB')}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                height: '44px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: loading ? '#D1D5DB' : '#F24E1E',
                color: loading ? '#9CA3AF' : 'white',
                fontSize: '14px',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginTop: '4px',
                transition: 'background-color 0.15s',
              }}
              onMouseEnter={(e) => { if (!loading) e.currentTarget.style.backgroundColor = '#D84315'; }}
              onMouseLeave={(e) => { if (!loading) e.currentTarget.style.backgroundColor = '#F24E1E'; }}
            >
              {loading ? (
                <Loader2 style={{ width: '18px', height: '18px', animation: 'spin 1s linear infinite' }} />
              ) : (
                <LogIn style={{ width: '16px', height: '16px' }} />
              )}
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          {/* Demo credentials
          <div
            style={{
              marginTop: '24px',
              padding: '14px',
              backgroundColor: '#F9FAFB',
              borderRadius: '8px',
              fontSize: '12px',
              color: '#6B7280',
            }}
          >
            <p style={{ fontWeight: '600', color: '#374151', marginBottom: '6px' }}>Demo Credentials</p>
            <p>Admin: <span style={{ color: '#111111' }}>admin@hotels.com / admin123</span></p>
            <p style={{ marginTop: '3px' }}>Manager: <span style={{ color: '#111111' }}>manager@hotels.com / manager123</span></p>
          </div> */}
        </div>
      </div>
    </div>
  );
}