import React, { useState, useEffect, useCallback } from "react";
import {
  Compass,
  Menu,
  X,
  CalendarCheck,
  Phone,
  ShieldAlert,
} from "lucide-react";

const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "destinations", label: "Destinations" },
  { id: "fleet", label: "Our Fleet" },
  { id: "packages", label: "Tour Packages" },
  { id: "services", label: "Services" },
  { id: "gallery", label: "Gallery" },
  { id: "about", label: "About Us" },
  { id: "contact", label: "Contact" },
];

const Navbar = ({
  activeSection,
  setActiveSection,
  adminMode,
  setAdminMode,
  onBookNow,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = useCallback(
    (id) => {
      setAdminMode(false);
      setActiveSection(id);
      setMobileMenuOpen(false);

      if (id === "home") {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        return;
      }

      const section = document.getElementById(id);

      if (section) {
        window.scrollTo({
          top: section.offsetTop - 80,
          behavior: "smooth",
        });
      }
    },
    [setActiveSection, setAdminMode]
  );

  return (
    <header className={`navbar-container glass ${scrolled ? "scrolled" : ""}`}>
      <nav className="navbar">

        {/* Logo */}
        <button
          className="logo"
          onClick={() => handleNavClick("home")}
          aria-label="Go to Home"
        >
          <Compass size={30} className="logo-icon" />

          <div className="logo-text">
            <span className="logo-main">DEURALI</span>
            <span className="logo-highlight"> TOURS</span>
            <span className="logo-sub"> & TRAVELS</span>
          </div>
        </button>

        {/* Desktop Navigation */}
        {!adminMode ? (
          <ul className="nav-menu">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <button
                  className={`nav-link ${
                    activeSection === link.id ? "active" : ""
                  }`}
                  onClick={() => handleNavClick(link.id)}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="nav-menu">
            <span className="admin-label">
              <ShieldAlert size={18} />
              Admin Portal
            </span>
          </div>
        )}

        {/* Right Side */}
        <div className="nav-actions">
          {adminMode ? (
            <button
              className="btn btn-secondary"
              onClick={() => setAdminMode(false)}
            >
              Exit Admin
            </button>
          ) : (
            <>
              <div className="phone-number">
                <Phone size={16} />
                <span>+977-98XXXXXXXX</span>
              </div>

              <button
                className="btn btn-primary"
                onClick={onBookNow}
              >
                <CalendarCheck size={18} />
                Book Now
              </button>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="nav-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu">

          {!adminMode ? (
            <>
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  className={`nav-link ${
                    activeSection === link.id ? "active" : ""
                  }`}
                  onClick={() => handleNavClick(link.id)}
                >
                  {link.label}
                </button>
              ))}

              <div className="phone-number mobile-phone">
                <Phone size={16} />
                <span>+977-98XXXXXXXX</span>
              </div>

              <button
                className="btn btn-primary"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onBookNow();
                }}
              >
                <CalendarCheck size={18} />
                Book Now
              </button>
            </>
          ) : (
            <>
              <span className="admin-label">
                <ShieldAlert size={18} />
                Admin Portal
              </span>

              <button
                className="btn btn-secondary"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setAdminMode(false);
                }}
              >
                Exit Admin
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;