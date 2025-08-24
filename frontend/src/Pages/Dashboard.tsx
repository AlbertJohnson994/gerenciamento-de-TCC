import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '../store';

const Dashboard: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  if (!user) return <p>Loading...</p>;

  const proposals = [
    {
      title: 'Research Project on AI Ethics',
      status: 'Pending',
      date: '2023-05-15',
    },
    {
      title: 'Campus Sustainability Initiative',
      status: 'Approved',
      date: '2023-04-28',
    },
    {
      title: 'Student Workshop Series',
      status: 'Rejected',
      date: '2023-03-10',
    },
  ];

  const statusColors: Record<string, { bg: string; text: string }> = {
    Approved: { bg: 'bg-green-100', text: 'text-green-800' },
    Rejected: { bg: 'bg-red-100', text: 'text-red-800' },
    Pending: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-gray-200 px-3 py-1 rounded-full text-sm">
              {user.role}
            </span>
            <h2 className="text-2xl font-bold">Dashboard</h2>
          </div>

          <h1 className="text-2xl font-bold mb-6">Propostas</h1>

          {proposals.map((proposal, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-4 mb-4">
              <h3 className="text-lg font-semibold mb-2">{proposal.title}</h3>
              <div className="flex items-center gap-4 text-sm">
                <span>
                  <strong>Status:</strong>{' '}
                  <span className={`px-2 py-1 rounded ${statusColors[proposal.status].bg} ${statusColors[proposal.status].text}`}>
                    {proposal.status}
                  </span>
                </span>
                <span>
                  <strong>Data de envio:</strong>{' '}
                  {new Date(proposal.date).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}

          <div className="flex justify-end gap-3 mt-6">
            <button 
              className="btn btn-secondary"
              onClick={() => navigate('/dashboard')}
            >
              Cancelar
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => navigate('/dashboard')}
            >
              Finalizar
            </button>
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/proposal')}
            >
              Nova Proposta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;