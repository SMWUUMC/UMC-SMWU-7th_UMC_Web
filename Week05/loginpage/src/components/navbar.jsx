// Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">YONGCHA</Link>
      <div className="nav-buttons">
        <Link to="/login" className="nav-login-button">로그인</Link>
        <Link to="/signup" className="nav-signup-button">회원가입</Link>
      </div>
    </nav>
  );
};

export default Navbar;