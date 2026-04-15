import { useState } from 'react';
import { AdminLogin } from './components/admin-login';
import { DashboardLayout } from './components/dashboard-layout';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Persist login state across refreshes
    return !!localStorage.getItem('hotelAdminUser');
  });

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('hotelAdminUser');
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return <DashboardLayout onLogout={handleLogout} />;
}
