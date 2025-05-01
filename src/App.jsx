import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Catalogue from './components/Catalogue.jsx';
import AdminLogin from './components/AdminLogin.jsx';
import AdminDashboard from './components/AdminDashboard.jsx';
import './App.css';
import { Footer } from './components/Footer.jsx';

function App() {
  return (<>
    <Router>
      <Routes>
        <Route path="/" element={<Catalogue />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
 <Footer/></> );
}

export default App;