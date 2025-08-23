import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store';
import { logout } from '../../store/authSlice';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="navbar">
      <div className="navbar-content">
        <Link to="/dashboard" className="logo">
          Sistema TCC
        </Link>

        <nav className="nav-links">
          {user && (
            <>
              <Link to="/dashboard">Dashboard</Link>
              
              {user.role === 'STUDENT' && (
                <Link to="/proposals">Minhas Propostas</Link>
              )}
              
              {user.role === 'ORIENTADOR' && (
                <Link to="/orientador/proposals">Propostas Orientadas</Link>
              )}
              
              {user.role === 'ADMIN' && (
                <Link to="/admin">Administração</Link>
              )}
              
              <span>Olá, {user.name}</span>
              <button onClick={handleLogout} className="btn btn-secondary">
                Sair
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;