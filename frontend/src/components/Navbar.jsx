import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Compass, Menu, X, CalendarCheck, Phone, ShieldAlert, LogIn, LogOut
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
      scrolled 
        ? "bg-charcoal-dark/90 shadow-lg py-3 glass-dark" 
        : "bg-charcoal-dark/40 py-4 border-b border-white/10 backdrop-blur-[4px]"
    }`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          onClick={() => setMobileMenuOpen(false)}
          className="flex items-center gap-2.5 group text-white"
        >
          <Compass className="w-8 h-8 text-primary transition-transform group-hover:rotate-[360deg] duration-700 ease-out" />
          <div className="flex flex-col text-left leading-none">
            <span className="font-extrabold text-lg tracking-wider transition-colors duration-300 group-hover:text-primary">DEURALI</span>
            <span className="text-primary text-[10px] font-bold tracking-widest mt-0.5 group-hover:text-white transition-colors duration-300">TOURS & TRAVEL</span>
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
                    `relative text-sm font-semibold py-2 px-1 transition-colors duration-300 block
                    after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[2px] after:bg-primary after:transition-all after:duration-300
                    ${
                      isActive 
                        ? "text-primary after:w-full" 
                        : "text-gray-300 hover:text-white after:w-0 hover:after:w-full"
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
            className="text-gray-300 hover:text-white flex items-center gap-2 text-sm font-semibold transition-all duration-300 px-3.5 py-1.5 rounded-full border border-white/10 hover:border-primary/40 hover:bg-white/5"
          >
            <Phone className="w-3.5 h-3.5 text-primary" />
            <span>+977-98560-12345</span>
          </a>

          {adminAuthed ? (
            <>
              <Link 
                to="/admin" 
                className="bg-primary/20 text-primary border border-primary/30 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary/30 transition-all hover:scale-105 duration-200 flex items-center gap-1.5"
              >
                <ShieldAlert className="w-4 h-4" /> Admin
              </Link>
              <button 
                onClick={handleLogout}
                className="text-gray-300 hover:text-white px-3 py-2 rounded-lg transition-all hover:bg-white/5 duration-200 flex items-center gap-1.5 text-sm font-semibold"
                title="Logout"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </>
          ) : (
            <Link 
              to="/login" 
              className="text-gray-300 hover:text-white px-3 py-2 rounded-lg transition-all hover:bg-white/5 duration-200 flex items-center gap-1.5 text-sm font-semibold"
            >
              <LogIn className="w-4 h-4 text-primary" />
              <span>Login</span>
            </Link>
          )}

          <Link 
            to="/booking" 
            className="bg-gradient-to-r from-primary to-primary-dark hover:from-primary hover:to-primary text-white font-bold px-6 py-2.5 rounded-lg text-sm transition-all duration-300 shadow-[0_4px_12px_rgba(181,137,0,0.25)] hover:shadow-[0_4px_20px_rgba(181,137,0,0.45)] hover:scale-[1.03] active:scale-[0.98] flex items-center gap-1.5 btn-shine"
          >
            <CalendarCheck className="w-4 h-4" /> Book Now
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-white/90 hover:text-white focus:outline-none transition-colors p-1"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-charcoal-dark/95 border-t border-white/5 glass-dark overflow-hidden"
          >
            <div className="py-6 px-4 space-y-6 flex flex-col items-center">
              <ul className="w-full flex flex-col gap-4 text-center">
                {NAV_LINKS.map((link) => (
                  <li key={link.path}>
                    <NavLink
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) => 
                        `block text-base font-semibold py-2 transition-colors ${
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

              <div className="w-full h-[1px] bg-white/10" />

              <div className="w-full flex flex-col items-center gap-4">
                <a 
                  href="tel:+9779856012345" 
                  className="text-gray-300 hover:text-white flex items-center gap-2 text-sm font-semibold transition-colors px-4 py-2 rounded-full border border-white/10"
                >
                  <Phone className="w-4 h-4 text-primary" />
                  <span>+977-98560-12345</span>
                </a>

                {adminAuthed ? (
                  <div className="flex gap-4 w-full justify-center">
                    <Link 
                      to="/admin" 
                      onClick={() => setMobileMenuOpen(false)}
                      className="bg-primary/20 text-primary border border-primary/30 px-5 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-1.5 hover:bg-primary/30 transition-all"
                    >
                      <ShieldAlert className="w-4 h-4" /> Admin Portal
                    </Link>
                    <button 
                      onClick={() => { setMobileMenuOpen(false); handleLogout(); }}
                      className="bg-white/5 border border-white/10 text-gray-300 px-5 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-1.5 hover:bg-white/10 transition-all"
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </div>
                ) : (
                  <Link 
                    to="/login" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-gray-300 hover:text-white flex items-center gap-1.5 text-sm font-semibold transition-colors"
                  >
                    <LogIn className="w-4 h-4 text-primary" />
                    <span>Admin Login</span>
                  </Link>
                )}

                <Link 
                  to="/booking" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full bg-gradient-to-r from-primary to-primary-dark text-white font-bold py-3 rounded-lg text-sm transition-all shadow-md text-center flex justify-center items-center gap-1.5 btn-shine"
                >
                  <CalendarCheck className="w-4 h-4" /> Book Now
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}