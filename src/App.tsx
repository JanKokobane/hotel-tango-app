import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Navbar from './Components/Navbar/Navbar';
import Hero from './Pages/Hero';
import { RoomsSection } from './Components/RoomsSection/RoomsSection';
import HotelAmenities from './Components/HotelAmenities/HotelAmenities';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Hero />
              <RoomsSection />
              <HotelAmenities />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
