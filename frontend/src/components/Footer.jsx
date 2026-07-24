import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal-dark text-gray-300 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 text-left">
        {/* Company Column */}
        <div className="lg:col-span-4 space-y-6">
          <Link to="/" className="inline-flex items-center gap-2 text-white font-extrabold text-2xl tracking-wider">
            <Compass className="w-8 h-8 text-primary" />
            <span>DEURALI</span>
            <span className="text-primary font-normal">TOURS</span>
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed">
            Deurali Tour & Adventure is Pokhara's trusted private car & jeep booking service. From 24/7 instant cabs to Muktinath, Chitwan, and city sightseeing tours, we get you there safely and comfortably.
          </p>
          <div className="flex gap-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 hover:bg-primary hover:text-white flex items-center justify-center transition-colors text-gray-400" aria-label="Facebook">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 hover:bg-primary hover:text-white flex items-center justify-center transition-colors text-gray-400" aria-label="Instagram">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 hover:bg-primary hover:text-white flex items-center justify-center transition-colors text-gray-400" aria-label="Twitter">
              <Twitter className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="text-white font-bold text-sm uppercase tracking-wider">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
            <li><Link to="/packages" className="hover:text-primary transition-colors">Tour Packages</Link></li>
            <li><Link to="/fleet" className="hover:text-primary transition-colors">Our Fleet</Link></li>
            <li><Link to="/gallery" className="hover:text-primary transition-colors">Photo Gallery</Link></li>
          </ul>
        </div>

        {/* Support Column */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="text-white font-bold text-sm uppercase tracking-wider">Support & Info</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
            <li><Link to="/services" className="hover:text-primary transition-colors">Services</Link></li>
            <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
            <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Contact Details Column */}
        <div className="lg:col-span-4 space-y-4">
          <h4 className="text-white font-bold text-sm uppercase tracking-wider">Get In Touch</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li className="flex gap-3 items-start">
              <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span>Lakeside-6, Pokhara, Nepal<br />Thamel, Kathmandu, Nepal</span>
            </li>
            <li className="flex gap-3 items-start">
              <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span>+977-61-469000<br />+977-98233-72236</span>
            </li>
            <li className="flex gap-3 items-start">
              <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span>info@deuralitravel.com<br />bookings@deuralitravel.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800 py-8 text-center text-xs text-gray-500 max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between gap-4">
        <p>&copy; {currentYear} Deurali Tour & Adventure Pvt. Ltd. All rights reserved.</p>
        <p>Designed with ❤️ for Nepali Adventure</p>
      </div>
    </footer>
  );
}
