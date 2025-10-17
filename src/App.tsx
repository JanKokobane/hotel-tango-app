import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  
import { Register } from './Pages/Register';
import { Login } from './Pages/Login'; 
import React from 'react';
import Navbar from './Components/Navbar/Navbar';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Register />
            </>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
