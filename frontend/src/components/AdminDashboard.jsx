import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, MessageSquare, Map, Image, Plus, Trash2, Check, X, Edit, Eye, 
  MapPin, Clock, DollarSign, ArrowLeft, ShieldAlert, Car, Users, Luggage, LogOut
} from 'lucide-react';
import { authFetch, clearAdminToken } from '../utils/api.js';

export default function AdminDashboard({ handleLogout }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('bookings');
  
  // Lists
  const [bookings, setBookings] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [packages, setPackages] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [gallery, setGallery] = useState([]);
  
  // Loading & UI States
  const [loading, setLoading] = useState(true);
  const [pkgModalOpen, setPkgModalOpen] = useState(false);
  const [editingPkg, setEditingPkg] = useState(null);
  const [vehicleModalOpen, setVehicleModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  
  // Package Form State
  const [pkgForm, setPkgForm] = useState({
    name: '',
    shortDescription: '',
    description: '',
    duration: '',
    price: '',
    image: '',
    location: '',
    difficulty: 'Sedan (Hyundai Creta)',
    highlights: '',
    maxGroupSize: 4,
    bestSeason: 'Spring, Autumn'
  });

  // Gallery Add Form State
  const [galleryForm, setGalleryForm] = useState({
    url: '',
    title: '',
    category: 'sightseeing',
    location: ''
  });

  // Vehicle Form State
  const [vehicleForm, setVehicleForm] = useState({
    name: '',
    type: 'Sedan',
    seats: 4,
    luggage: '',
    driverIncluded: true,
    ac: true,
    image: '',
    features: ''
  });

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'bookings') {
        const res = await authFetch('/api/bookings');
        const data = await res.json();
        setBookings(data);
      } else if (activeTab === 'inquiries') {
        const res = await authFetch('/api/inquiries');
        const data = await res.json();
        setInquiries(data);
      } else if (activeTab === 'packages') {
        const res = await authFetch('/api/packages');
        const data = await res.json();
        setPackages(data);
      } else if (activeTab === 'vehicles') {
        const res = await authFetch('/api/vehicles');
        const data = await res.json();
        setVehicles(data);
      } else if (activeTab === 'gallery') {
        const res = await authFetch('/api/gallery');
        const data = await res.json();
        setGallery(data);
      }
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Booking Actions
  const updateBookingStatus = async (id, status) => {
    try {
      const res = await authFetch(`/api/bookings/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        setBookings(prev => prev.map(b => b._id === id ? { ...b, status } : b));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteBooking = async (id) => {
    if (!window.confirm('Delete this booking?')) return;
    try {
      const res = await authFetch(`/api/bookings/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setBookings(prev => prev.filter(b => b._id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Inquiry Actions
  const updateInquiryStatus = async (id, status) => {
    try {
      const res = await authFetch(`/api/inquiries/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        setInquiries(prev => prev.map(i => i._id === id ? { ...i, status } : i));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteInquiry = async (id) => {
    if (!window.confirm('Delete this inquiry?')) return;
    try {
      const res = await authFetch(`/api/inquiries/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setInquiries(prev => prev.filter(i => i._id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Package CRUD Actions
  const openPkgModal = (pkg = null) => {
    if (pkg) {
      setEditingPkg(pkg);
      setPkgForm({
        name: pkg.name,
        shortDescription: pkg.shortDescription,
        description: pkg.description,
        duration: pkg.duration,
        price: pkg.price,
        image: pkg.image,
        location: pkg.location,
        difficulty: pkg.difficulty,
        highlights: pkg.highlights ? pkg.highlights.join(', ') : '',
        maxGroupSize: pkg.maxGroupSize,
        bestSeason: pkg.bestSeason ? pkg.bestSeason.join(', ') : 'Spring, Autumn'
      });
    } else {
      setEditingPkg(null);
      setPkgForm({
        name: '',
        shortDescription: '',
        description: '',
        duration: '',
        price: '',
        image: '',
        location: '',
        difficulty: 'Sedan (Hyundai Creta)',
        highlights: '',
        maxGroupSize: 4,
        bestSeason: 'Spring, Autumn'
      });
    }
    setPkgModalOpen(true);
  };

  const handlePkgSubmit = async (e) => {
    e.preventDefault();
    const formattedData = {
      ...pkgForm,
      price: Number(pkgForm.price),
      duration: Number(pkgForm.duration),
      maxGroupSize: Number(pkgForm.maxGroupSize),
      highlights: pkgForm.highlights.split(',').map(h => h.trim()).filter(Boolean),
      bestSeason: pkgForm.bestSeason.split(',').map(s => s.trim()).filter(Boolean),
      itinerary: [
        { day: 1, title: 'Pickup & Departure', description: 'Pickup from your hotel, route orientation, and departure with driver.' },
        { day: 2, title: 'Sightseeing & Dropoff', description: 'Sightseeing at key locations, return, and drop off at your hotel.' }
      ]
    };

    try {
      let res;
      if (editingPkg) {
        res = await authFetch(`/api/packages/${editingPkg._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formattedData)
        });
      } else {
        res = await authFetch('/api/packages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formattedData)
        });
      }

      if (res.ok) {
        setPkgModalOpen(false);
        fetchData();
      } else {
        const err = await res.json();
        alert(err.message || 'Error saving package');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deletePackage = async (id) => {
    if (!window.confirm('Delete this package? This cannot be undone.')) return;
    try {
      const res = await authFetch(`/api/packages/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setPackages(prev => prev.filter(p => p._id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Vehicle (Fleet) CRUD Actions
  const openVehicleModal = (vehicle = null) => {
    if (vehicle) {
      setEditingVehicle(vehicle);
      setVehicleForm({
        name: vehicle.name,
        type: vehicle.type,
        seats: vehicle.seats,
        luggage: vehicle.luggage,
        driverIncluded: vehicle.driverIncluded !== false,
        ac: vehicle.ac !== false,
        image: vehicle.image,
        features: vehicle.features ? vehicle.features.join(', ') : ''
      });
    } else {
      setEditingVehicle(null);
      setVehicleForm({
        name: '',
        type: 'Sedan',
        seats: 4,
        luggage: '',
        driverIncluded: true,
        ac: true,
        image: '',
        features: ''
      });
    }
    setVehicleModalOpen(true);
  };

  const handleVehicleSubmit = async (e) => {
    e.preventDefault();
    const formattedData = {
      ...vehicleForm,
      seats: Number(vehicleForm.seats),
      features: vehicleForm.features.split(',').map(f => f.trim()).filter(Boolean)
    };

    try {
      let res;
      if (editingVehicle) {
        res = await authFetch(`/api/vehicles/${editingVehicle._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formattedData)
        });
      } else {
        res = await authFetch('/api/vehicles', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formattedData)
        });
      }

      if (res.ok) {
        setVehicleModalOpen(false);
        fetchData();
      } else {
        const err = await res.json();
        alert(err.message || 'Error saving vehicle');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteVehicle = async (id) => {
    if (!window.confirm('Delete this vehicle from the fleet? This cannot be undone.')) return;
    try {
      const res = await authFetch(`/api/vehicles/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setVehicles(prev => prev.filter(v => v._id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Gallery Actions
  const handleGallerySubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await authFetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(galleryForm)
      });
      if (res.ok) {
        setGalleryForm({ url: '', title: '', category: 'sightseeing', location: '' });
        fetchData();
      } else {
        const err = await res.json();
        alert(err.message || 'Error adding image');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteGalleryItem = async (id) => {
    if (!window.confirm('Delete this gallery photo?')) return;
    try {
      const res = await authFetch(`/api/gallery/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setGallery(prev => prev.filter(g => g._id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const menuItems = [
    { id: 'bookings', label: 'Bookings', icon: <Calendar className="w-4 h-4" /> },
    { id: 'inquiries', label: 'Inquiries', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'packages', label: 'Tour Packages', icon: <Map className="w-4 h-4" /> },
    { id: 'vehicles', label: 'Our Fleet', icon: <Car className="w-4 h-4" /> },
    { id: 'gallery', label: 'Gallery', icon: <Image className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen flex bg-gray-100 text-left">
      {/* Sidebar */}
      <aside className="w-64 bg-charcoal text-white flex flex-col justify-between p-6 shrink-0 shadow-lg">
        <div className="space-y-6">
          <div className="flex items-center gap-2 border-b border-gray-700 pb-4">
            <ShieldAlert className="text-primary w-6 h-6" />
            <h3 className="font-extrabold text-lg tracking-wider">DEURALI ADMIN</h3>
          </div>

          <nav className="space-y-1">
            {menuItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === item.id 
                    ? 'bg-primary text-white shadow-md' 
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="space-y-3 pt-6 border-t border-gray-700">
          <button
            onClick={() => navigate('/')}
            className="w-full flex items-center justify-center gap-2 border border-gray-600 hover:border-white text-gray-300 hover:text-white px-4 py-2.5 rounded-lg text-xs font-bold transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Website
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-red-650 hover:bg-red-700 text-white px-4 py-2.5 rounded-lg text-xs font-bold transition-all shadow-sm"
          >
            <LogOut className="w-4 h-4" /> Log Out
          </button>
        </div>
      </aside>

      {/* Main Panel */}
      <main className="flex-grow p-8 overflow-y-auto">
        {loading ? (
          <div className="h-[60vh] flex items-center justify-center text-primary font-bold text-lg">
            Loading dashboard data...
          </div>
        ) : (
          <div className="space-y-6">
            
            {/* BOOKINGS TAB */}
            {activeTab === 'bookings' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-extrabold text-charcoal-dark">Bookings Log</h2>
                
                <div className="bg-white rounded-xl shadow-sm border border-gray-150 overflow-hidden">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-150 text-gray-500 font-bold uppercase tracking-wider text-xs">
                        <th className="p-4">Customer</th>
                        <th className="p-4">Package / Ride</th>
                        <th className="p-4">Route</th>
                        <th className="p-4">Date &amp; Time</th>
                        <th className="p-4">Vehicle</th>
                        <th className="p-4">Passengers</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {bookings.length === 0 ? (
                        <tr>
                          <td colSpan="8" className="p-8 text-center text-gray-400">No bookings logged yet.</td>
                        </tr>
                      ) : (
                        bookings.map(b => (
                          <tr key={b._id} className="hover:bg-gray-50/50 transition-colors">
                            <td className="p-4">
                              <div className="font-bold text-charcoal-dark">{b.customerName}</div>
                              <div className="text-xs text-gray-400">{b.email} | {b.phone}</div>
                            </td>
                            <td className="p-4 font-medium text-gray-600">{b.packageName}</td>
                            <td className="p-4 text-xs text-gray-500">{b.pickupLocation} → {b.destination}</td>
                            <td className="p-4 text-gray-500">
                              <div>{new Date(b.date).toLocaleDateString()}</div>
                              {b.pickupTime && <div className="text-xs text-gray-400">at {b.pickupTime}</div>}
                            </td>
                            <td className="p-4 text-gray-500 font-medium">{b.vehicleType}</td>
                            <td className="p-4 text-gray-500 text-center">{b.passengers}</td>
                            <td className="p-4">
                              <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
                                b.status === 'confirmed' 
                                  ? 'bg-green-50 border-green-200 text-green-700' 
                                  : b.status === 'cancelled' 
                                  ? 'bg-red-50 border-red-200 text-red-700' 
                                  : 'bg-yellow-50 border-yellow-250 text-yellow-700'
                              }`}>
                                {b.status}
                              </span>
                            </td>
                            <td className="p-4">
                              <div className="flex justify-center gap-1.5">
                                {b.status !== 'confirmed' && (
                                  <button 
                                    className="p-1.5 bg-green-50 hover:bg-green-100 border border-green-200 text-green-700 rounded-lg transition-colors" 
                                    title="Confirm"
                                    onClick={() => updateBookingStatus(b._id, 'confirmed')}
                                  >
                                    <Check className="w-4 h-4" />
                                  </button>
                                )}
                                {b.status !== 'cancelled' && (
                                  <button 
                                    className="p-1.5 bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 rounded-lg transition-colors" 
                                    title="Cancel"
                                    onClick={() => updateBookingStatus(b._id, 'cancelled')}
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                )}
                                <button 
                                  className="p-1.5 bg-gray-50 hover:bg-gray-150 border border-gray-200 text-gray-500 rounded-lg transition-colors" 
                                  title="Delete Record"
                                  onClick={() => deleteBooking(b._id)}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* INQUIRIES TAB */}
            {activeTab === 'inquiries' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-extrabold text-charcoal-dark">Inquiries & Feedback</h2>

                <div className="bg-white rounded-xl shadow-sm border border-gray-150 overflow-hidden">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-150 text-gray-500 font-bold uppercase tracking-wider text-xs">
                        <th className="p-4">From</th>
                        <th className="p-4">Subject</th>
                        <th className="p-4">Message</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {inquiries.length === 0 ? (
                        <tr>
                          <td colSpan="5" className="p-8 text-center text-gray-400">No inquiries received yet.</td>
                        </tr>
                      ) : (
                        inquiries.map(i => (
                          <tr key={i._id} className="hover:bg-gray-50/50 transition-colors">
                            <td className="p-4">
                              <div className="font-bold text-charcoal-dark">{i.name}</div>
                              <div className="text-xs text-gray-450">{i.email} {i.phone ? `| ${i.phone}` : ''}</div>
                            </td>
                            <td className="p-4 font-bold text-gray-700">{i.subject}</td>
                            <td className="p-4 text-gray-500 max-w-xs break-words">{i.message}</td>
                            <td className="p-4">
                              <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
                                i.status === 'replied' 
                                  ? 'bg-green-50 border-green-200 text-green-700' 
                                  : i.status === 'read' 
                                  ? 'bg-gray-100 border-gray-200 text-gray-600' 
                                  : 'bg-yellow-50 border-yellow-250 text-yellow-700'
                              }`}>
                                {i.status}
                              </span>
                            </td>
                            <td className="p-4">
                              <div className="flex justify-center gap-1.5">
                                {i.status === 'unread' && (
                                  <button 
                                    className="p-1.5 bg-green-50 hover:bg-green-100 border border-green-200 text-green-700 rounded-lg transition-colors" 
                                    title="Mark Read"
                                    onClick={() => updateInquiryStatus(i._id, 'read')}
                                  >
                                    <Check className="w-4 h-4" />
                                  </button>
                                )}
                                {i.status !== 'replied' && (
                                  <button 
                                    className="p-1.5 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 rounded-lg transition-colors" 
                                    title="Mark Replied"
                                    onClick={() => updateInquiryStatus(i._id, 'replied')}
                                  >
                                    <MessageSquare className="w-4 h-4" />
                                  </button>
                                )}
                                <button 
                                  className="p-1.5 bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 rounded-lg transition-colors" 
                                  title="Delete inquiry"
                                  onClick={() => deleteInquiry(i._id)}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* PACKAGES TAB */}
            {activeTab === 'packages' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-extrabold text-charcoal-dark">Manage Tour Packages</h2>
                  <button 
                    onClick={() => openPkgModal()}
                    className="bg-primary hover:bg-primary-dark text-white px-4 py-2.5 rounded-lg text-sm font-bold shadow-md transition-colors flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" /> Add New Package
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {packages.map(p => (
                    <div className="bg-white border border-gray-150 rounded-xl overflow-hidden shadow-sm flex flex-col justify-between" key={p._id}>
                      <div className="relative h-44 bg-gray-100">
                        <img className="w-full h-full object-cover" src={p.image} alt={p.name} />
                        <span className="absolute top-3 right-3 bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">{p.difficulty}</span>
                        <span className="absolute bottom-3 left-3 bg-charcoal-dark/90 text-white text-xs font-bold px-2 py-1 rounded">Rs. {p.price}</span>
                      </div>
                      <div className="p-4 flex-grow flex flex-col justify-between space-y-4">
                        <div>
                          <div className="flex gap-3 text-xs text-gray-400 mb-1.5">
                            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {p.location}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {p.duration} Days</span>
                          </div>
                          <h4 className="font-bold text-charcoal-dark text-base">{p.name}</h4>
                          <p className="text-gray-500 text-xs line-clamp-2 mt-1">{p.shortDescription}</p>
                        </div>
                        
                        <div className="flex justify-end gap-2 border-t pt-3">
                          <button 
                            onClick={() => openPkgModal(p)}
                            className="p-1.5 bg-gray-50 hover:bg-gray-150 border rounded-lg text-gray-500 transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => deletePackage(p._id)}
                            className="p-1.5 bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* VEHICLES TAB */}
            {activeTab === 'vehicles' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-extrabold text-charcoal-dark">Manage Fleet</h2>
                  <button 
                    onClick={() => openVehicleModal()}
                    className="bg-primary hover:bg-primary-dark text-white px-4 py-2.5 rounded-lg text-sm font-bold shadow-md transition-colors flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" /> Add New Vehicle
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {vehicles.map(v => (
                    <div className="bg-white border border-gray-150 rounded-xl overflow-hidden shadow-sm flex flex-col justify-between" key={v._id}>
                      <div className="relative h-44 bg-gray-100">
                        <img className="w-full h-full object-cover" src={v.image} alt={v.name} />
                        <span className="absolute top-3 right-3 bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">{v.type}</span>
                      </div>
                      <div className="p-4 flex-grow flex flex-col justify-between space-y-4">
                        <div>
                          <div className="flex gap-3 text-xs text-gray-400 mb-1.5">
                            <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {v.seats} Seats</span>
                            <span>•</span>
                            <span className="flex items-center gap-1"><Luggage className="w-3.5 h-3.5" /> {v.luggage}</span>
                          </div>
                          <h4 className="font-bold text-charcoal-dark text-base">{v.name}</h4>
                          <p className="text-gray-500 text-xs mt-1">
                            {v.driverIncluded ? 'Driver Included' : 'Self-Drive'} · {v.ac ? 'A/C' : 'No A/C'}
                          </p>
                        </div>
                        
                        <div className="flex justify-end gap-2 border-t pt-3">
                          <button 
                            onClick={() => openVehicleModal(v)}
                            className="p-1.5 bg-gray-50 hover:bg-gray-150 border rounded-lg text-gray-500 transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => deleteVehicle(v._id)}
                            className="p-1.5 bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* GALLERY TAB */}
            {activeTab === 'gallery' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-extrabold text-charcoal-dark">Manage Gallery</h2>
                
                {/* Upload Form Box */}
                <div className="bg-white border border-gray-150 rounded-xl p-6 shadow-sm max-w-3xl">
                  <h3 className="font-bold text-charcoal-dark text-base mb-4 border-b pb-2 uppercase tracking-wider">Add Image to Portfolio</h3>
                  <form onSubmit={handleGallerySubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Photo URL</label>
                        <input 
                          type="url" 
                          placeholder="https://unsplash.com/..." 
                          required
                          value={galleryForm.url}
                          onChange={(e) => setGalleryForm({...galleryForm, url: e.target.value})}
                          className="w-full px-3 py-2 border rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Title / Caption</label>
                        <input 
                          type="text" 
                          placeholder="Sunrise drive to Sarangkot" 
                          required
                          value={galleryForm.title}
                          onChange={(e) => setGalleryForm({...galleryForm, title: e.target.value})}
                          className="w-full px-3 py-2 border rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>
                    </div>

                    <div className="space-y-3 flex flex-col justify-between">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Category</label>
                          <select 
                            value={galleryForm.category}
                            onChange={(e) => setGalleryForm({...galleryForm, category: e.target.value})}
                            className="w-full px-2 py-2 border rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-primary bg-white"
                          >
                            <option value="sightseeing">Sightseeing</option>
                            <option value="culture">Culture</option>
                            <option value="nature">Nature / Landscapes</option>
                            <option value="adventure">Adventure</option>
                            <option value="wildlife">Wildlife</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Location</label>
                          <input 
                            type="text" 
                            placeholder="e.g. Pokhara" 
                            required
                            value={galleryForm.location}
                            onChange={(e) => setGalleryForm({...galleryForm, location: e.target.value})}
                            className="w-full px-3 py-2 border rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                          />
                        </div>
                      </div>
                      <button 
                        type="submit" 
                        className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-2.5 rounded-lg text-xs transition-colors flex justify-center items-center gap-1.5"
                      >
                        <Plus className="w-4 h-4" /> Upload Photo
                      </button>
                    </div>
                  </form>
                </div>

                {/* Gallery List */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {gallery.map(img => (
                    <div key={img._id} className="relative rounded-xl overflow-hidden h-36 bg-gray-150 group shadow-sm">
                      <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-charcoal/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button 
                          onClick={() => deleteGalleryItem(img._id)}
                          className="bg-red-650 hover:bg-red-700 text-white p-2 rounded-full shadow transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PACKAGE CREATE/EDIT FORM MODAL */}
            {pkgModalOpen && (
              <div className="fixed inset-0 bg-charcoal-dark/70 z-[9999] flex items-center justify-center p-4">
                <div className="bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-2xl p-6 text-left max-h-[85vh] overflow-y-auto">
                  <h3 className="font-extrabold text-charcoal-dark text-lg border-b pb-2 mb-4">
                    {editingPkg ? 'Edit Tour Package' : 'Create Tour Package'}
                  </h3>
                  
                  <form onSubmit={handlePkgSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Package Name</label>
                      <input 
                        type="text" 
                        required 
                        value={pkgForm.name} 
                        onChange={(e) => setPkgForm({...pkgForm, name: e.target.value})} 
                        className="w-full px-3 py-2 border rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Short Description (for cards)</label>
                      <input 
                        type="text" 
                        required 
                        value={pkgForm.shortDescription} 
                        onChange={(e) => setPkgForm({...pkgForm, shortDescription: e.target.value})} 
                        className="w-full px-3 py-2 border rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Full Description</label>
                      <textarea 
                        required 
                        value={pkgForm.description} 
                        onChange={(e) => setPkgForm({...pkgForm, description: e.target.value})} 
                        className="w-full px-3 py-2 border rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-primary min-h-[80px]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Duration (Days)</label>
                        <input 
                          type="number" 
                          required 
                          value={pkgForm.duration} 
                          onChange={(e) => setPkgForm({...pkgForm, duration: e.target.value})} 
                          className="w-full px-3 py-2 border rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Price (NPR)</label>
                        <input 
                          type="number" 
                          required 
                          value={pkgForm.price} 
                          onChange={(e) => setPkgForm({...pkgForm, price: e.target.value})} 
                          className="w-full px-3 py-2 border rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Location Region</label>
                        <input 
                          type="text" 
                          required 
                          value={pkgForm.location} 
                          onChange={(e) => setPkgForm({...pkgForm, location: e.target.value})} 
                          className="w-full px-3 py-2 border rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Vehicle</label>
                        <select 
                          value={pkgForm.difficulty} 
                          onChange={(e) => setPkgForm({...pkgForm, difficulty: e.target.value})}
                          className="w-full px-2 py-2 border rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-primary bg-white"
                        >
                          <option value="Sedan (Hyundai Creta)">Sedan (Hyundai Creta)</option>
                          <option value="Jeep (Mahindra Scorpio)">Jeep (Mahindra Scorpio)</option>
                          <option value="Both Available">Both Available</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Main Image URL</label>
                      <input 
                        type="url" 
                        required 
                        value={pkgForm.image} 
                        onChange={(e) => setPkgForm({...pkgForm, image: e.target.value})} 
                        className="w-full px-3 py-2 border rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Highlights (comma separated)</label>
                      <input 
                        type="text" 
                        placeholder="Highlight 1, Highlight 2, etc." 
                        required 
                        value={pkgForm.highlights} 
                        onChange={(e) => setPkgForm({...pkgForm, highlights: e.target.value})} 
                        className="w-full px-3 py-2 border rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Max Passengers</label>
                        <input 
                          type="number" 
                          required 
                          value={pkgForm.maxGroupSize} 
                          onChange={(e) => setPkgForm({...pkgForm, maxGroupSize: e.target.value})} 
                          className="w-full px-3 py-2 border rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Best Seasons</label>
                        <input 
                          type="text" 
                          required 
                          value={pkgForm.bestSeason} 
                          onChange={(e) => setPkgForm({...pkgForm, bestSeason: e.target.value})} 
                          className="w-full px-3 py-2 border rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>
                    </div>

                    <div className="flex gap-3 justify-end pt-4 border-t">
                      <button 
                        type="button" 
                        onClick={() => setPkgModalOpen(false)}
                        className="border border-gray-300 hover:border-charcoal text-gray-600 px-4 py-2 rounded-lg text-xs font-bold transition-all"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit" 
                        className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors shadow"
                      >
                        Save Package
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* VEHICLE CREATE/EDIT FORM MODAL */}
            {vehicleModalOpen && (
              <div className="fixed inset-0 bg-charcoal-dark/70 z-[9999] flex items-center justify-center p-4">
                <div className="bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-2xl p-6 text-left max-h-[85vh] overflow-y-auto">
                  <h3 className="font-extrabold text-charcoal-dark text-lg border-b pb-2 mb-4">
                    {editingVehicle ? 'Edit Vehicle' : 'Add New Vehicle'}
                  </h3>
                  
                  <form onSubmit={handleVehicleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Vehicle Name</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Hyundai Creta"
                        required 
                        value={vehicleForm.name} 
                        onChange={(e) => setVehicleForm({...vehicleForm, name: e.target.value})} 
                        className="w-full px-3 py-2 border rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Vehicle Type</label>
                        <select 
                          value={vehicleForm.type} 
                          onChange={(e) => setVehicleForm({...vehicleForm, type: e.target.value})}
                          className="w-full px-2 py-2 border rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-primary bg-white"
                        >
                          <option value="Sedan">Sedan</option>
                          <option value="SUV">SUV</option>
                          <option value="Jeep">Jeep</option>
                          <option value="Hiace">Hiace</option>
                          <option value="Luxury Vehicle">Luxury Vehicle</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Passenger Seats</label>
                        <input 
                          type="number" 
                          min="1"
                          required 
                          value={vehicleForm.seats} 
                          onChange={(e) => setVehicleForm({...vehicleForm, seats: e.target.value})} 
                          className="w-full px-3 py-2 border rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Luggage Capacity</label>
                      <input 
                        type="text" 
                        placeholder="e.g. 3 Large Bags"
                        required 
                        value={vehicleForm.luggage} 
                        onChange={(e) => setVehicleForm({...vehicleForm, luggage: e.target.value})} 
                        className="w-full px-3 py-2 border rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Vehicle Image URL</label>
                      <input 
                        type="url" 
                        required 
                        value={vehicleForm.image} 
                        onChange={(e) => setVehicleForm({...vehicleForm, image: e.target.value})} 
                        className="w-full px-3 py-2 border rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Features (comma separated)</label>
                      <input 
                        type="text" 
                        placeholder="AC, WiFi, Mineral Water, etc." 
                        value={vehicleForm.features} 
                        onChange={(e) => setVehicleForm({...vehicleForm, features: e.target.value})} 
                        className="w-full px-3 py-2 border rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>

                    <div className="flex gap-6 py-2">
                      <label className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={vehicleForm.driverIncluded} 
                          onChange={(e) => setVehicleForm({...vehicleForm, driverIncluded: e.target.checked})} 
                        />
                        Driver Included
                      </label>
                      <label className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={vehicleForm.ac} 
                          onChange={(e) => setVehicleForm({...vehicleForm, ac: e.target.checked})} 
                        />
                        Air Conditioned
                      </label>
                    </div>

                    <div className="flex gap-3 justify-end pt-4 border-t">
                      <button 
                        type="button" 
                        onClick={() => setVehicleModalOpen(false)}
                        className="border border-gray-300 hover:border-charcoal text-gray-600 px-4 py-2 rounded-lg text-xs font-bold transition-all"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit" 
                        className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors shadow"
                      >
                        Save Vehicle
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

          </div>
        )}
      </main>
    </div>
  );
}