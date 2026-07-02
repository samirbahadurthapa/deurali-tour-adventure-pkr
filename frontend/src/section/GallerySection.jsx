import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import LightboxModal from '../components/LightboxModal';

const CATEGORIES = ['all', 'trekking', 'nature', 'culture', 'adventure'];

function GallerySection({ gallery, loading }) {
  const [galleryFilter, setGalleryFilter] = useState('all');
  const [lightboxImg, setLightboxImg] = useState(null);

  const filteredGallery = galleryFilter === 'all'
    ? gallery
    : gallery.filter(item => item.category === galleryFilter);

  return (
    <section id="gallery" className="section">
      <div className="text-center">
        <span className="section-tag">Visual Portfolio</span>
        <h2 className="section-title">Nepal Through the Lens</h2>
        <p className="section-subtitle">
          Himalayan sunrises, remote valleys, dynamic cultures. View our collection of moments captured
          on adventure expeditions.
        </p>
      </div>

      <div className="gallery-filters">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`filter-btn ${galleryFilter === cat ? 'active' : ''}`}
            onClick={() => setGalleryFilter(cat)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

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
                <span className="gallery-item-loc">
                  <MapPin size={12} style={{ display: 'inline', marginRight: '4px' }} />{img.location}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <LightboxModal image={lightboxImg} onClose={() => setLightboxImg(null)} />
    </section>
  );
}

export default GallerySection;