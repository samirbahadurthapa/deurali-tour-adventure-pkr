import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

function TestimonialsSection({ testimonials }) {
  return (
    <section
      className="section"
      style={{ backgroundColor: 'rgba(45, 106, 79, 0.03)', width: '100vw', maxWidth: 'none' }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <div className="text-center">
          <span className="section-tag">Client Reviews</span>
          <h2 className="section-title">Stories from the Trails</h2>
          <p className="section-subtitle">
            Read personal experiences from explorers who scaled passes and crossed high bridges with the
            Deurali team.
          </p>
        </div>
        <div className="grid-3">
          {testimonials.map((test, index) => (
            <motion.div
              className="testimonial-card"
              key={test._id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="testimonial-stars">
                {[...Array(test.rating)].map((_, i) => <Star key={i} />)}
              </div>
              <p className="testimonial-text">"{test.text}"</p>
              <div className="testimonial-user">
                <img className="testimonial-avatar" src={test.photo} alt={test.clientName} />
                <div className="testimonial-details">
                  <h4>{test.clientName}</h4>
                  <span>{test.country}</span>
                  <span className="trek-tag">{test.trekName}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;