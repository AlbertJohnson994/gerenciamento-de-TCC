// import React from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import { useSelector } from "react-redux";
// import type { RootState } from "./store";

// // Component imports
// import Header from "./components/Header";
// import Login from "./Pages/Login";
// import Register from "./Pages/Register";
// import Dashboard from "./Pages/Dashboard";
// import OrientadorDashboard from "./Pages/OrientadorDashboard";
// import Proposal from "./Pages/Proposal";
// import ForgotPasswordPage from "./Pages/ForgotPassword";
// import { ProtectedRoute } from "./components/ProtectedRoute";

// const App: React.FC = () => {
//   const { token, user } = useSelector((state: RootState) => state.auth);

//   return (
//     <Router>
//       <div className="App">
//         {token && <Header />}

//         <main className="container">
//           <Routes>
//             {/* Public routes */}
//             <Route
//               path="/login"
//               element={token ? <Navigate to="/dashboard" replace /> : <Login />}
//             />
//             <Route
//               path="/register"
//               element={
//                 token ? <Navigate to="/dashboard" replace /> : <Register />
//               }
//             />
//             <Route
//               path="/forgot-password"
//               element={
//                 token ? (
//                   <Navigate to="/dashboard" replace />
//                 ) : (
//                   <ForgotPasswordPage />
//                 )
//               }
//             />

//             {/* Protected dashboard route */}
//             <Route
//               path="/dashboard"
//               element={
//                 <ProtectedRoute>
//                   {user?.role === "ORIENTADOR" ? (
//                     <OrientadorDashboard />
//                   ) : (
//                     <Dashboard />
//                   )}
//                 </ProtectedRoute>
//               }
//             />

//             {/* Other protected routes */}
//             <Route
//               path="/proposals"
//               element={
//                 <ProtectedRoute requiredRole="STUDENT">
//                   <Proposal />
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
//               element={
//                 <Navigate to={token ? "/dashboard" : "/login"} replace />
//               }
//             />

//             {/* 404 */}
//             <Route path="*" element={<div>Página não encontrada</div>} />
//           </Routes>
//         </main>
//       </div>
//     </Router>
//   );
// };

// export default App;


import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "./store";

// Pages
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ForgotPasswordPage from "./Pages/ForgotPassword";
import Dashboard from "./Pages/Dashboard";
import OrientadorDashboard from "./Pages/OrientadorDashboard";
import Proposal from "./Pages/Proposal";

// Components
import Header from "./components/Header";
import { ProtectedRoute } from "./components/ProtectedRoute";

const App: React.FC = () => {
  const { token, user } = useSelector((state: RootState) => state.auth);

  return (
    <Router>
      <div className="App">
        {token && <Header />}

        <main className="container">
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={token ? <Navigate to="/dashboard" /> : <Login />} />
            <Route path="/register" element={token ? <Navigate to="/dashboard" /> : <Register />} />
            <Route path="/forgot-password" element={token ? <Navigate to="/dashboard" /> : <ForgotPasswordPage />} />

            {/* Protected routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  {user?.role === "ORIENTADOR" ? <OrientadorDashboard /> : <Dashboard />}
                </ProtectedRoute>
              }
            />

            <Route
              path="/proposals"
              element={
                <ProtectedRoute requiredRole="STUDENT">
                  <Proposal />
                </ProtectedRoute>
              }
            />

            <Route
              path="/orientador/proposals"
              element={
                <ProtectedRoute requiredRole="ORIENTADOR">
                  <OrientadorDashboard />
                </ProtectedRoute>
              }
            />

            {/* Default route */}
            <Route path="/" element={<Navigate to={token ? "/dashboard" : "/login"} replace />} />

            {/* 404 */}
            <Route path="*" element={<div>Página não encontrada</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
