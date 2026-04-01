import { useState } from 'react';
import { LogIn } from 'lucide-react';

interface AdminLoginProps {
  onLogin: () => void;
}

export function AdminLogin({ onLogin }: AdminLoginProps) {
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - in real app, validate credentials
    if (adminId && password) {
      onLogin();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#F7F9FC' }}>
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-sm p-8" style={{ borderWidth: '1px', borderColor: '#E5E7EB' }}>
          {/* Logo/Branding */}
          <div className="text-center mb-8">
            <h1 className="font-semibold" style={{ fontSize: '24px', color: '#111111' }}>Bhago Mobility</h1>
            <p className="mt-1" style={{ fontSize: '12px', color: '#6B7280' }}>Super Admin Portal</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="adminId" className="block mb-2" style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}>
                Admin ID
              </label>
              <input
                id="adminId"
                type="text"
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
                className="w-full px-3 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                style={{ 
                  height: '40px', 
                  borderWidth: '1px', 
                  borderColor: '#E5E7EB',
                  fontSize: '14px',
                  borderRadius: '8px'
                }}
                onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px #F24E1E40'}
                onBlur={(e) => e.target.style.boxShadow = 'none'}
                placeholder="Enter your admin ID"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block mb-2" style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}>
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                style={{ 
                  height: '40px', 
                  borderWidth: '1px', 
                  borderColor: '#E5E7EB',
                  fontSize: '14px',
                  borderRadius: '8px'
                }}
                onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px #F24E1E40'}
                onBlur={(e) => e.target.style.boxShadow = 'none'}
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full text-white px-4 flex items-center justify-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{ 
                backgroundColor: '#F24E1E',
                height: '40px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#D84315'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#F24E1E'}
              onFocus={(e) => e.currentTarget.style.boxShadow = '0 0 0 2px #F24E1E40'}
              onBlur={(e) => e.currentTarget.style.boxShadow = 'none'}
            >
              <LogIn className="w-4 h-4" />
              Login
            </button>
          </form>

          <div className="mt-6 text-center">
            <p style={{ fontSize: '12px', color: '#6B7280' }}>
              Authorized personnel only
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}