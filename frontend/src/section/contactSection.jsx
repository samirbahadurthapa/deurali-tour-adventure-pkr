import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import ContactForm from '../components/ContactForm';

function ContactSection() {
  return (
    <section id="contact" className="section">
      <div className="text-center">
        <span className="section-tag">Start Planning</span>
        <h2 className="section-title">Talk to an Adventure Expert</h2>
        <p className="section-subtitle">
          Need details about a route, difficulty scaling, or custom group pricing? Reach out to our base office.
        </p>
      </div>
      <div className="contact-layout">
        <div className="contact-info-panel">
          <div className="contact-card-item">
            <div className="contact-card-icon"><MapPin size={24} /></div>
            <div className="contact-card-details">
              <h4>Main Office</h4>
              <p>Lakeside Street-6, Pokhara, Nepal</p>
              <p>Thamel Tourist Hub, Kathmandu, Nepal</p>
            </div>
          </div>
          <div className="contact-card-item">
            <div className="contact-card-icon"><Phone size={24} /></div>
            <div className="contact-card-details">
              <h4>Call Office</h4>
              <p>Hotline: <a href="tel:+97761469000">+977-61-469000</a></p>
              <p>WhatsApp: <a href="tel:+9779856012345">+977-98560-12345</a></p>
            </div>
          </div>
          <div className="contact-card-item">
            <div className="contact-card-icon"><Mail size={24} /></div>
            <div className="contact-card-details">
              <h4>Email Inquiries</h4>
              <p><a href="mailto:info@deuralitravel.com">info@deuralitravel.com</a></p>
              <p><a href="mailto:bookings@deuralitravel.com">bookings@deuralitravel.com</a></p>
            </div>
          </div>
          <div className="map-wrapper">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14059.600989397637!2d83.9575971485604!3d28.20973347101784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3995951cd5f309a5%3A0x6b4be933221b960a!2sLakeside%20Rd%2C%20Pokhara%2033700!5e0!3m2!1sen!2snp!4v1719280000000!5m2!1sen!2snp"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Deurali Office Map Location"
            />
          </div>
        </div>
        <div className="contact-form-panel">
          <h3 style={{ fontSize: '1.5rem', marginBottom: '24px', color: 'var(--primary-dark)' }}>Send an Inquiry</h3>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

export default ContactSection;