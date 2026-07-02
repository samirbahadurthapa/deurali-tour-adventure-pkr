

import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';

const initialForm = { name: '', email: '', phone: '', subject: '', message: '' };

function ContactForm() {
  const [contactForm, setContactForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const updateField = (field) => (e) =>
    setContactForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess(false);
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm)
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
        setContactForm(initialForm);
      } else {
        setError(data.message || 'Error sending message.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 0' }}>
        <CheckCircle size={56} style={{ color: 'var(--primary)', marginBottom: '16px' }} />
        <h4 style={{ fontSize: '1.25rem', color: 'var(--primary-dark)', marginBottom: '8px' }}>
          Inquiry Sent Successfully!
        </h4>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          An adventure specialist will respond via email/phone within 12 hours.
        </p>
        <button className="btn btn-primary" style={{ marginTop: '24px' }} onClick={() => setSuccess(false)}>
          Send Another Inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group-row">
        <div className="form-group">
          <label className="form-label" htmlFor="contactName">Your Name</label>
          <input
            type="text"
            id="contactName"
            className="form-control"
            required
            value={contactForm.name}
            onChange={updateField('name')}
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="contactEmail">Email Address</label>
          <input
            type="email"
            id="contactEmail"
            className="form-control"
            required
            value={contactForm.email}
            onChange={updateField('email')}
          />
        </div>
      </div>
      <div className="form-group-row">
        <div className="form-group">
          <label className="form-label" htmlFor="contactPhone">Phone Number</label>
          <input
            type="tel"
            id="contactPhone"
            className="form-control"
            value={contactForm.phone}
            onChange={updateField('phone')}
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="contactSubject">Subject</label>
          <input
            type="text"
            id="contactSubject"
            className="form-control"
            required
            value={contactForm.subject}
            onChange={updateField('subject')}
          />
        </div>
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="contactMessage">Message / Questions</label>
        <textarea
          id="contactMessage"
          className="form-control"
          required
          value={contactForm.message}
          onChange={updateField('message')}
        />
      </div>
      {error && (
        <p style={{ color: '#DC2626', fontSize: '0.9rem', marginBottom: '16px', fontWeight: 500 }}>
          {error}
        </p>
      )}
      <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px 0' }} disabled={submitting}>
        {submitting ? 'Sending Inquiry...' : <>Send Inquiry <Send size={16} /></>}
      </button>
    </form>
  );
}

export default ContactForm;