import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Clock, PlaneTakeoff, Building2, Compass, Route, Map, Users, Briefcase, Settings2, ArrowRight 
} from 'lucide-react';

const SERVICES = [
  { title: '24/7 Car Booking', desc: 'Instant or scheduled bookings, any hour of the day or night. Quick pickup and reliable tracking.', icon: <Clock className="w-8 h-8" /> },
  { title: 'Airport Pickup & Drop', desc: 'On-time transfers to and from Pokhara and Kathmandu airports. Meet & greet service with baggage handling.', icon: <PlaneTakeoff className="w-8 h-8" /> },
  { title: 'Hotel Pickup & Drop', desc: 'Door-to-door service from your hotel, guesthouse, or homestay directly to your destination.', icon: <Building2 className="w-8 h-8" /> },
  { title: 'Tourist Transportation', desc: 'Comfortable rides to every major sightseeing spot in Pokhara and Nepal, tailored for your group.', icon: <Compass className="w-8 h-8" /> },
  { title: 'Intercity Travel', desc: 'Reliable long-distance rides between Kathmandu, Pokhara, Chitwan, Lumbini, and other cities.', icon: <Route className="w-8 h-8" /> },
  { title: 'Sightseeing Tours', desc: 'Guided day tours with a knowledgeable local driver who knows the best viewpoints and local spots.', icon: <Map className="w-8 h-8" /> },
  { title: 'Family Trips', desc: 'Spacious, safe vehicles suited for family travel with kids, featuring extra luggage space and child safety.', icon: <Users className="w-8 h-8" /> },
  { title: 'Corporate Travel', desc: 'Dependable transport for business meetings, conferences, and corporate events with premium vehicles.', icon: <Briefcase className="w-8 h-8" /> },
  { title: 'Customized Travel Plans', desc: 'Tell us your itinerary and schedule, and we\'ll build the perfect transportation plan.', icon: <Settings2 className="w-8 h-8" /> }
];

export default function Services() {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      {/* Banner */}
      <section className="bg-charcoal-dark text-white py-16 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-25" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80')" }} />
        <div className="relative max-w-4xl mx-auto space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold">Our Services</h1>
          <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto">
            Explore our comprehensive range of private transport, airport runs, sightseeing, and intercity travel services across Nepal.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((svc, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group hover:-translate-y-1"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 transition-colors group-hover:bg-primary group-hover:text-white">
                {svc.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-charcoal-dark">{svc.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">{svc.desc}</p>
              
              <button
                onClick={() => navigate('/booking', { state: { packageName: `Service: ${svc.title}` } })}
                className="text-primary hover:text-primary-dark font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all"
              >
                Inquire For Booking <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16 px-4 text-center text-white">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl font-extrabold">Ready to start your journey?</h2>
          <p className="text-white/80 max-w-xl mx-auto text-base">
            Tell us where you want to go. We'll arrange the perfect vehicle, experienced driver, and transparent routing for you.
          </p>
          <button
            onClick={() => navigate('/booking')}
            className="bg-charcoal hover:bg-charcoal-dark text-white px-8 py-3.5 rounded-lg font-bold shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2"
          >
            Go To Booking Form <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
}
