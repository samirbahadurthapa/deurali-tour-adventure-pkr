import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Users, Award, Clock, MapPin, CheckCircle, Leaf, Car, Navigation, CalendarDays } from 'lucide-react';

const VEHICLE_OPTIONS = ['Sedan', 'SUV', 'Jeep', 'Hiace', 'Luxury Vehicle'];

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

export default function BookingModal({ pkg, isOpen, onClose }) {
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
        <div 
          className="fixed inset-0 bg-charcoal-dark/70 z-[9999] flex items-center justify-center p-4 overflow-y-auto cursor-pointer"
          onClick={onClose}
        >
          <motion.div 
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden cursor-default my-8"
          >
            {/* Header Image */}
            <div className="relative h-64 md:h-80 bg-gray-950 text-white">
              <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark via-charcoal/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-left">
                {(pkg.vehicleType || pkg.difficulty) && (
                  <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3 inline-block">
                    {pkg.vehicleType || pkg.difficulty}
                  </span>
                )}
                <h2 className="text-2xl md:text-4xl font-extrabold leading-tight text-white mb-2">{pkg.name}</h2>
                <div className="flex flex-wrap gap-4 text-xs md:text-sm text-gray-200">
                  {pkg.location && (
                    <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-primary" /> {pkg.location}</span>
                  )}
                  {pkg.duration && (
                    <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-primary" /> {pkg.duration} Day{pkg.duration > 1 ? 's' : ''}</span>
                  )}
                </div>
              </div>
              <button 
                onClick={onClose} 
                className="absolute top-4 right-4 bg-charcoal-dark/70 hover:bg-charcoal text-white/90 hover:text-white p-2 rounded-full transition-colors focus:outline-none"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 md:p-8 max-h-[60vh] overflow-y-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
                
                {/* Details Column */}
                <div className="lg:col-span-7 space-y-6">
                  {pkg.description && (
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-charcoal-dark">About This Ride</h3>
                      <p className="text-gray-500 text-sm leading-relaxed whitespace-pre-line">
                        {pkg.description}
                      </p>
                    </div>
                  )}

                  {pkg.highlights && pkg.highlights.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="text-lg font-bold text-charcoal-dark">Highlights</h3>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {pkg.highlights.map((highlight, index) => (
                          <li key={index} className="flex gap-2 text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {pkg.itinerary && pkg.itinerary.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="text-lg font-bold text-charcoal-dark">Itinerary</h3>
                      <div className="space-y-4">
                        {pkg.itinerary.map((day) => (
                          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-1" key={day.day}>
                            <h4 className="font-bold text-sm text-charcoal-dark">Day {day.day}: {day.title}</h4>
                            <p className="text-gray-500 text-xs leading-relaxed">{day.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {!pkg.description && !pkg.itinerary && (
                    <div className="p-6 bg-primary-light/50 border border-primary/20 rounded-xl space-y-2">
                      <h3 className="text-lg font-bold text-charcoal-dark flex items-center gap-1.5">
                        <Car className="text-primary w-5 h-5" /> 24/7 Ride Booking
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed">
                        Fill in your pickup and destination details and our booking team will confirm your driver and vehicle shortly. For urgent same-day rides, feel free to call our hotline directly.
                      </p>
                    </div>
                  )}
                </div>

                {/* Booking / Specs Column */}
                <div className="lg:col-span-5 space-y-6">
                  {/* Quick Specs */}
                  {(pkg.duration || pkg.maxGroupSize || pkg.price || pkg.bestSeason) && (
                    <div className="bg-gray-50 border border-gray-100 p-6 rounded-2xl space-y-4">
                      <h3 className="text-base font-bold text-charcoal-dark border-b pb-2 uppercase tracking-wider">Ride Details</h3>
                      <div className="space-y-3 text-sm">
                        {pkg.duration && (
                          <div className="flex justify-between border-b pb-2">
                            <span className="text-gray-400 flex items-center gap-1.5"><Clock className="w-4 h-4 text-primary" /> Duration</span>
                            <span className="font-bold text-charcoal-dark">{pkg.duration} Day{pkg.duration > 1 ? 's' : ''}</span>
                          </div>
                        )}
                        {(pkg.vehicleType || pkg.difficulty) && (
                          <div className="flex justify-between border-b pb-2">
                            <span className="text-gray-400 flex items-center gap-1.5"><Award className="w-4 h-4 text-primary" /> recommended vehicle</span>
                            <span className="font-bold text-primary">{pkg.vehicleType || pkg.difficulty}</span>
                          </div>
                        )}
                        {pkg.maxGroupSize && (
                          <div className="flex justify-between border-b pb-2">
                            <span className="text-gray-400 flex items-center gap-1.5"><Users className="w-4 h-4 text-primary" /> Max Passengers</span>
                            <span className="font-bold text-charcoal-dark">{pkg.maxGroupSize} People</span>
                          </div>
                        )}
                        {pkg.bestSeason && (
                          <div className="flex justify-between border-b pb-2">
                            <span className="text-gray-400 flex items-center gap-1.5"><Leaf className="w-4 h-4 text-primary" /> Best Season</span>
                            <span className="font-bold text-charcoal-dark text-xs">{pkg.bestSeason.join(', ')}</span>
                          </div>
                        )}
                        {pkg.price && (
                          <div className="flex justify-between items-center pt-2">
                            <span className="font-bold text-charcoal-dark text-base">Starting Price</span>
                            <span className="font-extrabold text-2xl text-primary">Rs. {pkg.price}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Booking Form Box */}
                  <div className="bg-white border border-gray-150 p-6 rounded-2xl shadow-sm">
                    <h3 className="text-base font-bold text-charcoal-dark mb-4 border-b pb-2 uppercase tracking-wider">Reserve Your Ride</h3>
                    
                    {isSuccess ? (
                      <div className="text-center py-6 space-y-4">
                        <CheckCircle className="w-12 h-12 text-primary mx-auto" />
                        <h4 className="font-bold text-charcoal-dark text-sm">Booking Request Received!</h4>
                        <p className="text-gray-500 text-xs leading-relaxed">We will review details and confirm your ride via call or email shortly. For urgent same-day bookings, please call our hotline directly.</p>
                        <button className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-2.5 rounded-lg text-sm transition-colors" onClick={() => setIsSuccess(false)}>
                          Book Another Ride
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-4 text-left">
                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                            <Navigation className="w-3.5 h-3.5 text-primary" /> Pickup Location
                          </label>
                          <input 
                            type="text" 
                            name="pickupLocation" 
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent" 
                            placeholder="e.g. Lakeside, Pokhara"
                            required 
                            value={formData.pickupLocation}
                            onChange={handleChange}
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-primary" /> Destination
                          </label>
                          <input 
                            type="text" 
                            name="destination" 
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent" 
                            placeholder="e.g. Kathmandu, Chitwan"
                            required 
                            value={formData.destination}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                              <CalendarDays className="w-3.5 h-3.5 text-primary" /> Date
                            </label>
                            <input 
                              type="date" 
                              name="date" 
                              className="w-full px-2 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-primary" 
                              required 
                              value={formData.date}
                              onChange={handleChange}
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-primary" /> Time
                            </label>
                            <input 
                              type="time" 
                              name="pickupTime" 
                              className="w-full px-2 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-primary" 
                              required 
                              value={formData.pickupTime}
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Vehicle Type</label>
                            <select
                              name="vehicleType"
                              className="w-full px-2 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-primary bg-white"
                              required
                              value={formData.vehicleType}
                              onChange={handleChange}
                            >
                              <option value="" disabled>Select vehicle</option>
                              {VEHICLE_OPTIONS.map(v => (
                                <option key={v} value={v}>{v}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Passengers</label>
                            <input 
                              type="number" 
                              name="passengers" 
                              className="w-full px-2 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-primary" 
                              min="1" 
                              max={pkg.maxGroupSize || 20}
                              required 
                              value={formData.passengers}
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Full Name</label>
                          <input 
                            type="text" 
                            name="customerName" 
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-primary" 
                            required 
                            value={formData.customerName}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Phone</label>
                            <input 
                              type="tel" 
                              name="phone" 
                              className="w-full px-2 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-primary" 
                              required 
                              value={formData.phone}
                              onChange={handleChange}
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Email</label>
                            <input 
                              type="email" 
                              name="email" 
                              className="w-full px-2 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-primary" 
                              required 
                              value={formData.email}
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Special Requests</label>
                          <textarea 
                            name="message" 
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-primary min-h-[60px]" 
                            placeholder="Child seat, extra luggage space, etc."
                            value={formData.message}
                            onChange={handleChange}
                          />
                        </div>

                        {errorMessage && (
                          <div className="text-red-600 text-xs font-semibold">
                            {errorMessage}
                          </div>
                        )}

                        <button 
                          type="submit" 
                          className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-2.5 rounded-lg text-xs shadow-md transition-colors"
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
}
