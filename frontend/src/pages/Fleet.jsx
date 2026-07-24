import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Luggage, Snowflake, UserCheck, CheckCircle, ArrowRight, Car } from 'lucide-react';
import bgImage from "../asset/background_image.avif"; 


const CATEGORIES = ['All', 'Sedan', 'SUV', 'Jeep', 'Hiace', 'Luxury Vehicle'];

export default function Fleet({ vehicles = [] }) {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredVehicles = activeFilter === 'All' 
    ? vehicles 
    : vehicles.filter(v => v.type.toLowerCase().includes(activeFilter.toLowerCase()) || activeFilter.toLowerCase().includes(v.type.toLowerCase()));

  return (
    <div className="w-full">
      {/* Banner */}
      <section className="bg-charcoal-dark text-white py-16 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-25" style={{ backgroundImage: `url(${bgImage})` }} />
        <div className="relative max-w-4xl mx-auto space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold">Our Fleet</h1>
          <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto">
            Choose from our clean, well-maintained vehicles for city travels, highway cruising, or rugged mountain off-roading.
          </p>
        </div>
      </section>

      {/* Fleet Content */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold border transition-all ${
                activeFilter === cat 
                  ? 'bg-primary border-primary text-white shadow-md' 
                  : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Vehicles Grid */}
        {vehicles.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm max-w-lg mx-auto">
            <p className="text-gray-400">Loading our fleet vehicles...</p>
          </div>
        ) : filteredVehicles.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm max-w-lg mx-auto">
            <p className="text-gray-400">No vehicles found in this category. Please try another filter.</p>
          </div>
        ) : (
          <motion.div 
            layout 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredVehicles.map((vehicle, index) => (
                <motion.div
                  key={vehicle._id || index}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200/80 transition-all flex flex-col h-full"
                >
                  {/* Image wrapper */}
                  <div className="relative h-56 bg-gray-50 overflow-hidden flex items-center justify-center p-2">
                    <img 
                      src={vehicle.image} 
                      alt={vehicle.name} 
                      className="w-full h-full object-contain transition-transform duration-500 hover:scale-102" 
                    />
                    <span className="absolute top-4 right-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {vehicle.type}
                    </span>
                  </div>

                  {/* Body content */}
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      {/* Stats */}
                      <div className="flex items-center gap-4 text-xs text-gray-500 mb-3 font-medium">
                        <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-primary" /> {vehicle.seats} Passengers</span>
                        <span>•</span>
                        <span className="flex items-center gap-1"><Luggage className="w-3.5 h-3.5 text-primary" /> {vehicle.luggage}</span>
                      </div>

                      <h3 className="text-xl font-bold text-charcoal-dark mb-4">{vehicle.name}</h3>

                      {/* Specs pills */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {vehicle.driverIncluded && (
                          <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-2.5 py-1 rounded-md flex items-center gap-1">
                            <UserCheck className="w-3.5 h-3.5 text-primary" /> Driver Included
                          </span>
                        )}
                        {vehicle.ac && (
                          <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-2.5 py-1 rounded-md flex items-center gap-1">
                            <Snowflake className="w-3.5 h-3.5 text-primary" /> Air Conditioned
                          </span>
                        )}
                      </div>

                      {/* Feature list */}
                      <ul className="space-y-2 border-t pt-4 mt-2">
                        {vehicle.features.map((feat, i) => (
                          <li key={i} className="flex items-start gap-2 text-gray-500 text-sm">
                            <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Book now */}
                    <button
                      onClick={() => navigate('/booking', { 
                        state: { 
                          vehicleName: vehicle.name, 
                          vehicleType: vehicle.type 
                        } 
                      })}
                      className="w-full bg-charcoal hover:bg-charcoal-dark text-white font-bold py-3 rounded-lg text-sm transition-colors flex items-center justify-center gap-1.5 mt-6 shadow-sm"
                    >
                      <Car className="w-4 h-4" /> Book This Vehicle <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>
    </div>
  );
}
