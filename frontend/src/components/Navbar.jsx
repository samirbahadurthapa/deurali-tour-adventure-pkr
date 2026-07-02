import React, { useState, useEffect } from 'react';
import { Compass, Menu, X, ShieldAlert } from 'lucide-react';

const Navbar = ({ activeSection, setActiveSection, adminMode, setAdminMode, onBookNow }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'fleet', label: 'Our Fleet' },
    { id: 'packages', label: 'Tour Packages' },
    { id: 'destinations', label: 'Destinations' },
    { id: 'about', label: 'About' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (id) => {
    setAdminMode(false);
    setActiveSection(id);
    setMobileMenuOpen(false);
    
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
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
    }
  };

  return (
    <div className={`navbar-container glass ${scrolled ? 'scrolled' : ''}`}>
      <nav className="navbar">
        <a href="#" className="logo" onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}>
          <Compass size={28} className="logo-icon" />
          DEURALI<span>TOURS</span>ADVENTURE
        </a>

        {/* Desktop Menu */}
        {!adminMode ? (
          <ul className="nav-menu">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.id);
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <div className="nav-menu">
            <span style={{ color: 'var(--secondary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldAlert size={20} />
              Admin Portal
            </span>
          </div>
        )}

        <div className="nav-actions">
          {adminMode ? (
            <button className="btn btn-secondary" onClick={() => setAdminMode(false)}>
              Exit Admin
            </button>
          ) : (
            <>
              <button 
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.85rem', color: 'var(--text-muted)' }}
                onClick={() => setAdminMode(true)}
              >
                Admin Panel
              </button>
              <button className="btn btn-primary" onClick={onBookNow}>
                Book Now
              </button>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="nav-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="nav-menu open">
          {!adminMode ? (
            <>
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.id);
                  }}
                >
                  {link.label}
                </a>
              ))}
              <div className="nav-actions-mobile">
                <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => { setMobileMenuOpen(false); onBookNow(); }}>
                  Book Now
                </button>
                <button 
                  style={{ marginTop: '10px', color: 'var(--text-muted)' }}
                  onClick={() => { setMobileMenuOpen(false); setAdminMode(true); }}
                >
                  Admin Panel
                </button>
              </div>
            </>
          ) : (
            <>
              <span style={{ color: 'var(--secondary)', fontWeight: 600, fontSize: '1.25rem' }}>Admin Portal</span>
              <button className="btn btn-primary" onClick={() => { setMobileMenuOpen(false); setAdminMode(false); }}>
                Exit Admin Mode
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
