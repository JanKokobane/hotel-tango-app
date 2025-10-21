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
import AboutUs from './Components/AboutUs/AboutUs'
import ContactUs from './Components/ContactUs/ContactUs'
import Footer from './Components/Footer/Footer'
import Login from './Pages/Login'
import RattingAndFAQ from './Components/RatingsAndFAQ/RatingsAndFAQ'
import Gallery from './Components/Gallery/Gallery'

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
              <AboutUs />
              <Gallery />
              <RattingAndFAQ />
              <ContactUs />
              <Footer />
            </>
          }
        />
        <Route path="/blog/new-years-eve-gala" element={<BlogNewYearsGala />} />
        <Route path="/blog/wine-pairing-masterclass" element={<BlogWinePairing />} />
        <Route path="/blog/hidden-gems-guide" element={<BlogHiddenGems />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
