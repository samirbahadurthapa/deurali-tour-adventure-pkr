import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqItems = [
  {
    q: "When is the best season to trek in Nepal?",
    a: "The absolute best times to trek in Nepal are Spring (March to May), when rhododendrons bloom and weather is mild, and Autumn (September to November), which offers crystal-clear skies, fresh air, and optimal mountain views. Winter trekking is possible at lower altitudes, while Summer corresponds with the monsoon season, though Upper Mustang (a rain-shadow region) is great to trek during Summer."
  },
  {
    q: "Do I need travel insurance for trekking in Nepal?",
    a: "Yes, comprehensive travel insurance is mandatory for all our trekking tours. Your policy must cover high-altitude emergency helicopter evacuation (up to 6,000m), medical treatment, and repatriation. Please provide a copy of your policy details to Deurali before commencing the trek."
  },
  {
    q: "What is altitude sickness (AMS) and how does Deurali prevent it?",
    a: "Acute Mountain Sickness (AMS) can happen when ascending rapidly to heights above 2,500m. Our itineraries are engineered by medical professionals to include proper acclimatization rest days. Our guides are trained in Wilderness First Aid, carry pulse oximeters to monitor blood oxygen levels daily, and carry emergency oxygen cylinders on high-altitude expeditions."
  },
  {
    q: "Can I customize an itinerary for a private group?",
    a: "Absolutely! Deurali specializes in tailoring bespoke adventure itineraries. You can customize departure dates, change difficulty scaling, choose luxury lodges or remote camping, and adjust destinations. Contact our team through the inquiry form below to sketch your custom route."
  },
  {
    q: "What is included in the trek packages?",
    a: "Our standard packages include airport transfers, standard tourist hotel accommodations in Kathmandu/Pokhara, teahouse lodges during the trek, professional licensed guides, experienced porters, all necessary trekking permits (TIMS, National Park, or Restricted Area permits), and three hearty meals daily during the trek. International flights, visa fees, and personal equipment are excluded."
  }
];

function FaqSection() {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  return (
    <section
      id="faq"
      className="section"
      style={{ backgroundColor: 'rgba(27, 67, 50, 0.02)', width: '100vw', maxWidth: 'none' }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <div className="text-center">
          <span className="section-tag">Information Desk</span>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">
            Preparing for a trek involves research. Here are standard questions answered by our mountain team.
          </p>
        </div>
        <div className="faq-container">
          {faqItems.map((item, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div className={`faq-item ${isOpen ? 'open' : ''}`} key={index}>
                <div className="faq-question" onClick={() => setOpenFaqIndex(isOpen ? null : index)}>
                  <span>{item.q}</span>
                  <ChevronDown size={18} className="faq-icon" />
                </div>
                <div className="faq-answer">
                  <div className="faq-answer-inner">
                    <p>{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FaqSection;