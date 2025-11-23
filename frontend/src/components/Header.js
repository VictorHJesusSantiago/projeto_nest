import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Header = () => {
  const { logout } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path) => {
    return location.pathname === path ? 'nav-link active' : 'nav-link';
  };

  return (
    <header>
      <div className="container">
        <Link to="/" className="logo">
          EduSys
        </Link>

        <button 
          className="mobile-menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>
        
        <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          <Link to="/" className={isActive('/')} onClick={() => setIsMenuOpen(false)}>
            Dashboard
          </Link>
          <Link to="/teachers" className={isActive('/teachers')} onClick={() => setIsMenuOpen(false)}>
            Professores
          </Link>
          <Link to="/students" className={isActive('/students')} onClick={() => setIsMenuOpen(false)}>
            Estudantes
          </Link>
          <Link to="/courses" className={isActive('/courses')} onClick={() => setIsMenuOpen(false)}>
            Cursos
          </Link>
          
          <button onClick={logout} className="btn btn-danger">
            <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sair
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;