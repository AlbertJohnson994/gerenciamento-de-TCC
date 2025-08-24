// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import type { RootState } from './store';

// // Components
// import Header from './components/Header';
// import { ProtectedRoute } from './components/ProtectedRoute';

// // Pages
// import Login from './Pages/Login';
// import Register from './Pages/Register';
// import ForgotPassword from './Pages/ForgotPassword';
// import Dashboard from './Pages/Dashboard';
// import OrientadorDashboard from './Pages/OrientadorDashboard';
// import ProposalForm from './Pages/ProposalForm';

// const App: React.FC = () => {
//   const { token, user } = useSelector((state: RootState) => state.auth);

//   return (
//     <Router>
//       <div className="App min-h-screen bg-gray-100">
//         {token && <Header />}
//         <main className="container mx-auto p-4">
//           <Routes>
//             {/* Public routes */}
//             <Route
//               path="/login"
//               element={token ? <Navigate to="/dashboard" replace /> : <Login />}
//             />
//             <Route
//               path="/register"
//               element={token ? <Navigate to="/dashboard" replace /> : <Register />}
//             />
//             <Route
//               path="/forgot-password"
//               element={token ? <Navigate to="/dashboard" replace /> : <ForgotPassword />}
//             />

//             {/* Protected routes */}
//             <Route
//               path="/dashboard"
//               element={
//                 <ProtectedRoute>
//                   {user?.role === 'ORIENTADOR' ? <OrientadorDashboard /> : <Dashboard />}
//                 </ProtectedRoute>
//               }
//             />

//             <Route
//               path="/proposals"
//               element={
//                 <ProtectedRoute requiredRole="STUDENT">
//                   <ProposalForm />
//                 </ProtectedRoute>
//               }
//             />

//             <Route
//               path="/orientador/proposals"
//               element={
//                 <ProtectedRoute requiredRole="ORIENTADOR">
//                   <OrientadorDashboard />
//                 </ProtectedRoute>
//               }
//             />

//             {/* Default route */}
//             <Route
//               path="/"
//               element={<Navigate to={token ? '/dashboard' : '/login'} replace />}
//             />

//             {/* 404 */}
//             <Route path="*" element={<div className="text-center py-8">Página não encontrada</div>} />
//           </Routes>
//         </main>
//       </div>
//     </Router>
//   );
// };

// export default App;

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import { ProtectedRoute } from "./components/ProtectedRoute";

import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import ProposalForm from "./Pages/ProposalForm";
import OrientadorDashboard from "./Pages/OrientadorDashboard";
import ForgotPassword from "./Pages/ForgotPassword";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        {/* Rotas públicas */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Rotas protegidas */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/proposals"
          element={
            <ProtectedRoute requiredRole="STUDENT">
              <ProposalForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orientador"
          element={
            <ProtectedRoute requiredRole="ORIENTADOR">
              <OrientadorDashboard />
            </ProtectedRoute>
          }
        />
        {/* Se quiser rota para Admin */}
        {/* <Route path="/admin" element={<ProtectedRoute requiredRole="ADMIN"><AdminDashboard /></ProtectedRoute>} /> */}
      </Routes>
    </Router>
  );
}

export default App;
