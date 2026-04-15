import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import api from './api';

export interface HotelUser {
  _id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Manager' | 'Receptionist' | 'Housekeeping';
  hotelId?: string;
  token: string;
}

interface AuthContextType {
  user: HotelUser | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  hasRole: (roles: string[]) => boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const HotelAuthProvider = ({ children, onLogout }: { children: ReactNode; onLogout: () => void }) => {
  const [user, setUser] = useState<HotelUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('hotelAdminUser');
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data } = await api.post('/auth/login', { email, password });
      setUser(data);
      localStorage.setItem('hotelAdminUser', JSON.stringify(data));
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hotelAdminUser');
    onLogout();
  };

  const hasRole = (roles: string[]) => {
    if (!user) return false;
    const activeRole = user.role.toLowerCase();
    return roles.map((r) => r.toLowerCase()).includes(activeRole);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, hasRole, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useHotelAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useHotelAuth must be used within HotelAuthProvider');
  return ctx;
};
