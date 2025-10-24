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
import AdminReg from './Admin/components/AdminReg/AdminReg';
import { AdminLogin } from './Admin/components/AdminReg/AdminLogin';
import AdminDashboard from './Admin/AdminDashboard';
import ProtectedRoute from './ProtectedRoute';
import { Toaster } from 'react-hot-toast';

function PublicLayout() {
  const location = useLocation();
  const isAuthPage = [
    '/login',
    '/register',
    '/admin/adminreg',
    '/admin/login',
  ].includes(location.pathname);

  return (
    <>
      <Toaster position="top-right" />
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
        <Route path="/blog/new-years-eve-gala" element={<><BlogNewYearsGala /><Footer /></>} />
        <Route path="/blog/wine-pairing-masterclass" element={<><BlogWinePairing /><Footer /></>} />
        <Route path="/blog/hidden-gems-guide" element={<><BlogHiddenGems /><Footer /></>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Public pages */}
        <Route path="/*" element={<PublicLayout />} />

        {/* Admin pages */}
        <Route path="/admin/adminreg" element={<AdminReg />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
