import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store';
import { logout } from '../store/authSlice';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/dashboard" className="text-xl font-bold">
          Sistema TCC
        </Link>

        <nav className="flex items-center space-x-4">
          {user && (
            <>
              <Link to="/dashboard" className="hover:text-gray-300">
                Dashboard
              </Link>
              
              {user.role === 'STUDENT' && (
                <Link to="/proposals" className="hover:text-gray-300">
                  Minhas Propostas
                </Link>
              )}
              
              {user.role === 'ORIENTADOR' && (
                <Link to="/orientador/proposals" className="hover:text-gray-300">
                  Propostas Orientadas
                </Link>
              )}
              
              {user.role === 'ADMIN' && (
                <Link to="/admin" className="hover:text-gray-300">
                  Administração
                </Link>
              )}
              
              <span className="text-gray-300">Olá, {user.name}</span>
              <button 
                onClick={handleLogout} 
                className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded"
              >
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