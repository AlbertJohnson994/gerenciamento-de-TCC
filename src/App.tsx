// import React from 'react';
// import { Provider } from 'react-redux';
// import { store } from './store/index';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from './components/Login/index';
// import Register from './components/Register/index';
// import Dashboard from './components/Dashboard/index';
// import Proposal from './components/Proposal/index';

// const App: React.FC = () => {
//   return (
//     <Provider store={store}>
//       <Router>
//         <Routes>
//           <Route path="/" element={<Login />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/proposal" element={<Proposal />} />
//         </Routes>
//       </Router>
//     </Provider>
//   );
// };

// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Register from "./Pages/Register";
import ProposalForm from "./Pages/Proposal";
import OrientatorDashboard from "./Pages/OrientadorDashboard";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/proposal" element={<ProposalForm />} />
        <Route path="/orientadordashboard" element={<OrientatorDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
