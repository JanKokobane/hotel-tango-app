import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import React from 'react';
import Navbar from './Components/Navbar/Navbar';
import Hero from './Pages/Hero';
import { RoomsSection } from './Components/RoomsSection/RoomsSection';
import HotelAmenities from './Components/HotelAmenities/HotelAmenities';
import LatestNewsEvents from './Components/NewsEvents/LatestNewsEvents';
import BlogNewYearsGala from './Components/NewsEvents/Blog/BlogNewYearsGala';
import BlogWinePairing from './Components/NewsEvents/Blog/BlogWinePairing';
import BlogHiddenGems from './Components/NewsEvents/Blog/BlogHiddenGems';
import AboutUs from './Components/AboutUs/AboutUs';
import ContactUs from './Components/ContactUs/ContactUs';
import Footer from './Components/Footer/Footer';
import Login from './Pages/Login';
import RattingAndFAQ from './Components/RatingsAndFAQ/RatingsAndFAQ';
import Gallery from './Components/Gallery/Gallery';
import ScrollToHash from './ScrollToHash';
import Register from './Pages/Register';
import AdminDashboard from './Admin/AdminDashboard';


function LayoutWrapper() {
  const location = useLocation();
  const isAuthPage = ['/login', '/register'].includes(location.pathname);

  return (
    <>
      {!isAuthPage && <Navbar />}
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
              {!isAuthPage && <Footer />}
              <ScrollToHash />
            </>
          }
        />
        <Route
          path="/blog/new-years-eve-gala"
          element={
            <>
              <BlogNewYearsGala />
              {!isAuthPage && <Footer />}
            </>
          }
        />
        <Route
          path="/blog/wine-pairing-masterclass"
          element={
            <>
              <BlogWinePairing />
              {!isAuthPage && <Footer />}
            </>
          }
        />
        <Route
          path="/blog/hidden-gems-guide"
          element={
            <>
              <BlogHiddenGems />
              {!isAuthPage && <Footer />}
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <LayoutWrapper />
    </Router>
  );
}

export default App;
