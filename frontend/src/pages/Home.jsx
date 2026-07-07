import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Car, Compass, Clock, ShieldCheck, Zap, Users, Star, 
  ArrowRight, CheckCircle, Phone, CalendarCheck, MapPin, 
  UserCheck, PlaneTakeoff, Building2, Route, Briefcase, Settings2
} from 'lucide-react';

const SERVICES = [
  { title: '24/7 Car Booking', desc: 'Instant or scheduled bookings, any hour of the day or night.', icon: <Clock className="w-6 h-6" /> },
  { title: 'Airport Pickup & Drop', desc: 'On-time transfers to and from Pokhara and Kathmandu airports.', icon: <PlaneTakeoff className="w-6 h-6" /> },
  { title: 'Hotel Pickup & Drop', desc: 'Door-to-door service from your hotel or guesthouse.', icon: <Building2 className="w-6 h-6" /> },
  { title: 'Tourist Transportation', desc: 'Comfortable rides to every major sightseeing spot in Nepal.', icon: <Compass className="w-6 h-6" /> },
  { title: 'Intercity Travel', desc: 'Reliable long-distance rides between cities across the country.', icon: <Route className="w-6 h-6" /> },
  { title: 'Sightseeing Tours', desc: 'Guided day tours with a knowledgeable local driver.', icon: <MapPin className="w-6 h-6" /> },
  { title: 'Family Trips', desc: 'Spacious, safe vehicles suited for family travel with kids.', icon: <Users className="w-6 h-6" /> },
  { title: 'Corporate Travel', desc: 'Dependable transport for business meetings and events.', icon: <Briefcase className="w-6 h-6" /> },
  { title: 'Customized Travel Plans', desc: 'Tell us your route and schedule, we\'ll build the plan.', icon: <Settings2 className="w-6 h-6" /> }
];

const FEATURES = [
  {
    title: 'Professional Drivers',
    desc: 'Every trip comes with an experienced, licensed local driver who knows the roads, whether it\'s a quick city hop or a mountain pass to Muktinath.',
    icon: <UserCheck className="w-7 h-7" />
  },
  {
    title: '24/7 Instant Booking',
    desc: 'Need a cab right now or planning weeks ahead? Call, message, or book online any time, day or night, for instant confirmation.',
    icon: <Zap className="w-7 h-7" />
  },
  {
    title: 'Well-Maintained Fleet',
    desc: 'Our Hyundai Creta and Mahindra Scorpio are regularly serviced, clean, and equipped for both city sightseeing and rugged mountain routes.',
    icon: <Car className="w-7 h-7" />
  },
  {
    title: 'Transparent Fixed Pricing',
    desc: 'Know your fare upfront. No hidden surcharges, no meter surprises, just clear pricing for every tour and cab booking.',
    icon: <CheckCircle className="w-7 h-7" />
  }
];

