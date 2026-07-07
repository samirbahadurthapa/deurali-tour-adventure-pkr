import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, Star, ArrowRight, Search } from 'lucide-react';

export default function Packages({ packages = [], handleOpenDetails }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('All');

  // Filter package options
  const filteredPackages = packages.filter(pkg => {
    const matchesSearch = pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          pkg.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = filterDifficulty === 'All' || pkg.difficulty === filterDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  // Get unique difficulties for filtering
  const difficulties = ['All', ...new Set(packages.map(p => p.difficulty).filter(Boolean))];

  return (
    <div className="w-full">
      {/* Banner */}
      <section className="bg-charcoal-dark text-white py-16 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-25" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1627856013091-fed6e4e30025?auto=format&fit=crop&w=1200&q=80')" }} />
        <div className="relative max-w-4xl mx-auto space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold">Popular Tour Packages</h1>
          <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto">
            Book private vehicle sightseeing trips to Nepal's most stunning destinations. Safe, fixed pricing, and professional driver guides.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Search and Filters Bar */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-12 bg-white p-4 rounded-xl border border-gray-150 shadow-sm w-full">
          {/* Search box */}
          <div className="relative w-full md:max-w-md">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
              <Search className="w-4 h-4" />
            </span>
            <input 
              type="text" 
              placeholder="Search by destination or package name..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-250 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>

          {/* Difficulty filter */}
          <div className="flex gap-2 self-start md:self-auto overflow-x-auto pb-1 md:pb-0">
            {difficulties.map(diff => (
              <button
                key={diff}
                onClick={() => setFilterDifficulty(diff)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold border transition-colors shrink-0 ${
                  filterDifficulty === diff 
                    ? 'bg-primary border-primary text-white' 
                    : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>

        {/* Packages Grid */}
        {packages.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm max-w-lg mx-auto">
            <p className="text-gray-400">Loading tour packages...</p>
          </div>
        ) : filteredPackages.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm max-w-lg mx-auto">
            <p className="text-gray-400">No packages match your search filters. Try clearing some criteria.</p>
          </div>
        ) : (
          <motion.div 
            layout 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredPackages.map((pkg, index) => (
                <motion.div
                  key={pkg._id || index}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all flex flex-col h-full"
                >
                  {/* Image overlay */}
                  <div className="relative h-56 bg-gray-100 overflow-hidden">
                    <img 
                      src={pkg.image} 
                      alt={pkg.name} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                    />
                    <span className="absolute top-4 right-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {pkg.difficulty || 'Tour'}
                    </span>
                    <span className="absolute bottom-4 left-4 bg-charcoal-dark/85 text-white text-sm font-extrabold px-3 py-1.5 rounded-lg">
                      Rs. {pkg.price}
                    </span>
                  </div>

                  {/* Body details */}
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      {/* Meta stats */}
                      <div className="flex items-center gap-4 text-xs text-gray-500 mb-3 font-medium">
                        <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-primary shrink-0" /> {pkg.location}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-primary shrink-0" /> {pkg.duration} Days</span>
                      </div>

                      <h3 className="text-xl font-bold text-charcoal-dark mb-3 line-clamp-1">{pkg.name}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-2">{pkg.shortDescription}</p>
                    </div>

                    <div className="border-t pt-4">
                      {/* Rating footer */}
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-1 text-primary">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="text-charcoal-dark font-bold text-sm">{pkg.rating || '4.8'}</span>
                        </div>
                        
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleOpenDetails(pkg)}
                            className="px-4 py-2 border border-gray-300 hover:border-charcoal rounded-lg text-xs font-bold text-gray-600 transition-colors"
                          >
                            Details
                          </button>
                          <button
                            onClick={() => navigate('/booking', { 
                              state: { 
                                packageName: pkg.name, 
                                destination: pkg.location 
                              } 
                            })}
                            className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg text-xs font-bold shadow-sm transition-colors flex items-center gap-1"
                          >
                            Book Now <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
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
