import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Compass, MapPin, Clock, Star, ArrowRight, ShieldCheck, 
  Map, UserCheck, CheckCircle, ChevronDown, Phone, Mail, Send,
  Car, Users, Zap, PlaneTakeoff, Building2, Route, Briefcase,
  Settings2, Luggage, Snowflake, BadgeCheck
} from 'lucide-react';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';
import { getAdminToken } from './utils/api.js';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [adminMode, setAdminMode] = useState(false);
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

  // Gallery filter category
  const [galleryFilter, setGalleryFilter] = useState('all');
  
  // Lightbox State
  const [lightboxImg, setLightboxImg] = useState(null);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // Contact Form State
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submittingContact, setSubmittingContact] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactError, setContactError] = useState('');

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

  const handleBookNowShortcut = () => {
    if (packages.length > 0) {
      handleOpenDetails(packages[0]);
    } else {
      handleOpenDetails({ name: 'Book a Ride', vehicleType: '', maxGroupSize: 12 });
    }
  };

  const handleBookVehicle = (vehicle) => {
    handleOpenDetails({
      name: `Book a ${vehicle.name}`,
      image: vehicle.image,
      vehicleType: vehicle.type,
      maxGroupSize: vehicle.seats
    });
  };

  const handleBookDestination = (dest) => {
    handleOpenDetails({
      name: `Ride to ${dest.name}`,
      image: dest.image,
      location: dest.region,
      defaultDestination: dest.name,
      maxGroupSize: 12
    });
  };

  // FAQ Items
  const faqItems = [
    {
      q: "How quickly can I book a cab?",
      a: "For instant cab bookings within Pokhara or Kathmandu, call our 24/7 hotline and a car is usually with you within 15-30 minutes depending on traffic and availability. For multi-day tours like Muktinath or Chitwan, we recommend booking at least a day in advance so we can prepare the right vehicle and driver."
    },
    {
      q: "Are your drivers licensed and experienced?",
      a: "Yes. All Deurali drivers are licensed, background-checked, and experienced on their assigned routes, from Pokhara city roads to the mountain tracks up to Muktinath. Our Scorpio drivers in particular are experienced with high-altitude and off-road driving."
    },
    {
      q: "What is included in the fare?",
      a: "Our quoted price includes the vehicle, driver, fuel, and applicable tolls for the route described in the package. Meals, accommodation on overnight tours (unless stated), entrance fees, and personal expenses are not included unless specified in the package details."
    },
    {
      q: "Can I choose between the Creta and the Scorpio?",
      a: "Yes, subject to availability. The Hyundai Creta is best suited for city sightseeing and paved roads, while the Mahindra Scorpio is recommended for mountain routes like Muktinath and jungle terrain like Chitwan. Let us know your preference when booking and we'll confirm the best fit."
    },
    {
      q: "Can I customize a tour itinerary or book a private trip?",
      a: "Absolutely. We're happy to adjust pickup times, add stops, or build a custom day-trip or multi-day itinerary around your schedule. Contact our team through the inquiry form below to arrange a custom route."
    }
  ];

  // Our Services
  const services = [
    { title: '24/7 Car Booking', desc: 'Instant or scheduled bookings, any hour of the day or night.', icon: <Clock size={26} /> },
    { title: 'Airport Pickup & Drop', desc: 'On-time transfers to and from Pokhara and Kathmandu airports.', icon: <PlaneTakeoff size={26} /> },
    { title: 'Hotel Pickup & Drop', desc: 'Door-to-door service from your hotel or guesthouse.', icon: <Building2 size={26} /> },
    { title: 'Tourist Transportation', desc: 'Comfortable rides to every major sightseeing spot in Nepal.', icon: <Compass size={26} /> },
    { title: 'Intercity Travel', desc: 'Reliable long-distance rides between cities across the country.', icon: <Route size={26} /> },
    { title: 'Sightseeing Tours', desc: 'Guided day tours with a knowledgeable local driver.', icon: <Map size={26} /> },
    { title: 'Family Trips', desc: 'Spacious, safe vehicles suited for family travel with kids.', icon: <Users size={26} /> },
    { title: 'Corporate Travel', desc: 'Dependable transport for business meetings and events.', icon: <Briefcase size={26} /> },
    { title: 'Customized Travel Plans', desc: 'Tell us your route and schedule, we\'ll build the plan.', icon: <Settings2 size={26} /> }
  ];

  // Destinations static list
  const destinations = [
    { name: 'Pokhara', region: 'Gandaki Province', desc: 'Lakeside city framed by the Annapurna range, boating, and mountain views.', sizeClass: 'large', image: 'https://images.unsplash.com/photo-1558862107-d49ef2a04d72?auto=format&fit=crop&w=800&q=80' },
    { name: 'Kathmandu', region: 'Bagmati Province', desc: 'The capital city, home to UNESCO heritage sites and vibrant culture.', sizeClass: 'large', image: 'https://images.unsplash.com/photo-1582578598191-c12185749f06?auto=format&fit=crop&w=800&q=80' },
    { name: 'Chitwan', region: 'Terai Lowlands', desc: 'Jungle safaris and wildlife spotting in Chitwan National Park.', sizeClass: 'large', image: 'https://images.unsplash.com/photo-1581888227599-779811939961?auto=format&fit=crop&w=800&q=80' },
    { name: 'Mustang', region: 'Upper Mustang', desc: 'Dramatic high-desert landscapes and ancient walled towns.', sizeClass: 'medium', image: 'https://images.unsplash.com/photo-1627856013091-fed6e4e30025?auto=format&fit=crop&w=800&q=80' },
    { name: 'Lumbini', region: 'Lumbini Province', desc: 'The sacred birthplace of Lord Buddha, a UNESCO World Heritage Site.', sizeClass: 'medium', image: 'https://images.unsplash.com/photo-1582578598191-c12185749f06?auto=format&fit=crop&w=800&q=80' },
    { name: 'Bandipur', region: 'Gandaki Province', desc: 'A preserved hilltop Newari village with panoramic mountain views.', sizeClass: 'medium', image: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80' },
    { name: 'Sarangkot', region: 'Pokhara Valley', desc: 'The best sunrise viewpoint over the Annapurna and Fishtail peaks.', sizeClass: 'small', image: 'https://images.unsplash.com/photo-1486916856992-e4db22c8df33?auto=format&fit=crop&w=800&q=80' },
    { name: 'Nagarkot', region: 'Bagmati Province', desc: 'A hillside retreat near Kathmandu known for Himalayan sunrise views.', sizeClass: 'small', image: 'https://images.unsplash.com/photo-1486916856992-e4db22c8df33?auto=format&fit=crop&w=800&q=80' },
    { name: 'Ghandruk', region: 'Annapurna Region', desc: 'A picturesque Gurung village set against the Annapurna foothills.', sizeClass: 'small', image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80' },
    { name: 'Janakpur', region: 'Madhesh Province', desc: 'A historic temple town and birthplace of Goddess Sita.', sizeClass: 'small', image: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80' },
    { name: 'Ilam', region: 'Koshi Province', desc: 'Rolling green tea gardens in the eastern hills of Nepal.', sizeClass: 'small', image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80' },
    { name: 'Rara Lake', region: 'Karnali Province', desc: 'Nepal\'s largest and most remote alpine lake, pristine and untouched.', sizeClass: 'small', image: 'https://images.unsplash.com/photo-1558862107-d49ef2a04d72?auto=format&fit=crop&w=800&q=80' }
  ];

  // Our Fleet is now fetched from /api/vehicles (see fetchInitialData) so it can be
  // managed from the Admin Panel instead of being hardcoded here.

  // Why Choose Us features
  const features = [
    {
      title: 'Professional Drivers',
      desc: 'Every trip comes with an experienced, licensed local driver who knows the roads, whether it\'s a quick city hop or a mountain pass to Muktinath.',
      icon: <UserCheck size={28} />
    },
    {
      title: '24/7 Instant Booking',
      desc: 'Need a cab right now or planning weeks ahead? Call, message, or book online any time, day or night, for instant confirmation.',
      icon: <Zap size={28} />
    },
    {
      title: 'Well-Maintained Fleet',
      desc: 'Our Hyundai Creta and Mahindra Scorpio are regularly serviced, clean, and equipped for both city sightseeing and rugged mountain routes.',
      icon: <Car size={28} />
    },
    {
      title: 'Transparent Fixed Pricing',
      desc: 'Know your fare upfront. No hidden surcharges, no meter surprises, just clear pricing for every tour and cab booking.',
      icon: <CheckCircle size={28} />
    }
  ];

  // Contact form submission
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setSubmittingContact(true);
    setContactError('');
    setContactSuccess(false);

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm)
      });
      const data = await res.json();
      if (res.ok) {
        setContactSuccess(true);
        setContactForm({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setContactError(data.message || 'Error sending message.');
      }
    } catch (err) {
      setContactError('Network error. Please try again.');
    } finally {
      setSubmittingContact(false);
    }
  };

  const handleNavScroll = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Filtered gallery items
  const filteredGallery = galleryFilter === 'all'
    ? gallery
    : gallery.filter(item => item.category === galleryFilter);

  // RENDER ADMIN DASHBOARD VIEW
  if (adminMode) {
    if (!adminAuthed) {
      return (
        <AdminLogin
          onLoginSuccess={() => setAdminAuthed(true)}
          onCancel={() => setAdminMode(false)}
        />
      );
    }
    return (
      <div style={{ backgroundColor: 'var(--bg-base)', minHeight: '100vh' }}>
        <Navbar 
          adminMode={adminMode} 
          setAdminMode={setAdminMode} 
          activeSection={activeSection} 
          setActiveSection={setActiveSection} 
          onBookNow={handleBookNowShortcut}
        />
        <AdminDashboard setAdminMode={setAdminMode} />
        {/* Floating action to return to site */}
        <div className="back-to-site-btn" onClick={() => setAdminMode(false)} title="Go back to website">
          <ArrowRight size={24} style={{ transform: 'rotate(180deg)' }} />
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative' }}>
      
      {/* Navbar */}
      <Navbar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
        adminMode={adminMode} 
        setAdminMode={setAdminMode} 
        onBookNow={handleBookNowShortcut}
      />

      {/* 1. Hero Section */}
      <header id="home" className="hero">
        <video 
          className="hero-media" 
          autoPlay 
          loop 
          muted 
          playsInline
          poster="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80"
        >
          {/* Static premium image fallback if video not playing, but we can also use premium scenic image */}
        </video>
        {/* Visual fallback/backdrop */}
        <div 
          className="hero-media" 
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1486916856992-e4db22c8df33?auto=format&fit=crop&w=1920&q=80')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h1 className="hero-headline">
              24/7 Car Booking<br /><span>Service Across Nepal</span>
            </h1>
            <p className="hero-description">
              Travel safely and comfortably with professional drivers. Book your ride anytime for airport transfers, sightseeing, business trips, family travel, and intercity journeys throughout Nepal.
            </p>
            <div className="hero-ctas">
              <button className="btn btn-primary" onClick={handleBookNowShortcut}>
                <Car size={18} /> Book Now
              </button>
              <button className="btn btn-outline-white" onClick={() => handleNavScroll('fleet')}>
                View Our Fleet <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Instant Booking Banner */}
      <section className="section" style={{ padding: '28px 24px', backgroundColor: 'var(--primary-dark)', width: '100vw', maxWidth: 'none' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', color: '#FFF' }}>
            <Zap size={26} style={{ color: 'var(--secondary)', flexShrink: 0 }} />
            <div>
              <h3 style={{ color: '#FFF', fontSize: '1.15rem', margin: 0 }}>Need a cab right now?</h3>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.9rem', margin: 0 }}>We offer 24/7 instant cab booking across Pokhara &amp; Kathmandu.</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a className="btn btn-primary" href="tel:+9779856012345">
              <Phone size={16} /> Call Now
            </a>
            <a className="btn btn-outline-white" href="https://wa.me/9779856012345" target="_blank" rel="noopener noreferrer">
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section">
        <div className="text-center">
          <span className="section-tag">What We Offer</span>
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">
            One trusted fleet for every kind of journey, from a quick airport run to a multi-day trip across Nepal.
          </p>
        </div>

        <div className="grid-3">
          {services.map((svc, index) => (
            <motion.div
              className="feature-card"
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
            >
              <div className="feature-icon-wrapper">
                {svc.icon}
              </div>
              <h3>{svc.title}</h3>
              <p>{svc.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 2. Why Choose Us */}
      <section id="about" className="section">
        <div className="text-center">
          <span className="section-tag">Why Deurali</span>
          <h2 className="section-title">Comfortable, Reliable Rides</h2>
          <p className="section-subtitle">
            We provide a safe, comfortable, and dependable private car & jeep booking service. Here is why travelers and locals choose Deurali.
          </p>
        </div>

        <div className="grid-4">
          {features.map((feat, index) => (
            <motion.div 
              className="feature-card" 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="feature-icon-wrapper">
                {feat.icon}
              </div>
              <h3>{feat.title}</h3>
              <p>{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Our Fleet */}
      <section id="fleet" className="section" style={{ backgroundColor: 'rgba(45, 106, 79, 0.03)', width: '100vw', maxWidth: 'none' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div className="text-center">
            <span className="section-tag">Our Vehicles</span>
            <h2 className="section-title">Our Fleet</h2>
            <p className="section-subtitle">
              From a compact sedan for city sightseeing to a spacious Hiace for group tours, choose the vehicle that fits your trip.
            </p>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <p style={{ color: 'var(--text-muted)' }}>Loading our fleet...</p>
            </div>
          ) : vehicles.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <p style={{ color: 'var(--text-muted)' }}>No vehicles available right now. Please check back soon.</p>
            </div>
          ) : (
          <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {vehicles.map((v, index) => (
              <motion.div
                className="package-card"
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="package-img-wrapper">
                  <img className="package-img" src={v.image} alt={v.name} loading="lazy" />
                  <span className="package-badge">{v.type}</span>
                </div>
                <div className="package-content">
                  <div className="package-meta">
                    <span><Users size={14} /> {v.seats} Passengers</span>
                    <span><Luggage size={14} /> {v.luggage}</span>
                  </div>
                  <h3 className="package-title">{v.name}</h3>
                  <div className="vehicle-spec-row">
                    {v.driverIncluded && (
                      <span className="vehicle-spec-pill"><UserCheck size={14} /> Driver Included</span>
                    )}
                    {v.ac && (
                      <span className="vehicle-spec-pill"><Snowflake size={14} /> Air Conditioned</span>
                    )}
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '12px 0 0 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {v.features.map((f, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                        <CheckCircle size={16} style={{ color: 'var(--primary)', marginTop: '2px', flexShrink: 0 }} />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="package-footer" style={{ marginTop: '16px' }}>
                    <button className="package-action" onClick={() => handleBookVehicle(v)}>
                      Book Now <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          )}
        </div>
      </section>
      <section id="packages" className="section" style={{ backgroundColor: 'rgba(45, 106, 79, 0.03)', width: '100vw', maxWidth: 'none' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div className="text-center">
            <span className="section-tag">Tour Packages</span>
            <h2 className="section-title">Popular Tour Packages</h2>
            <p className="section-subtitle">
              Private car & jeep tours to Nepal's most-loved destinations, with an experienced driver and fixed, transparent pricing.
            </p>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <p style={{ color: 'var(--text-muted)' }}>Loading tour packages...</p>
            </div>
          ) : (
            <div className="grid-3">
              {packages.map((pkg, index) => (
                <motion.div 
                  className="package-card" 
                  key={pkg._id || index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="package-img-wrapper">
                    <img className="package-img" src={pkg.image} alt={pkg.name} loading="lazy" />
                    <span className="package-badge">{pkg.difficulty}</span>
                    <span className="package-price-badge">Rs. {pkg.price}</span>
                  </div>
                  <div className="package-content">
                    <div className="package-meta">
                      <span><MapPin size={14} /> {pkg.location}</span>
                      <span><Clock size={14} /> {pkg.duration} Days</span>
                    </div>
                    <h3 className="package-title">{pkg.name}</h3>
                    <p className="package-desc">{pkg.shortDescription}</p>
                    <div className="package-footer">
                      <div className="package-rating">
                        <Star size={14} /> <span>{pkg.rating || '4.8'}</span>
                      </div>
                      <button className="package-action" onClick={() => handleOpenDetails(pkg)}>
                        View Details <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. Popular Destinations */}
      <section id="destinations" className="section">
        <div className="text-center">
          <span className="section-tag">Wonders of Nepal</span>
          <h2 className="section-title">Popular Destinations</h2>
          <p className="section-subtitle">
            Reach Nepal's most beautiful regions in comfort, from lakeside cities to sacred temples and remote mountain lakes, all just a private car ride away.
          </p>
        </div>

        <div className="destinations-grid">
          {destinations.map((dest, index) => (
            <motion.div 
              className={`destination-item ${dest.sizeClass}`}
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <img src={dest.image} alt={dest.name} loading="lazy" />
              <div className="destination-overlay">
                <h3 className="destination-title">{dest.name}</h3>
                <span className="destination-location"><MapPin size={12} /> {dest.region}</span>
                <p className="destination-desc">{dest.desc}</p>
                <button
                  className="destination-book-btn"
                  onClick={(e) => { e.stopPropagation(); handleBookDestination(dest); }}
                >
                  Book a Ride <ArrowRight size={13} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. Customer Testimonials */}
      <section className="section" style={{ backgroundColor: 'rgba(45, 106, 79, 0.03)', width: '100vw', maxWidth: 'none' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div className="text-center">
            <span className="section-tag">Client Reviews</span>
            <h2 className="section-title">Stories from the Road</h2>
            <p className="section-subtitle">
              Read personal experiences from travelers who booked cars, jeeps, and tours with the Deurali team.
            </p>
          </div>

          <div className="grid-3">
            {testimonials.map((test, index) => (
              <motion.div 
                className="testimonial-card"
                key={test._id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="testimonial-stars">
                  {[...Array(test.rating)].map((_, i) => <Star key={i} />)}
                </div>
                <p className="testimonial-text">"{test.text}"</p>
                <div className="testimonial-user">
                  <img className="testimonial-avatar" src={test.photo} alt={test.clientName} />
                  <div className="testimonial-details">
                    <h4>{test.clientName}</h4>
                    <span>{test.country}</span>
                    <span className="tour-tag">{test.trekName}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Gallery Section */}
      <section id="gallery" className="section">
        <div className="text-center">
          <span className="section-tag">Visual Portfolio</span>
          <h2 className="section-title">Nepal Through the Lens</h2>
          <p className="section-subtitle">
            Mountain roads, city sights, and wildlife encounters. View our collection of moments captured on the road.
          </p>
        </div>

        {/* Gallery Filter buttons */}
        <div className="gallery-filters">
          {['all', 'sightseeing', 'nature', 'culture', 'adventure', 'wildlife'].map(cat => (
            <button
              key={cat}
              className={`filter-btn ${galleryFilter === cat ? 'active' : ''}`}
              onClick={() => setGalleryFilter(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Gallery masonry layout */}
        {loading ? (
          <div style={{ textAlign: 'center' }}>Loading photography portfolio...</div>
        ) : (
          <div className="gallery-grid">
            {filteredGallery.map((img, index) => (
              <motion.div 
                className="gallery-item"
                key={img._id || index}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                onClick={() => setLightboxImg(img)}
              >
                <img src={img.url} alt={img.title} loading="lazy" />
                <div className="gallery-item-overlay">
                  <h4 className="gallery-item-title">{img.title}</h4>
                  <span className="gallery-item-loc"><MapPin size={12} style={{ display: 'inline', marginRight: '4px' }} />{img.location}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* 7. FAQ Section */}
      <section id="faq" className="section" style={{ backgroundColor: 'rgba(27, 67, 50, 0.02)', width: '100vw', maxWidth: 'none' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div className="text-center">
            <span className="section-tag">Information Desk</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">
              Everything you need to know before booking a cab or tour with us.
            </p>
          </div>

          <div className="faq-container">
            {faqItems.map((item, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div 
                  className={`faq-item ${isOpen ? 'open' : ''}`} 
                  key={index}
                >
                  <div 
                    className="faq-question" 
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  >
                    <span>{item.q}</span>
                    <ChevronDown size={18} className="faq-icon" />
                  </div>
                  <div className="faq-answer">
                    <div className="faq-answer-inner">
                      <p>{item.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. Contact & Inquiry Section */}
      <section id="contact" className="section">
        <div className="text-center">
          <span className="section-tag">Start Planning</span>
          <h2 className="section-title">Talk to Our Booking Team</h2>
          <p className="section-subtitle">
            Need details about a route, vehicle availability, or custom group pricing? Reach out to our base office.
          </p>
        </div>

        <div className="contact-layout">
          {/* Info Details */}
          <div className="contact-info-panel">
            <div className="contact-card-item">
              <div className="contact-card-icon">
                <MapPin size={24} />
              </div>
              <div className="contact-card-details">
                <h4>Main Office</h4>
                <p>Lakeside Street-6, Pokhara, Nepal</p>
                <p>Thamel Tourist Hub, Kathmandu, Nepal</p>
              </div>
            </div>

            <div className="contact-card-item">
              <div className="contact-card-icon">
                <Phone size={24} />
              </div>
              <div className="contact-card-details">
                <h4>Call Office</h4>
                <p>Hotline: <a href="tel:+97761469000">+977-61-469000</a></p>
                <p>WhatsApp: <a href="tel:+9779856012345">+977-98560-12345</a></p>
              </div>
            </div>

            <div className="contact-card-item">
              <div className="contact-card-icon">
                <Mail size={24} />
              </div>
              <div className="contact-card-details">
                <h4>Email Inquiries</h4>
                <p><a href="mailto:info@deuralitravel.com">info@deuralitravel.com</a></p>
                <p><a href="mailto:bookings@deuralitravel.com">bookings@deuralitravel.com</a></p>
              </div>
            </div>

            {/* Google Map */}
            <div className="map-wrapper">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14059.600989397637!2d83.9575971485604!3d28.20973347101784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3995951cd5f309a5%3A0x6b4be933221b960a!2sLakeside%20Rd%2C%20Pokhara%2033700!5e0!3m2!1sen!2snp!4v1719280000000!5m2!1sen!2snp" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Deurali Office Map Location"
              />
            </div>
          </div>

          {/* Form */}
          <div className="contact-form-panel">
            <h3 style={{ fontSize: '1.5rem', marginBottom: '24px', color: 'var(--primary-dark)' }}>Send an Inquiry</h3>
            {contactSuccess ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <CheckCircle size={56} style={{ color: 'var(--primary)', marginBottom: '16px' }} />
                <h4 style={{ fontSize: '1.25rem', color: 'var(--primary-dark)', marginBottom: '8px' }}>Inquiry Sent Successfully!</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Our booking team will respond via email/phone within 12 hours. For urgent same-day bookings, please call our hotline.</p>
                <button className="btn btn-primary" style={{ marginTop: '24px' }} onClick={() => setContactSuccess(false)}>
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit}>
                <div className="form-group-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="contactName">Your Name</label>
                    <input 
                      type="text" 
                      id="contactName"
                      className="form-control" 
                      required 
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="contactEmail">Email Address</label>
                    <input 
                      type="email" 
                      id="contactEmail"
                      className="form-control" 
                      required 
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="contactPhone">Phone Number</label>
                    <input 
                      type="tel" 
                      id="contactPhone"
                      className="form-control" 
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="contactSubject">Subject</label>
                    <input 
                      type="text" 
                      id="contactSubject"
                      className="form-control" 
                      required 
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contactMessage">Message / Questions</label>
                  <textarea 
                    id="contactMessage"
                    className="form-control" 
                    required 
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  />
                </div>

                {contactError && (
                  <p style={{ color: '#DC2626', fontSize: '0.9rem', marginBottom: '16px', fontWeight: 500 }}>
                    {contactError}
                  </p>
                )}

                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  style={{ width: '100%', padding: '14px 0' }}
                  disabled={submittingContact}
                >
                  {submittingContact ? 'Sending Inquiry...' : (
                    <>Send Inquiry <Send size={16} /></>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer onNavClick={handleNavScroll} />

      {/* Ride & Tour Booking Modal */}
      <BookingModal 
        pkg={selectedPkg}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />

      {/* Lightbox Modal */}
      {lightboxImg && (
        <div className="lightbox-modal" onClick={() => setLightboxImg(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <span className="lightbox-close" onClick={() => setLightboxImg(null)}>&times;</span>
            <img className="lightbox-img" src={lightboxImg.url} alt={lightboxImg.title} />
            <div style={{ color: '#FFF', marginTop: '12px', textAlign: 'center' }}>
              <h4 style={{ fontFamily: 'var(--font-header)', fontSize: '1.25rem' }}>{lightboxImg.title}</h4>
              <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}>{lightboxImg.location}</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;