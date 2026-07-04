import { createContext, useContext, useState } from 'react';
import api from '../api/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('spendwise_user');
    return stored ? JSON.parse(stored) : null;
  });

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    const { token, ...userInfo } = data;

    localStorage.setItem('spendwise_token', token);
    localStorage.setItem('spendwise_user', JSON.stringify(userInfo));
    setUser(userInfo);

    return userInfo;
  };

  const register = async (name, email, password) => {
    const { data } = await api.post('/auth/register', { name, email, password });
    const { token, ...userInfo } = data;

    localStorage.setItem('spendwise_token', token);
    localStorage.setItem('spendwise_user', JSON.stringify(userInfo));
    setUser(userInfo);

    return userInfo;
  };

  const logout = () => {
    localStorage.removeItem('spendwise_token');
    localStorage.removeItem('spendwise_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);