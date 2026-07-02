import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Users, Award, Clock, MapPin, CheckCircle, Leaf, Car, Navigation, CalendarDays } from 'lucide-react';

const VEHICLE_OPTIONS = ['Sedan', 'SUV', 'Jeep', 'Hiace', 'Luxury Vehicle'];

// Maps legacy/free-text vehicle labels coming from tour packages (e.g. "Jeep (Mahindra Scorpio)")
// to one of the standard VEHICLE_OPTIONS so the select box can pre-fill sensibly.
const normalizeVehicleType = (label) => {
  if (!label) return '';
  const lower = label.toLowerCase();
  if (lower.includes('jeep') || lower.includes('scorpio')) return 'Jeep';
  if (lower.includes('suv')) return 'SUV';
  if (lower.includes('hiace') || lower.includes('van')) return 'Hiace';
  if (lower.includes('luxury')) return 'Luxury Vehicle';
  if (lower.includes('sedan') || lower.includes('creta')) return 'Sedan';
  return '';
};

const BookingModal = ({ pkg, isOpen, onClose }) => {
  const emptyForm = {
    pickupLocation: '',
    destination: '',
    date: '',
    pickupTime: '',
    vehicleType: '',
    passengers: 1,
    customerName: '',
    email: '',
    phone: '',
    message: ''
  };

  const [formData, setFormData] = useState(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Pre-fill sensible defaults whenever a new package/vehicle/destination is opened
  useEffect(() => {
    if (pkg) {
      setFormData({
        ...emptyForm,
        pickupLocation: pkg.defaultPickup || '',
        destination: pkg.defaultDestination || pkg.location || '',
        vehicleType: normalizeVehicleType(pkg.vehicleType || pkg.difficulty) || '',
      });
      setIsSuccess(false);
      setErrorMessage('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pkg]);

  if (!pkg) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          packageId: pkg._id,
          packageName: pkg.name,
          ...formData,
          passengers: Number(formData.passengers)
        })
      });

      const data = await response.json();
      if (response.ok) {
        setIsSuccess(true);
        setFormData(emptyForm);
      } else {
        setErrorMessage(data.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setErrorMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="modal-backdrop" onClick={onClose}>
          <motion.div 
            className="modal-container"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {/* Header Image */}
            <div className="modal-header-image">
              <img src={pkg.image} alt={pkg.name} />
              <div className="modal-header-overlay">
                {(pkg.vehicleType || pkg.difficulty) && (
                  <span className="package-badge">{pkg.vehicleType || pkg.difficulty}</span>
                )}
                <h2 style={{ fontSize: '2.5rem', marginBottom: '8px', color: '#FFF' }}>{pkg.name}</h2>
                <div style={{ display: 'flex', gap: '20px', fontSize: '0.95rem', flexWrap: 'wrap' }}>
                  {pkg.location && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><MapPin size={16} /> {pkg.location}</span>
                  )}
                  {pkg.duration && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={16} /> {pkg.duration} Day{pkg.duration > 1 ? 's' : ''}</span>
                  )}
                </div>
              </div>
              <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
                <X size={20} />
              </button>
            </div>

            {/* Content Body */}
            <div className="modal-body">
              <div className="modal-details-grid">
                
                {/* Details Column */}
                <div>
                  {pkg.description && (
                    <>
                      <h3 style={{ fontSize: '1.5rem', marginBottom: '12px', color: 'var(--primary-dark)' }}>About This Ride</h3>
                      <p style={{ color: 'var(--text-muted)', marginBottom: '24px', fontSize: '0.975rem', lineHeight: '1.7' }}>
                        {pkg.description}
                      </p>
                    </>
                  )}

                  {pkg.highlights && pkg.highlights.length > 0 && (
                    <>
                      <h3 style={{ fontSize: '1.25rem', marginBottom: '12px', color: 'var(--primary-dark)' }}>Highlights</h3>
                      <ul className="modal-highlights">
                        {pkg.highlights.map((highlight, index) => (
                          <li key={index}>
                            <CheckCircle size={18} style={{ color: 'var(--primary)', marginTop: '2px' }} />
                            <span style={{ color: 'var(--text-dark)', fontSize: '0.95rem' }}>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}

                  {pkg.itinerary && pkg.itinerary.length > 0 && (
                    <>
                      <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', color: 'var(--primary-dark)' }}>Itinerary</h3>
                      <div className="itinerary-list">
                        {pkg.itinerary.map((day) => (
                          <div className="itinerary-day-card" key={day.day}>
                            <div className="itinerary-day-title">Day {day.day}: {day.title}</div>
                            <div className="itinerary-day-desc">{day.description}</div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {!pkg.description && !pkg.itinerary && (
                    <div className="booking-form-box" style={{ marginBottom: 0 }}>
                      <h3 style={{ fontSize: '1.25rem', marginBottom: '12px', color: 'var(--primary-dark)' }}>
                        <Car size={20} style={{ verticalAlign: 'middle', marginRight: '8px', color: 'var(--primary)' }} />
                        24/7 Ride Booking
                      </h3>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.7' }}>
                        Fill in your pickup and destination details and our booking team will confirm your driver and vehicle shortly.
                        For urgent same-day rides, feel free to call our hotline directly.
                      </p>
                    </div>
                  )}
                </div>

                {/* Booking / Specs Column */}
                <div>
                  {/* Quick Specs (only shown for tour packages that have this data) */}
                  {(pkg.duration || pkg.maxGroupSize || pkg.price || pkg.bestSeason) && (
                    <div className="booking-form-box" style={{ marginBottom: '24px' }}>
                      <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', color: 'var(--primary-dark)' }}>Ride Details</h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {pkg.duration && (
                          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '8px' }}>
                            <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px' }}><Clock size={16} /> Duration</span>
                            <span style={{ fontWeight: 600 }}>{pkg.duration} Day{pkg.duration > 1 ? 's' : ''}</span>
                          </div>
                        )}
                        {(pkg.vehicleType || pkg.difficulty) && (
                          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '8px' }}>
                            <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px' }}><Award size={16} /> Recommended Vehicle</span>
                            <span style={{ fontWeight: 600, color: 'var(--primary)' }}>{pkg.vehicleType || pkg.difficulty}</span>
                          </div>
                        )}
                        {pkg.maxGroupSize && (
                          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '8px' }}>
                            <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px' }}><Users size={16} /> Max Passengers</span>
                            <span style={{ fontWeight: 600 }}>{pkg.maxGroupSize} People</span>
                          </div>
                        )}
                        {pkg.bestSeason && (
                          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '8px' }}>
                            <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px' }}><Leaf size={16} /> Best Time to Visit</span>
                            <span style={{ fontWeight: 600 }}>{pkg.bestSeason.join(', ')}</span>
                          </div>
                        )}
                        {pkg.price && (
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px' }}>
                            <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>Starting Price</span>
                            <span style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary)' }}>Rs. {pkg.price}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Booking Form Box */}
                  <div className="booking-form-box">
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', color: 'var(--primary-dark)' }}>Reserve Your Ride</h3>
                    
                    {isSuccess ? (
                      <div style={{ textAlign: 'center', padding: '20px 0' }}>
                        <CheckCircle size={56} style={{ color: 'var(--primary)', marginBottom: '16px' }} />
                        <h4 style={{ fontSize: '1.15rem', color: 'var(--primary-dark)', marginBottom: '8px' }}>Booking Request Received!</h4>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>We will review details and confirm your ride via call or email shortly. For urgent same-day bookings, please call our hotline directly.</p>
                        <button className="btn btn-primary" style={{ marginTop: '20px', width: '100%' }} onClick={() => setIsSuccess(false)}>
                          Book Another Ride
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

                        <div className="form-group" style={{ marginBottom: 0 }}>
                          <label className="form-label" htmlFor="pickupLocation"><Navigation size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} /> Pickup Location</label>
                          <input 
                            type="text" 
                            id="pickupLocation"
                            name="pickupLocation" 
                            className="form-control" 
                            placeholder="e.g. Lakeside, Pokhara or Tribhuvan Airport"
                            required 
                            value={formData.pickupLocation}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="form-group" style={{ marginBottom: 0 }}>
                          <label className="form-label" htmlFor="destination"><MapPin size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} /> Destination</label>
                          <input 
                            type="text" 
                            id="destination"
                            name="destination" 
                            className="form-control" 
                            placeholder="e.g. Kathmandu, Chitwan, Muktinath"
                            required 
                            value={formData.destination}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="form-group-row">
                          <div className="form-group" style={{ marginBottom: 0 }}>
                            <label className="form-label" htmlFor="date"><CalendarDays size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} /> Pickup Date</label>
                            <input 
                              type="date" 
                              id="date"
                              name="date" 
                              className="form-control" 
                              required 
                              value={formData.date}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="form-group" style={{ marginBottom: 0 }}>
                            <label className="form-label" htmlFor="pickupTime">Pickup Time</label>
                            <input 
                              type="time" 
                              id="pickupTime"
                              name="pickupTime" 
                              className="form-control" 
                              required 
                              value={formData.pickupTime}
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div className="form-group-row">
                          <div className="form-group" style={{ marginBottom: 0 }}>
                            <label className="form-label" htmlFor="vehicleType">Vehicle Type</label>
                            <select
                              id="vehicleType"
                              name="vehicleType"
                              className="form-control"
                              required
                              value={formData.vehicleType}
                              onChange={handleChange}
                            >
                              <option value="" disabled>Select a vehicle</option>
                              {VEHICLE_OPTIONS.map(v => (
                                <option key={v} value={v}>{v}</option>
                              ))}
                            </select>
                          </div>
                          <div className="form-group" style={{ marginBottom: 0 }}>
                            <label className="form-label" htmlFor="passengers">Passengers</label>
                            <input 
                              type="number" 
                              id="passengers"
                              name="passengers" 
                              className="form-control" 
                              min="1" 
                              max={pkg.maxGroupSize || 20}
                              required 
                              value={formData.passengers}
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div className="form-group" style={{ marginBottom: 0 }}>
                          <label className="form-label" htmlFor="customerName">Full Name</label>
                          <input 
                            type="text" 
                            id="customerName"
                            name="customerName" 
                            className="form-control" 
                            required 
                            value={formData.customerName}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="form-group-row">
                          <div className="form-group" style={{ marginBottom: 0 }}>
                            <label className="form-label" htmlFor="phone">Phone Number</label>
                            <input 
                              type="tel" 
                              id="phone"
                              name="phone" 
                              className="form-control" 
                              required 
                              value={formData.phone}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="form-group" style={{ marginBottom: 0 }}>
                            <label className="form-label" htmlFor="email">Email Address</label>
                            <input 
                              type="email" 
                              id="email"
                              name="email" 
                              className="form-control" 
                              required 
                              value={formData.email}
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div className="form-group" style={{ marginBottom: 0 }}>
                          <label className="form-label" htmlFor="message">Special Requests</label>
                          <textarea 
                            id="message"
                            name="message" 
                            className="form-control" 
                            style={{ minHeight: '80px' }}
                            placeholder="Child seat, extra luggage space, wheelchair access, etc."
                            value={formData.message}
                            onChange={handleChange}
                          />
                        </div>

                        {errorMessage && (
                          <div style={{ color: '#DC2626', fontSize: '0.85rem', fontWeight: 500 }}>
                            {errorMessage}
                          </div>
                        )}

                        <button 
                          type="submit" 
                          className="btn btn-primary" 
                          style={{ width: '100%' }}
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? 'Sending Request...' : 'Confirm Booking'}
                        </button>
                      </form>
                    )}
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
