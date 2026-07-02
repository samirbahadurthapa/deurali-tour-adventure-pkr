import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Star, ArrowRight } from 'lucide-react';

function PackagesSection({ packages, loading, onOpenDetails }) {
  return (
    <section
      id="packages"
      className="section"
      style={{ backgroundColor: 'rgba(45, 106, 79, 0.03)', width: '100vw', maxWidth: 'none' }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <div className="text-center">
          <span className="section-tag">Unforgettable Journeys</span>
          <h2 className="section-title">Popular Trek Packages</h2>
          <p className="section-subtitle">
            Explore our curated selection of signature Himalayan routes, featuring acclimatized pacing
            and stunning logistics.
          </p>
        </div>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <p style={{ color: 'var(--text-muted)' }}>Loading premium trek logs...</p>
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
                  <span className="package-price-badge">${pkg.price}</span>
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
                    <button className="package-action" onClick={() => onOpenDetails(pkg)}>
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
  );
}

export default PackagesSection;