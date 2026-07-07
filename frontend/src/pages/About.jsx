import React from 'react';
import { Compass, Users, UserCheck, ShieldCheck, Heart, Award } from 'lucide-react';

const VALUES = [
  { title: 'Safety First', desc: 'All our drivers undergo strict background checks and driver training. Vehicles are serviced weekly to guarantee safe passenger transit.', icon: <ShieldCheck className="w-6 h-6" /> },
  { title: 'Customer Delight', desc: 'From instant WhatsApp messaging to clean vehicle cabins, our priority is providing you a stress-free travel experience.', icon: <Heart className="w-6 h-6" /> },
  { title: 'Transparent Pricing', desc: 'No bargaining, no meter tampering, no surprising surcharges. Our fixed rates are presented upfront with clear details.', icon: <Award className="w-6 h-6" /> }
];

export default function About() {
  return (
    <div className="w-full">
      {/* Banner */}
      <section className="bg-charcoal-dark text-white py-16 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-25" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1558862107-d49ef2a04d72?auto=format&fit=crop&w=1200&q=80')" }} />
        <div className="relative max-w-4xl mx-auto space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold">About Deurali Tours</h1>
          <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto">
            Providing comfortable and safe private vehicle rental & sightseeing tours across Nepal since 2018.
          </p>
        </div>
      </section>

      {/* Main Info */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <span className="text-primary font-bold text-xs uppercase tracking-widest bg-primary-light/50 px-3 py-1 rounded-full">
              Our Journey
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-charcoal-dark leading-tight">
              Leading Private Cab & Tour Provider in Pokhara
            </h2>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed">
              Deurali Tours & Travels was established with a simple mission: to take the stress out of traveling in Nepal. Finding a comfortable car with a driver you can trust should not involve hours of negotiations. We designed a fixed, transparent pricing model coupled with a selection of premium, well-maintained vehicles.
            </p>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed">
              Whether you are an international traveler flying into Pokhara for a trek, a family visiting the temples of Muktinath, or a business team traveling to Kathmandu, we have the ideal fleet—from smooth Creta sedans to rugged Mahindra Scorpio jeeps and spacious Hiace vans.
            </p>

            <div className="grid grid-cols-3 gap-6 pt-6 border-t">
              <div>
                <h4 className="text-3xl font-extrabold text-primary">5,000+</h4>
                <p className="text-gray-400 text-xs mt-1">Trips Completed</p>
              </div>
              <div>
                <h4 className="text-3xl font-extrabold text-primary">50+</h4>
                <p className="text-gray-400 text-xs mt-1">Local Drivers</p>
              </div>
              <div>
                <h4 className="text-3xl font-extrabold text-primary">4.9/5</h4>
                <p className="text-gray-400 text-xs mt-1">Customer Rating</p>
              </div>
            </div>
          </div>

          {/* Visual column */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3] bg-gray-200">
              <img 
                src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80" 
                alt="Deurali travels jeep tour" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Float badge */}
            <div className="absolute -bottom-6 -left-6 bg-white p-5 rounded-2xl shadow-lg border border-gray-100 flex items-center gap-3 max-w-xs">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                <Compass className="w-6 h-6" />
              </div>
              <div>
                <h5 className="font-extrabold text-charcoal-dark text-sm">Registered Travel Agency</h5>
                <p className="text-gray-400 text-xs">Fully certified by the Ministry of Tourism, Nepal.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-gray-100/60 py-20 px-4 md:px-8 border-t border-gray-200/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-primary font-bold text-xs uppercase tracking-widest bg-primary-light/80 px-3 py-1 rounded-full">
              Our Values
            </span>
            <h2 className="text-3xl font-extrabold text-charcoal-dark">
              What We Stand For
            </h2>
            <p className="text-gray-500 text-sm md:text-base">
              At Deurali, our core business model is centered on building trust. We achieve this by adhering to three simple rules.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {VALUES.map((val, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm text-center flex flex-col items-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
                  {val.icon}
                </div>
                <h3 className="text-lg font-bold mb-3 text-charcoal-dark">{val.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
