import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Compass, Menu, X, CalendarCheck, Phone, ShieldAlert, LogIn, LogOut
} from "lucide-react";

const NAV_LINKS = [
  { path: "/", label: "Home" },
  { path: "/services", label: "Services" },
  { path: "/fleet", label: "Our Fleet" },
  { path: "/packages", label: "Tour Packages" },
  { path: "/gallery", label: "Gallery" },
  { path: "/about", label: "About Us" },
  { path: "/contact", label: "Contact" },
];

export default function Navbar({ adminAuthed, handleLogout }) {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled ? "bg-charcoal-dark/95 shadow-md py-3" : "bg-charcoal/80 py-4"
    } glass`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          onClick={() => setMobileMenuOpen(false)}
          className="flex items-center gap-2 group text-white"
        >
          <Compass className="w-8 h-8 text-primary transition-transform group-hover:rotate-45 duration-300" />
          <div className="flex flex-col text-left leading-none">
            <span className="font-extrabold text-lg tracking-wider">DEURALI</span>
            <span className="text-primary text-[10px] font-bold tracking-widest mt-0.5">TOURS & TRAVEL</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) => 
                    `text-sm font-semibold transition-colors py-2 border-b-2 ${
                      isActive 
                        ? "text-primary border-primary" 
                        : "text-gray-300 border-transparent hover:text-white hover:border-white/50"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <a 
            href="tel:+9779856012345" 
            className="text-gray-300 hover:text-white flex items-center gap-1.5 text-sm font-semibold transition-colors"
          >
            <Phone className="w-4 h-4 text-primary" />
            <span>+977-98560-12345</span>
          </a>

          {adminAuthed ? (
            <>
              <Link 
                to="/admin" 
                className="bg-primary/20 text-primary border border-primary/30 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary/30 transition-colors flex items-center gap-1"
              >
                <ShieldAlert className="w-4 h-4" /> Admin
              </Link>
              <button 
                onClick={handleLogout}
                className="text-gray-300 hover:text-white p-2 rounded-lg transition-colors flex items-center gap-1 text-sm font-semibold"
                title="Logout"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </>
          ) : (
            <Link 
              to="/login" 
              className="text-gray-300 hover:text-white flex items-center gap-1 text-sm font-semibold transition-colors"
            >
              <LogIn className="w-4 h-4" />
              <span>Login</span>
            </Link>
          )}

          <Link 
            to="/booking" 
            className="bg-primary hover:bg-primary-dark text-white font-bold px-5 py-2.5 rounded-lg text-sm transition-all shadow-md flex items-center gap-1.5"
          >
            <CalendarCheck className="w-4 h-4" /> Book Now
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-white/90 hover:text-white focus:outline-none transition-colors"
        >
          {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-charcoal-dark/95 border-t border-gray-800 glass py-6 px-4 space-y-6 flex flex-col items-center">
          <ul className="w-full flex flex-col gap-4 text-center">
            {NAV_LINKS.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) => 
                    `block text-base font-semibold py-2 ${
                      isActive 
                        ? "text-primary" 
                        : "text-gray-300 hover:text-white"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="w-full h-[1px] bg-gray-800" />

          <div className="w-full flex flex-col items-center gap-4">
            <a 
              href="tel:+9779856012345" 
              className="text-gray-300 flex items-center gap-1.5 text-sm font-semibold"
            >
              <Phone className="w-4 h-4 text-primary" />
              <span>+977-98560-12345</span>
            </a>

            {adminAuthed ? (
              <div className="flex gap-4">
                <Link 
                  to="/admin" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="bg-primary/20 text-primary border border-primary/30 px-5 py-2 rounded-lg text-sm font-semibold flex items-center gap-1"
                >
                  <ShieldAlert className="w-4 h-4" /> Admin Portal
                </Link>
                <button 
                  onClick={() => { setMobileMenuOpen(false); handleLogout(); }}
                  className="bg-gray-800 text-gray-300 px-5 py-2 rounded-lg text-sm font-semibold flex items-center gap-1"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-300 hover:text-white flex items-center gap-1 text-sm font-semibold"
              >
                <LogIn className="w-4 h-4" />
                <span>Admin Login</span>
              </Link>
            )}

            <Link 
              to="/booking" 
              onClick={() => setMobileMenuOpen(false)}
              className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-lg text-sm transition-all shadow-md text-center flex justify-center items-center gap-1.5"
            >
              <CalendarCheck className="w-4 h-4" /> Book Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}