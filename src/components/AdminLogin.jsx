import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (password === 'admin123') navigate('/dashboard');
    else alert('Wrong password');
  };

  return (
    <div className="login-container">
      <h2>Admin Login</h2>
      <input type="password" placeholder="Enter Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default AdminLogin;