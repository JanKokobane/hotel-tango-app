import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Navbar from './Components/Navbar/Navbar';
import Hero from './Pages/Hero';
import { RoomsSection } from './Components/RoomsSection/RoomsSection';
import HotelAmenities from './Components/HotelAmenities/HotelAmenities';
import LatestNewsEvents from './Components/NewsEvents/LatestNewsEvents';
import BlogNewYearsGala from './Components/NewsEvents/Blog/BlogNewYearsGala';
import BlogWinePairing from './Components/NewsEvents/Blog/BlogWinePairing';
import BlogHiddenGems from './Components/NewsEvents/Blog/BlogHiddenGems';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <RoomsSection />
              <HotelAmenities />
              <LatestNewsEvents />
            </>
          }
        />
        <Route path="/blog/new-years-eve-gala" element={<BlogNewYearsGala />} />
        <Route path="/blog/wine-pairing-masterclass" element={<BlogWinePairing />} />
        <Route path="/blog/hidden-gems-guide" element={<BlogHiddenGems />} />
      </Routes>
    </Router>
  );
}

export default App;
