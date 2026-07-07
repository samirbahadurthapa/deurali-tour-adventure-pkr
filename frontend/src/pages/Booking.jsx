import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Car, CalendarDays, MapPin, Navigation, Users, Clock, 
  CheckCircle, ArrowLeft, Phone, ShieldCheck, Mail
} from 'lucide-react';

const VEHICLE_OPTIONS = ['Sedan', 'SUV', 'Jeep', 'Hiace', 'Luxury Vehicle'];

export default function Booking() {
  const location = useLocation();
  const navigate = useNavigate();

  const emptyForm = {
    pickupLocation: '',
    destination: '',
    date: '',
    pickupTime: '',
    vehicleType: 'Sedan',
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
  const [selectedDetails, setSelectedDetails] = useState(null);

  // Load state parameters if redirected from home/packages/fleet
  useEffect(() => {
    if (location.state) {
      const { bookingDetails, vehicleName, vehicleType, packageName, destination } = location.state;
      
      let prefilledForm = { ...emptyForm };
      let details = {};

      if (bookingDetails) {
        prefilledForm = {
          ...prefilledForm,
          ...bookingDetails,
          passengers: Number(bookingDetails.passengers)
        };
        details.title = "Quick Booking Request";
      }

      if (vehicleName) {
        prefilledForm.vehicleType = vehicleType || 'Sedan';
        details.title = `Rental: ${vehicleName}`;
      }

      if (packageName) {
        prefilledForm.destination = destination || '';
        details.title = `Package Tour: ${packageName}`;
      }

      setFormData(prev => ({
        ...prev,
        ...prefilledForm
      }));
      setSelectedDetails(details);
    }
  }, [location.state]);

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
          packageName: selectedDetails?.title || 'Custom Booking',
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
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-1.5 text-gray-500 hover:text-charcoal mb-6 text-sm font-semibold transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Go Back
      </button>

      {/* Main Grid */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 grid grid-cols-1 md:grid-cols-12">
        {/* Sidebar Info Panel */}
        <div className="bg-charcoal text-white p-8 md:col-span-5 flex flex-col justify-between">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold border-b border-gray-700 pb-3 flex items-center gap-2 text-primary">
              <Car className="w-6 h-6" /> Book A Ride
            </h2>
            
            {selectedDetails ? (
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-2">
                <span className="text-primary font-bold text-xs uppercase tracking-widest">Selected Option</span>
                <h4 className="font-extrabold text-lg text-white">{selectedDetails.title}</h4>
              </div>
            ) : (
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-2">
                <span className="text-primary font-bold text-xs uppercase tracking-widest">Custom Booking</span>
                <p className="text-gray-300 text-xs leading-relaxed">
                  Book a private car or tour. Fill out the details and our team will get in touch with you.
                </p>
              </div>
            )}

            <div className="space-y-4 text-sm">
              <div className="flex gap-3">
                <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
                <div>
                  <h5 className="font-bold text-white">Verified Drivers Only</h5>
                  <p className="text-gray-400 text-xs">All vehicles come with safe, licensed drivers.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Clock className="w-5 h-5 text-primary shrink-0" />
                <div>
                  <h5 className="font-bold text-white">24/7 Operations</h5>
                  <p className="text-gray-400 text-xs">We work round-the-clock for bookings & help desk.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                <div>
                  <h5 className="font-bold text-white">Transparent Pricing</h5>
                  <p className="text-gray-400 text-xs">No hidden costs. Fares are final and all-inclusive.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 md:mt-0 pt-6 border-t border-gray-800 text-xs text-gray-400 space-y-1">
            <p>Hotline: +977-98560-12345</p>
            <p>Email: bookings@deuralitravel.com</p>
          </div>
        </div>

        {/* Form Panel */}
        <div className="p-8 md:col-span-7">
          {isSuccess ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 space-y-4"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-charcoal-dark">Booking Request Received!</h3>
              <p className="text-gray-500 text-sm max-w-sm mx-auto leading-relaxed">
                We have received your details. Our booking coordinator will check driver availability and confirm your reservation shortly.
              </p>
              <button 
                onClick={() => { setIsSuccess(false); setSelectedDetails(null); }}
                className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow-md transition-colors"
              >
                Book Another Ride
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <h3 className="text-xl font-bold text-charcoal-dark mb-4">Reservation Details</h3>

              {/* Locations */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Navigation className="w-3.5 h-3.5 text-primary" /> Pickup Location
                  </label>
                  <input 
                    type="text" 
                    name="pickupLocation" 
                    required 
                    value={formData.pickupLocation}
                    onChange={handleChange}
                    placeholder="e.g. Lakeside, Pokhara"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-primary" /> Destination
                  </label>
                  <input 
                    type="text" 
                    name="destination" 
                    required 
                    value={formData.destination}
                    onChange={handleChange}
                    placeholder="e.g. Kathmandu"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

              {/* Date / Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <CalendarDays className="w-3.5 h-3.5 text-primary" /> Pickup Date
                  </label>
                  <input 
                    type="date" 
                    name="date" 
                    required 
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-primary" /> Pickup Time
                  </label>
                  <input 
                    type="time" 
                    name="pickupTime" 
                    required 
                    value={formData.pickupTime}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

              {/* Vehicle / Passengers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                    Vehicle Preference
                  </label>
                  <select 
                    name="vehicleType" 
                    required 
                    value={formData.vehicleType}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    {VEHICLE_OPTIONS.map(v => (
                      <option key={v} value={v}>{v}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-primary" /> Passengers
                  </label>
                  <input 
                    type="number" 
                    name="passengers" 
                    min="1" 
                    max="30"
                    required 
                    value={formData.passengers}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

              {/* Contact Info */}
              <div className="border-t pt-4 space-y-4">
                <h4 className="text-sm font-bold text-charcoal-dark uppercase tracking-wider">Contact Information</h4>
                
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                    Your Name
                  </label>
                  <input 
                    type="text" 
                    name="customerName" 
                    required 
                    value={formData.customerName}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-primary" /> Phone Number
                    </label>
                    <input 
                      type="tel" 
                      name="phone" 
                      required 
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. +977-98..."
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-primary" /> Email Address
                    </label>
                    <input 
                      type="email" 
                      name="email" 
                      required 
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@example.com"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                  Special Requests / Messages
                </label>
                <textarea 
                  name="message" 
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Any baby seat preference, extra luggage specs, route stops, etc..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent min-h-[70px]"
                />
              </div>

              {errorMessage && (
                <div className="text-red-600 text-xs font-semibold">
                  {errorMessage}
                </div>
              )}

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-lg text-sm shadow-md transition-colors flex justify-center items-center gap-2"
              >
                {isSubmitting ? 'Submitting request...' : 'Confirm My Reservation'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
