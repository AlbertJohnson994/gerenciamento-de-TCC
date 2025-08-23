import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const MyComponent: React.FC = () => {
  const navigate = useNavigate();

  // Navegação programática
  const handleNavigate = () => {
    navigate('/proposals'); // vai para proposals
    // ou com state: navigate('/proposals', { state: { data: 'test' } })
  };

  // Voltar para página anterior
  const goBack = () => {
    navigate(-1);
  };

  return (
    <div>
      {/* Link tradicional */}
      <Link to="/proposals">Ver Propostas</Link>
      
      {/* Botão com navegação programática */}
      <button onClick={handleNavigate}>Ir para Propostas</button>
      
      {/* Botão voltar */}
      <button onClick={goBack}>Voltar</button>
    </div>
  );
};

export default MyComponent;