import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register } from '../store/authSlice';
import type { AppDispatch } from '../store';
import type { RootState } from '../store';
import type { RegisterData } from '../types';

const Register: React.FC = () => {
  const [formData, setFormData] = useState<RegisterData>({
    name: '',
    email: '',
    password: '',
    role: 'STUDENT',
    matriculation: '' // Adicionando o campo matriculation
  });

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isLoading, error, token } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
  if (token) {
    navigate('/dashboard', { replace: true });
  }
}, [token, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação do campo matriculation
    let finalMatriculation = formData.matriculation;
    
    if (formData.role === 'STUDENT') {
      if (!formData.matriculation || formData.matriculation.trim() === '') {
        alert('Por favor, informe sua matrícula');
        return;
      }
    } else {
      // Para não-estudantes, definir um valor padrão
      finalMatriculation = 'N/A';
    }
    
    try {
      await dispatch(register({
        ...formData,
        matriculation: finalMatriculation
      })).unwrap();
      navigate('/dashboard', { replace: true });
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Registro</h2>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              {error}
            </div>
          )}

          <div className="form-group">
            <label className="block text-gray-700 text-sm font-bold mb-2">Nome:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="form-group">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="form-group">
            <label className="block text-gray-700 text-sm font-bold mb-2">Senha:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="form-group">
            <label className="block text-gray-700 text-sm font-bold mb-2">Função:</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="STUDENT">Estudante</option>
              <option value="ORIENTADOR">Orientador</option>
              <option value="ADMIN">Administrador</option>
            </select>
          </div>

          {formData.role === 'STUDENT' && (
            <div className="form-group">
              <label className="block text-gray-700 text-sm font-bold mb-2">Matrícula:</label>
              <input
                type="text"
                name="matriculation"
                value={formData.matriculation}
                onChange={handleChange}
                required={formData.role === 'STUDENT'}
                placeholder="Digite sua matrícula"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">Obrigatório para estudantes</p>
            </div>
          )}

          <button 
            type="submit" 
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
            disabled={isLoading}
          >
            {isLoading ? 'Carregando...' : 'Registrar'}
          </button>

          <p 
            className="text-blue-600 cursor-pointer mt-3 text-center hover:underline"
            onClick={() => navigate('/login')}
          >
            Já tenho uma conta
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
