import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, X } from 'lucide-react';

const CATEGORIES = ['all', 'sightseeing', 'nature', 'culture', 'adventure', 'wildlife'];

export default function Gallery({ gallery = [] }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxImg, setLightboxImg] = useState(null);

  const filteredGallery = activeFilter === 'all'
    ? gallery
    : gallery.filter(item => item.category === activeFilter);

  return (
    <div className="w-full">
      {/* Banner */}
      <section className="bg-charcoal-dark text-white py-16 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-25" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80')" }} />
        <div className="relative max-w-4xl mx-auto space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold">Visual Portfolio</h1>
          <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto">
            View our collection of scenic highlights, mountain passes, and travel moments captured on the road across Nepal.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2 rounded-full text-xs font-bold border capitalize transition-all ${
                activeFilter === cat 
                  ? 'bg-primary border-primary text-white shadow-sm' 
                  : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry-like grid */}
        {gallery.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm max-w-lg mx-auto">
            <p className="text-gray-400">Loading photography portfolio...</p>
          </div>
        ) : filteredGallery.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm max-w-lg mx-auto">
            <p className="text-gray-400">No photos found in this category.</p>
          </div>
        ) : (
          <motion.div 
            layout 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredGallery.map((img, index) => (
                <motion.div
                  key={img._id || index}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setLightboxImg(img)}
                  className="relative rounded-xl overflow-hidden shadow-sm aspect-square bg-gray-100 cursor-pointer group"
                >
                  <img 
                    src={img.url} 
                    alt={img.title} 
                    loading="lazy" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end text-left">
                    <h4 className="font-bold text-white text-sm leading-tight">{img.title}</h4>
                    <span className="text-white/80 text-xs mt-1 flex items-center gap-0.5">
                      <MapPin className="w-3 h-3 text-primary shrink-0" /> {img.location}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxImg && (
          <div 
            className="fixed inset-0 bg-charcoal-dark/95 z-[9999] flex items-center justify-center p-4 cursor-pointer"
            onClick={() => setLightboxImg(null)}
          >
            <button 
              onClick={() => setLightboxImg(null)} 
              className="absolute top-6 right-6 text-white/75 hover:text-white transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-4xl w-full max-h-[85vh] relative text-left"
              onClick={e => e.stopPropagation()}
            >
              <img 
                src={lightboxImg.url} 
                alt={lightboxImg.title} 
                className="max-h-[75vh] mx-auto rounded-lg shadow-2xl border border-white/10 object-contain"
              />
              <div className="mt-4 text-white text-center">
                <h4 className="text-lg font-bold">{lightboxImg.title}</h4>
                <p className="text-gray-400 text-sm flex items-center justify-center gap-1 mt-1">
                  <MapPin className="w-4 h-4 text-primary" /> {lightboxImg.location} ({lightboxImg.category})
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
