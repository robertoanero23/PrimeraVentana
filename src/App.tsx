import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Botones from './Components/Botones';
import GradosAvance from './Components/gradosAvance';
// Importa tu componente GradosAvance

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Botones />} />
        <Route path="/gradosAvance/:idProyecto" element={<GradosAvance />} />
      </Routes>
    </Router>
  );
};

export default App;
