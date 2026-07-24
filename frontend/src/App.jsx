import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';

import Home from './pages/Home';
import Booking from './pages/Booking';
import Services from './pages/Services';
import Fleet from './pages/Fleet';
import Packages from './pages/Packages';
import About from './pages/About';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery';
import Register from './pages/Register';

import { getAdminToken, clearAdminToken } from './utils/api.js';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [adminAuthed, setAdminAuthed] = useState(!!getAdminToken());
  
  // Data States
  const [packages, setPackages] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);

  // Selected package for details modal
  const [selectedPkg, setSelectedPkg] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      // Fetch packages
      const pkgRes = await fetch('/api/packages');
      const pkgData = await pkgRes.json();
      setPackages(pkgData);

      // Fetch fleet vehicles
      const vehicleRes = await fetch('/api/vehicles');
      const vehicleData = await vehicleRes.json();
      setVehicles(vehicleData);

      // Fetch testimonials
      const testRes = await fetch('/api/testimonials');
      const testData = await testRes.json();
      setTestimonials(testData);

      // Fetch gallery
      const galRes = await fetch('/api/gallery');
      const galData = await galRes.json();
      setGallery(galData);
    } catch (error) {
      console.error('Error fetching initial site data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDetails = (pkg) => {
    setSelectedPkg(pkg);
    setModalOpen(true);
  };

  const handleAdminLoginSuccess = () => {
    setAdminAuthed(true);
    navigate('/admin');
  };

  const handleAdminLogout = () => {
    clearAdminToken();
    setAdminAuthed(false);
    navigate('/');
  };

  // Determine if we should show header/footer (we hide them on admin/login/register pages if needed, let's keep it visible on register page!)
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isLoginRoute = location.pathname.startsWith('/login');
  const hideLayout = isAdminRoute || isLoginRoute;

  return (
    <div className="relative min-h-screen flex flex-col bg-gray-50 text-charcoal font-sans">
      {!hideLayout && (
        <Navbar 
          adminAuthed={adminAuthed} 
          handleLogout={handleAdminLogout} 
        />
      )}

      <main className={`flex-grow ${!hideLayout ? 'pt-20' : ''}`}>
        <Routes>
          <Route 
            path="/" 
            element={
              <Home 
                packages={packages} 
                vehicles={vehicles} 
                testimonials={testimonials} 
                handleOpenDetails={handleOpenDetails} 
              />
            } 
          />
          <Route path="/booking" element={<Booking />} />
          <Route path="/services" element={<Services />} />
          <Route path="/fleet" element={<Fleet vehicles={vehicles} />} />
          <Route 
            path="/packages" 
            element={
              <Packages 
                packages={packages} 
                handleOpenDetails={handleOpenDetails} 
              />
            } 
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/gallery" element={<Gallery gallery={gallery} />} />
          <Route path="/register" element={<Register />} />
          
          <Route 
            path="/login" 
            element={
              adminAuthed 
                ? <Navigate to="/admin" replace /> 
                : <AdminLogin onLoginSuccess={handleAdminLoginSuccess} onCancel={() => navigate('/')} />
            } 
          />
          
          <Route 
            path="/admin" 
            element={
              adminAuthed 
                ? <AdminDashboard handleLogout={handleAdminLogout} /> 
                : <Navigate to="/login" replace />
            } 
          />
          
          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {!hideLayout && <Footer />}

      {/* Details Modal */}
      <BookingModal 
        pkg={selectedPkg} 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
      />
    </div>
  );
}