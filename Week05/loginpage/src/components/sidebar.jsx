// Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import { FaSearch, FaFilm } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <nav className="sidebar-menu">
        <Link to="/search" className="menu-item">
          <FaSearch className="icon" /> 찾기
        </Link>
        <Link to="/movies" className="menu-item">
          <FaFilm className="icon" /> 영화
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;