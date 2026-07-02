import React from 'react';
import { Compass, Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';

const Footer = ({ onNavClick }) => {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (e, id) => {
    e.preventDefault();
    onNavClick(id);
  };

  return (
    <footer className="footer-bg">
      <div className="footer-grid">
        {/* Company Column */}
        <div className="footer-col">
          <a href="#" className="logo" style={{ color: '#FFF', marginBottom: '20px' }}>
            <Compass size={28} className="logo-icon" style={{ color: 'var(--secondary)' }} />
            DEURALI<span>TOURS</span>
          </a>
          <p className="footer-desc">
            Deurali Tour & Adventure is Pokhara's trusted private car & jeep booking service. From 24/7 instant cabs to Muktinath, Chitwan, and city sightseeing tours, we get you there safely and comfortably.
          </p>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Facebook">
              <Facebook size={18} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
              <Instagram size={18} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Twitter">
              <Twitter size={18} />
            </a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><a href="#home" onClick={(e) => handleLinkClick(e, 'home')}>Home</a></li>
            <li><a href="#packages" onClick={(e) => handleLinkClick(e, 'packages')}>Tour Packages</a></li>
            <li><a href="#fleet" onClick={(e) => handleLinkClick(e, 'fleet')}>Our Fleet</a></li>
            <li><a href="#destinations" onClick={(e) => handleLinkClick(e, 'destinations')}>Destinations</a></li>
            <li><a href="#gallery" onClick={(e) => handleLinkClick(e, 'gallery')}>Photo Gallery</a></li>
          </ul>
        </div>

        {/* Support Column */}
        <div className="footer-col">
          <h4>Support & Info</h4>
          <ul className="footer-links">
            <li><a href="#about" onClick={(e) => handleLinkClick(e, 'about')}>About Us</a></li>
            <li><a href="#contact" onClick={(e) => handleLinkClick(e, 'contact')}>Contact Us</a></li>
            <li><a href="#faq" onClick={(e) => handleLinkClick(e, 'faq')}>FAQs</a></li>
            <li><a href="#privacy">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Contact Details Column */}
        <div className="footer-col">
          <h4>Get In Touch</h4>
          <ul className="footer-contact-list">
            <li>
              <MapPin size={18} />
              <span>Lakeside-6, Pokhara, Nepal<br />Thamel, Kathmandu, Nepal</span>
            </li>
            <li>
              <Phone size={18} />
              <span>+977-61-469000<br />+977-98560-12345</span>
            </li>
            <li>
              <Mail size={18} />
              <span>info@deuralitravel.com<br />bookings@deuralitravel.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} Deurali Tour & Adventure Pvt. Ltd. All rights reserved.</p>
        <p>Designed with ❤️ for Nepali Adventure</p>
      </div>
    </footer>
  );
};

export default Footer;
