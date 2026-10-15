import { createContext, useState, useEffect } from 'react';
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('currentUser')) || null);
  useEffect(() => {
    if (user) localStorage.setItem('currentUser', JSON.stringify(user));
    else localStorage.removeItem('currentUser');
  }, [user]);
  const signup = (name, email, password) => {
    if (!name ||!email ||!password) throw new Error('All fields required ma!');
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(u => u.email === email)) throw new Error('Email exists ma!');
    if (password.length < 6) throw new Error('Password min 6 chars ma!');
    users.push({ name, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    setUser({ name, email });
  };
  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const found = users.find(u => u.email === email && u.password === password);
    if (!found) throw new Error('Invalid credentials!');
    setUser({ name: found.name, email });
  };
  const logout = () => setUser(null);
  return <AuthContext.Provider value={{ user, signup, login, logout }}>{children}</AuthContext.Provider>;
};