import { createContext, useContext, useState, useEffect } from 'react';
import { adminAPI } from '../utils/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    const user = localStorage.getItem('admin_user');
    if (token && user) {
      setAdmin(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    const res = await adminAPI.login({ username, password });
    localStorage.setItem('admin_token', res.data.token);
    localStorage.setItem('admin_user', JSON.stringify(res.data.user));
    setAdmin(res.data.user);
    return res.data;
  };

  const logout = async () => {
    try { await adminAPI.logout(); } catch {}
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
