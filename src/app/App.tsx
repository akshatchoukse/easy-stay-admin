import { useState } from 'react';
import { AdminLogin } from './components/admin-login';
import { DashboardLayout } from './components/dashboard-layout';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return <DashboardLayout onLogout={handleLogout} />;
}
