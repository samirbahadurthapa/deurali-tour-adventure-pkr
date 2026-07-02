import React from 'react';
import { motion } from 'framer-motion';
import { UserCheck, ShieldCheck, Map, CheckCircle } from 'lucide-react';

const features = [
  {
    title: 'Certified Local Guides',
    desc: 'Trek with certified local Sherpas and experts who have spent decades navigating Himalayan trails, offering deep cultural insights and secure navigations.',
    icon: <UserCheck size={28} />
  },
  {
    title: 'Safety First Protocol',
    desc: 'All itineraries integrate oxygen systems, daily health vitals check, satellite communications, and quick-response emergency helicopter evac cover.',
    icon: <ShieldCheck size={28} />
  },
  {
    title: 'Bespoke Custom Tours',
    desc: 'Tailor any trek to fit your personal fitness levels, schedule, accommodation preferences, and list of side-exploration spots.',
    icon: <Map size={28} />
  },
  {
    title: 'Fair & Clear Pricing',
    desc: 'Premium service with transparent pricing. Zero hidden surcharges, fair wages paid to all porters/guides, and sustainable eco-tourism practices.',
    icon: <CheckCircle size={28} />
  }
];

function AboutSection() {
  return (
    <section id="about" className="section">
      <div className="text-center">
        <span className="section-tag">Why Deurali</span>
        <h2 className="section-title">Elevate Your Adventure</h2>
        <p className="section-subtitle">
          We provide a premium, safe, and deeply immersive mountain experience. Here is why trekking
          enthusiasts choose Deurali.
        </p>
      </div>
      <div className="grid-4">
        {features.map((feat, index) => (
          <motion.div
            className="feature-card"
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="feature-icon-wrapper">{feat.icon}</div>
            <h3>{feat.title}</h3>
            <p>{feat.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default AboutSection;