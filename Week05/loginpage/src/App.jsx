// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/navbar';
import Sidebar from './components/sidebar';
import LoginPage from './pages/login';
import HomePage from './pages/home';
import SignUpPage from './pages/signup';
import './App.css';

const App = () => {
    return (
      <Router>
        <div className="app-container">
          <Sidebar />
          <div className="content">
            <Navbar /> {/* 상단 네비게이션 바 */}
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
            </Routes>
          </div>
        </div>
      </Router>
    );
  };
  
  export default App;