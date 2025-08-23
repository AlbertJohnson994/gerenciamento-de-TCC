import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';

export const useAuthRedirect = () => {
  const navigate = useNavigate();
  const { token, user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const checkAuthAndRedirect = () => {
      const storedToken = localStorage.getItem('token');
      
      if (storedToken || token) {
        console.log('Authenticated, redirecting to dashboard');
        navigate('/dashboard');
      }
    };

    checkAuthAndRedirect();
  }, [token, navigate]);

  return { token, user };
};