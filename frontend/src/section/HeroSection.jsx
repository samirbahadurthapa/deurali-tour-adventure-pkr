import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

function HeroSection({ onScrollTo }) {
  return (
    <header id="home" className="hero">
      <video
        className="hero-media"
        autoPlay
        loop
        muted
        playsInline
        poster="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80"
      />
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
            Discover Nepal with<br /><span>Deurali Tour & Adventure</span>
          </h1>
          <p className="hero-description">
            Embark on breathtaking journeys across the Himalayas. From the high passes of Everest to the
            forbidden valleys of Upper Mustang, we deliver life-defining trekking experiences guided by
            certified safety specialists.
          </p>
          <div className="hero-ctas">
            <button className="btn btn-primary" onClick={() => onScrollTo('packages')}>
              Explore Packages <ArrowRight size={18} />
            </button>
            <button className="btn btn-outline-white" onClick={() => onScrollTo('contact')}>
              Contact Us
            </button>
          </div>
        </motion.div>
      </div>
    </header>
  );
}

export default HeroSection;