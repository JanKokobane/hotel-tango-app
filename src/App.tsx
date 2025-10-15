import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Register } from './Pages/Register';
import { Login } from './Pages/Login'; 
import React from 'react';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register onNavigateToLogin={function (): void {
          throw new Error('Function not implemented.');
        } } />} />
        <Route path="/login" element={<Login onNavigateToRegister={function (): void {
          throw new Error('Function not implemented.');
        } } />} />
      </Routes>
    </Router>
  );
}

export default App;
