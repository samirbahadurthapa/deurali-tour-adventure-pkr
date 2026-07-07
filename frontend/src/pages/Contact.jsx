import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send, CheckCircle, Clock } from 'lucide-react';

export default function Contact() {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submittingContact, setSubmittingContact] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactError, setContactError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setSubmittingContact(true);
    setContactError('');
    setContactSuccess(false);

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm)
      });
      const data = await res.json();
      if (res.ok) {
        setContactSuccess(true);
        setContactForm({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setContactError(data.message || 'Error sending message.');
      }
    } catch (err) {
      setContactError('Network error. Please try again.');
    } finally {
      setSubmittingContact(false);
    }
  };

  return (
    <div className="w-full">
      {/* Banner */}
      <section className="bg-charcoal-dark text-white py-16 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-25" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486916856992-e4db22c8df33?auto=format&fit=crop&w=1200&q=80')" }} />
        <div className="relative max-w-4xl mx-auto space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold">Contact Us</h1>
          <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto">
            Need custom pricing for a group tour, long-distance ride, or corporate event? Get in touch with our team.
          </p>
        </div>
      </section>

      {/* Main Info */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">
        {/* Contact Info Panel */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-3">
            <span className="text-primary font-bold text-xs uppercase tracking-widest bg-primary-light/50 px-3 py-1 rounded-full">
              Get in Touch
            </span>
            <h2 className="text-3xl font-extrabold text-charcoal-dark">
              Talk to Our Team
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              We respond to inquiries within 12 hours. For immediate bookings or urgent pickups, please dial our hotline.
            </p>
          </div>

          <div className="space-y-6">
            {/* Card 1 */}
            <div className="flex gap-4 p-4 rounded-xl border border-gray-100 bg-white">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="text-sm">
                <h4 className="font-bold text-charcoal-dark mb-1">Main Offices</h4>
                <p className="text-gray-500">Lakeside Street-6, Pokhara, Nepal</p>
                <p className="text-gray-500">Thamel Tourist Hub, Kathmandu, Nepal</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="flex gap-4 p-4 rounded-xl border border-gray-100 bg-white">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div className="text-sm">
                <h4 className="font-bold text-charcoal-dark mb-1">Call Center</h4>
                <p className="text-gray-500">Hotline: <a href="tel:+97761469000" className="hover:text-primary transition-colors">+977-61-469000</a></p>
                <p className="text-gray-500">WhatsApp: <a href="tel:+9779856012345" className="hover:text-primary transition-colors">+977-98560-12345</a></p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="flex gap-4 p-4 rounded-xl border border-gray-100 bg-white">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="text-sm">
                <h4 className="font-bold text-charcoal-dark mb-1">Email Details</h4>
                <p className="text-gray-500"><a href="mailto:info@deuralitravel.com" className="hover:text-primary transition-colors">info@deuralitravel.com</a></p>
                <p className="text-gray-500"><a href="mailto:bookings@deuralitravel.com" className="hover:text-primary transition-colors">bookings@deuralitravel.com</a></p>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="h-64 rounded-2xl overflow-hidden border border-gray-200 shadow-sm relative">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14059.600989397637!2d83.9575971485604!3d28.20973347101784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3995951cd5f309a5%3A0x6b4be933221b960a!2sLakeside%20Rd%2C%20Pokhara%2033700!5e0!3m2!1sen!2snp!4v1719280000000!5m2!1sen!2snp" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Deurali Office Map Location"
            />
          </div>
        </div>

        {/* Contact Form Panel */}
        <div className="lg:col-span-7 bg-white p-8 rounded-2xl border border-gray-100 shadow-md">
          {contactSuccess ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-charcoal-dark">Inquiry Sent Successfully!</h3>
              <p className="text-gray-500 text-sm max-w-sm mx-auto leading-relaxed">
                Thank you for contacting us. Our representative will respond to your registered email or phone within 12 hours.
              </p>
              <button 
                onClick={() => setContactSuccess(false)}
                className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow-md transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-5">
              <h3 className="text-xl font-bold text-charcoal-dark mb-4">Send us an Inquiry</h3>
              
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                  Your Name
                </label>
                <input 
                  type="text" 
                  name="name" 
                  required 
                  value={contactForm.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    name="email" 
                    required 
                    value={contactForm.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                    Phone Number
                  </label>
                  <input 
                    type="tel" 
                    name="phone" 
                    required 
                    value={contactForm.phone}
                    onChange={handleChange}
                    placeholder="Phone number"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                  Subject
                </label>
                <input 
                  type="text" 
                  name="subject" 
                  required 
                  value={contactForm.subject}
                  onChange={handleChange}
                  placeholder="Subject details"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                  Message Details
                </label>
                <textarea 
                  name="message" 
                  required 
                  value={contactForm.message}
                  onChange={handleChange}
                  placeholder="Type your detailed message here..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent min-h-[120px]"
                />
              </div>

              {contactError && (
                <div className="text-red-600 text-xs font-semibold">
                  {contactError}
                </div>
              )}

              <button 
                type="submit" 
                disabled={submittingContact}
                className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-lg text-sm shadow-md transition-colors flex justify-center items-center gap-1.5"
              >
                <Send className="w-4 h-4" /> {submittingContact ? 'Sending Inquiry...' : 'Send Inquiry'}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
