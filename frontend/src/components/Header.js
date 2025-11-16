import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Header = () => {
  const { logout } = useAuth();

  return (
    <header>
      <div className="container">
        <Link to="/" className="logo">
          App Professores
        </Link>
        <nav>
          <Link to="/">Início</Link>
          <Link to="/teachers">Professores</Link>
          <button onClick={logout} className="btn btn-danger">
            Sair
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;