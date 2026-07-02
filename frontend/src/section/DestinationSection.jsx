import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

const destinations = [
  { name: 'Annapurna Sanctuary', region: 'Gandaki Province', sizeClass: 'large', image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80' },
  { name: 'Lo Manthang', region: 'Upper Mustang', sizeClass: 'medium', image: 'https://images.unsplash.com/photo-1627856013091-fed6e4e30025?auto=format&fit=crop&w=800&q=80' },
  { name: 'Pokhara Valley', region: 'Lakeside & Lakes', sizeClass: 'medium', image: 'https://images.unsplash.com/photo-1558862107-d49ef2a04d72?auto=format&fit=crop&w=800&q=80' },
  { name: 'Chitwan Jungles', region: 'Terai Safari', sizeClass: 'large', image: 'https://images.unsplash.com/photo-1581888227599-779811939961?auto=format&fit=crop&w=800&q=80' },
  { name: 'Boudhanath Stupa', region: 'Kathmandu Valley', sizeClass: 'small', image: 'https://images.unsplash.com/photo-1582578598191-c12185749f06?auto=format&fit=crop&w=800&q=80' },
  { name: 'Khumbu Valley', region: 'Everest Region', sizeClass: 'small', image: 'https://images.unsplash.com/photo-1486916856992-e4db22c8df33?auto=format&fit=crop&w=800&q=80' },
  { name: 'Mardi Himal Crest', region: 'Annapurna Ridges', sizeClass: 'small', image: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80' }
];

function DestinationsSection() {
  return (
    <section id="destinations" className="section">
      <div className="text-center">
        <span className="section-tag">Wonders of Nepal</span>
        <h2 className="section-title">Popular Destinations</h2>
        <p className="section-subtitle">
          Hike, climb, and wander through Nepal's most beautiful regions, boasting historic cultures and
          majestic peaks.
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
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default DestinationsSection;