export default function Home({ packages = [], vehicles = [], testimonials = [], handleOpenDetails }) {
  const navigate = useNavigate();
  
  // Quick Booking Form State
  const [quickBooking, setQuickBooking] = useState({
    pickupLocation: '',
    destination: '',
    date: '',
    pickupTime: '',
    vehicleType: 'Sedan',
    passengers: '1'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuickBooking(prev => ({ ...prev, [name]: value }));
  };

  const handleQuickBookSubmit = (e) => {
    e.preventDefault();
    // Redirect to booking page and pass the form data in state
    navigate('/booking', { state: { bookingDetails: quickBooking } });
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center py-16 px-4 md:px-8 bg-charcoal-dark text-white overflow-hidden">
        {/* Background Image Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 z-0" 
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1486916856992-e4db22c8df33?auto=format&fit=crop&w=1920&q=80')"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal-dark via-charcoal/90 to-transparent z-10" />

        <div className="relative max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-20">
          {/* Hero Text */}
          <div className="lg:col-span-7 text-left space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              <span className="inline-block bg-primary/20 text-primary border border-primary/30 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                Reliable Cab Services in Nepal
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-white">
                24/7 Car Booking<br />
                <span className="text-primary">Across Nepal</span>
              </h1>
              <p className="text-lg text-gray-300 max-w-xl">
                Travel safely and comfortably with professional drivers. Book your ride anytime for airport transfers, sightseeing, business trips, family travel, and intercity journeys throughout Nepal.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-wrap gap-4"
            >
              <button 
                onClick={() => navigate('/booking')} 
                className="bg-primary hover:bg-primary-dark text-white font-bold px-8 py-4 rounded-lg shadow-lg hover:shadow-primary/30 hover:shadow-2xl transition-all duration-300 flex items-center gap-2 transform hover:-translate-y-0.5"
              >
                <Car className="w-5 h-5" /> Book Car Now
              </button>
              <button 
                onClick={() => navigate('/fleet')} 
                className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-lg border border-white/20 transition-all duration-300 flex items-center gap-2"
              >
                View Our Fleet <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          </div>

          {/* Quick Booking Widget */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-5 bg-white/95 text-charcoal p-6 rounded-2xl shadow-2xl glass border border-white/20"
          >
            <h3 className="text-2xl font-bold mb-4 text-charcoal border-b pb-3 flex items-center gap-2">
              <CalendarCheck className="text-primary w-6 h-6" /> Quick Booking Widget
            </h3>
            <form onSubmit={handleQuickBookSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Pickup Location</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                    <MapPin className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    name="pickupLocation"
                    required
                    value={quickBooking.pickupLocation}
                    onChange={handleInputChange}
                    placeholder="e.g. Lakeside, Pokhara or Airport"
                    className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Destination</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                    <Compass className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    name="destination"
                    required
                    value={quickBooking.destination}
                    onChange={handleInputChange}
                    placeholder="e.g. Kathmandu, Chitwan, Sarangkot"
                    className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Pickup Date</label>
                  <input
                    type="date"
                    name="date"
                    required
                    value={quickBooking.date}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Pickup Time</label>
                  <input
                    type="time"
                    name="pickupTime"
                    required
                    value={quickBooking.pickupTime}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Vehicle Type</label>
                  <select
                    name="vehicleType"
                    value={quickBooking.vehicleType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="Sedan">Sedan</option>
                    <option value="SUV">SUV</option>
                    <option value="Jeep">Jeep</option>
                    <option value="Hiace">Hiace (Van)</option>
                    <option value="Luxury Vehicle">Luxury Vehicle</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Passengers</label>
                  <input
                    type="number"
                    name="passengers"
                    min="1"
                    max="20"
                    required
                    value={quickBooking.passengers}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-lg shadow-md transition-colors duration-200 flex justify-center items-center gap-2 mt-2"
              >
                <CalendarCheck className="w-5 h-5" /> Book Now
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Instant Hotline Banner */}
      <section className="bg-charcoal text-white py-6 px-4 border-y border-gray-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="p-3 bg-primary/10 rounded-full text-primary animate-pulse">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-lg text-white">Need a cab right now?</h4>
              <p className="text-gray-400 text-sm">We offer 24/7 instant cab bookings in Pokhara & Kathmandu.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <a href="tel:+9779856012345" className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 shadow-md transition-colors">
              <Phone className="w-4 h-4" /> Call Hotline
            </a>
            <a href="https://wa.me/9779856012345" target="_blank" rel="noopener noreferrer" className="bg-whatsapp hover:bg-green-600 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 shadow-md transition-colors">
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto text-center">
        <div className="max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-primary font-bold text-xs uppercase tracking-widest bg-primary-light/50 px-3 py-1 rounded-full">
            Our Advantage
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-charcoal-dark">
            Why Choose Deurali Tours & Travels
          </h2>
          <p className="text-gray-500 text-base md:text-lg">
            We provide a safe, comfortable, and dependable private car & jeep booking service. Here is why travelers and locals choose Deurali.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map((feat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all text-center flex flex-col items-center"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
                {feat.icon}
              </div>
              <h3 className="text-lg font-bold mb-3 text-charcoal-dark">{feat.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Fleet */}
      <section className="bg-gray-100/60 py-20 px-4 md:px-8 border-y border-gray-200/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="space-y-2 text-left">
              <span className="text-primary font-bold text-xs uppercase tracking-widest bg-primary-light/80 px-3 py-1 rounded-full">
                Our Fleet
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-charcoal-dark">
                Featured Vehicles
              </h2>
              <p className="text-gray-500 text-base max-w-xl">
                Select from our well-maintained selection of comfortable sedans, rugged off-road jeeps, or spacious vans for your group.
              </p>
            </div>
            <button
              onClick={() => navigate('/fleet')}
              className="text-primary hover:text-primary-dark font-bold flex items-center gap-1 transition-colors self-start md:self-end"
            >
              View Full Fleet <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {vehicles.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
              <p className="text-gray-400">Loading our fleet...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {vehicles.slice(0, 3).map((vehicle, index) => (
                <div key={index} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
                  <div className="relative h-48 bg-gray-200 overflow-hidden">
                    <img src={vehicle.image} alt={vehicle.name} className="w-full h-full object-cover" />
                    <span className="absolute top-4 right-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                      {vehicle.type}
                    </span>
                  </div>
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
                        <span>Passenger seats: {vehicle.seats}</span>
                        <span>•</span>
                        <span>Luggage: {vehicle.luggage}</span>
                      </div>
                      <h3 className="text-xl font-bold text-charcoal-dark mb-4">{vehicle.name}</h3>
                      <ul className="text-gray-500 text-xs space-y-2 mb-6">
                        {vehicle.features.slice(0, 3).map((f, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <button
                      onClick={() => navigate('/booking', { state: { vehicleName: vehicle.name, vehicleType: vehicle.type } })}
                      className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-2.5 rounded-lg text-sm transition-colors flex items-center justify-center gap-1"
                    >
                      Book Now <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto text-center">
        <div className="max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-primary font-bold text-xs uppercase tracking-widest bg-primary-light/50 px-3 py-1 rounded-full">
            Services
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-charcoal-dark">
            Our Transportation Services
          </h2>
          <p className="text-gray-500 text-base md:text-lg">
            One trusted team for every kind of journey, from a quick airport run to a multi-day trip across Nepal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.slice(0, 6).map((svc, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow text-left flex gap-4">
              <div className="p-3 bg-primary/10 rounded-xl text-primary shrink-0 h-fit">
                {svc.icon}
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-lg text-charcoal-dark">{svc.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{svc.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <button 
          onClick={() => navigate('/services')} 
          className="mt-12 inline-flex items-center gap-2 border border-primary text-primary hover:bg-primary hover:text-white px-8 py-3.5 rounded-lg font-bold transition-all"
        >
          View All Services <ArrowRight className="w-4 h-4" />
        </button>
      </section>

      {/* Popular Packages */}
      <section className="bg-gray-100/60 py-20 px-4 md:px-8 border-y border-gray-200/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="space-y-2 text-left">
              <span className="text-primary font-bold text-xs uppercase tracking-widest bg-primary-light/80 px-3 py-1 rounded-full">
                Explore Nepal
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-charcoal-dark">
                Popular Tour Packages
              </h2>
              <p className="text-gray-500 text-base max-w-xl">
                Private vehicle tours with fixed, transparent pricing and experienced drivers.
              </p>
            </div>
            <button
              onClick={() => navigate('/packages')}
              className="text-primary hover:text-primary-dark font-bold flex items-center gap-1 transition-colors self-start md:self-end"
            >
              View All Packages <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {packages.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
              <p className="text-gray-400">Loading tour packages...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {packages.slice(0, 3).map((pkg, index) => (
                <div key={pkg._id || index} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
                  <div className="relative h-56 bg-gray-200 overflow-hidden">
                    <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" />
                    <span className="absolute top-4 right-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                      {pkg.difficulty || 'Tour'}
                    </span>
                    <span className="absolute bottom-4 left-4 bg-charcoal-dark/80 text-white text-sm font-bold px-3 py-1.5 rounded-lg">
                      Rs. {pkg.price}
                    </span>
                  </div>
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
                        <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-primary" /> {pkg.location}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-primary" /> {pkg.duration} Days</span>
                      </div>
                      <h3 className="text-xl font-bold text-charcoal-dark mb-3 line-clamp-1">{pkg.name}</h3>
                      <p className="text-gray-500 text-sm mb-6 line-clamp-2">{pkg.shortDescription}</p>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleOpenDetails(pkg)}
                        className="flex-1 border border-gray-300 hover:border-charcoal text-charcoal font-semibold py-2.5 rounded-lg text-sm transition-colors text-center"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => navigate('/booking', { state: { packageName: pkg.name, destination: pkg.location } })}
                        className="flex-1 bg-primary hover:bg-primary-dark text-white font-bold py-2.5 rounded-lg text-sm transition-colors text-center"
                      >
                        Book
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto text-center">
        <div className="max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-primary font-bold text-xs uppercase tracking-widest bg-primary-light/50 px-3 py-1 rounded-full">
            Reviews
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-charcoal-dark">
            Stories from the Road
          </h2>
          <p className="text-gray-500 text-base md:text-lg">
            Read personal experiences from travelers who booked cars, jeeps, and tours with the Deurali team.
          </p>
        </div>

        {testimonials.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400">No reviews found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.slice(0, 3).map((test, index) => (
              <div key={test._id || index} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow text-left flex flex-col justify-between h-full">
                <div>
                  <div className="flex text-primary gap-1 mb-4">
                    {[...Array(test.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 italic text-sm mb-6 leading-relaxed">
                    "{test.text}"
                  </p>
                </div>
                <div className="flex items-center gap-4 border-t pt-4">
                  <img src={test.photo || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100&q=80"} alt={test.clientName} className="w-12 h-12 rounded-full object-cover border border-gray-200" />
                  <div>
                    <h4 className="font-bold text-charcoal-dark text-sm">{test.clientName}</h4>
                    <p className="text-gray-400 text-xs">{test.country}</p>
                    {test.trekName && (
                      <span className="inline-block mt-1 bg-gray-100 text-gray-600 text-[10px] font-semibold px-2 py-0.5 rounded">
                        {test.trekName}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
