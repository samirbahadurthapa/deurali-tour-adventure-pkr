import React, { useState, useEffect } from 'react';
import { 
  Calendar, MessageSquare, Map, Image, Plus, Trash2, Check, X, Edit, Eye, 
  MapPin, Clock, DollarSign, ArrowLeft, ShieldAlert, Car, Users, Luggage
} from 'lucide-react';
import { authFetch, clearAdminToken } from '../utils/api.js';

const AdminDashboard = ({ setAdminMode }) => {
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
      // Dummy itinerary for newly created package
      itinerary: [
        { day: 1, title: 'Pickup & Departure', description: 'Pickup from your hotel in Kathmandu/Pokhara, brief on the route, and departure with your driver.' },
        { day: 2, title: 'Sightseeing & Return', description: 'Continue the tour with scenic stops and sightseeing, then return to your hotel.' }
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

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0 20px 24px 20px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <ShieldAlert style={{ color: 'var(--secondary)' }} />
          <h3 style={{ fontSize: '1.25rem', color: '#FFF' }}>Portal Admin</h3>
        </div>

        <button 
          className={`admin-sidebar-btn ${activeTab === 'bookings' ? 'active' : ''}`}
          onClick={() => setActiveTab('bookings')}
        >
          <Calendar size={18} /> Bookings
        </button>

        <button 
          className={`admin-sidebar-btn ${activeTab === 'inquiries' ? 'active' : ''}`}
          onClick={() => setActiveTab('inquiries')}
        >
          <MessageSquare size={18} /> Inquiries
        </button>

        <button 
          className={`admin-sidebar-btn ${activeTab === 'packages' ? 'active' : ''}`}
          onClick={() => setActiveTab('packages')}
        >
          <Map size={18} /> Tour Packages
        </button>

        <button 
          className={`admin-sidebar-btn ${activeTab === 'vehicles' ? 'active' : ''}`}
          onClick={() => setActiveTab('vehicles')}
        >
          <Car size={18} /> Our Fleet
        </button>

        <button 
          className={`admin-sidebar-btn ${activeTab === 'gallery' ? 'active' : ''}`}
          onClick={() => setActiveTab('gallery')}
        >
          <Image size={18} /> Gallery
        </button>

        <div style={{ marginTop: 'auto', padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button 
            className="btn btn-secondary" 
            style={{ width: '100%', fontSize: '0.9rem', padding: '10px 0' }}
            onClick={() => { clearAdminToken(); window.location.reload(); }}
          >
            Log Out
          </button>
          <button 
            className="btn btn-outline-white" 
            style={{ width: '100%', fontSize: '0.9rem', padding: '10px 0' }}
            onClick={() => setAdminMode(false)}
          >
            <ArrowLeft size={16} /> Back to Site
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-content">
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <span style={{ fontSize: '1.2rem', color: 'var(--primary)' }}>Loading dashboard details...</span>
          </div>
        ) : (
          <>
            {/* BOOKINGS TAB */}
            {activeTab === 'bookings' && (
              <div>
                <h2 style={{ fontSize: '2rem', marginBottom: '24px', color: 'var(--primary-dark)' }}>Bookings Log</h2>
                <div className="admin-table-container">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Customer</th>
                        <th>Package / Ride</th>
                        <th>Pickup → Destination</th>
                        <th>Date &amp; Time</th>
                        <th>Vehicle</th>
                        <th>Passengers</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.length === 0 ? (
                        <tr><td colSpan="8" style={{ textAlign: 'center', padding: '24px' }}>No bookings logged.</td></tr>
                      ) : (
                        bookings.map(b => (
                          <tr key={b._id}>
                            <td>
                              <strong>{b.customerName}</strong>
                              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{b.email} | {b.phone}</div>
                            </td>
                            <td>{b.packageName}</td>
                            <td style={{ fontSize: '0.85rem' }}>{b.pickupLocation} → {b.destination}</td>
                            <td>{new Date(b.date).toLocaleDateString()}{b.pickupTime ? ` at ${b.pickupTime}` : ''}</td>
                            <td>{b.vehicleType}</td>
                            <td>{b.passengers}</td>
                            <td>
                              <span className={`status-badge status-${b.status}`}>{b.status}</span>
                            </td>
                            <td>
                              <div className="action-btn-group">
                                {b.status !== 'confirmed' && (
                                  <button 
                                    className="icon-btn icon-btn-confirm" 
                                    title="Confirm"
                                    onClick={() => updateBookingStatus(b._id, 'confirmed')}
                                  >
                                    <Check size={16} />
                                  </button>
                                )}
                                {b.status !== 'cancelled' && (
                                  <button 
                                    className="icon-btn icon-btn-delete" 
                                    title="Cancel"
                                    onClick={() => updateBookingStatus(b._id, 'cancelled')}
                                  >
                                    <X size={16} />
                                  </button>
                                )}
                                <button 
                                  className="icon-btn" 
                                  style={{ backgroundColor: '#E2E8F0', color: '#475569' }}
                                  title="Delete Record"
                                  onClick={() => deleteBooking(b._id)}
                                >
                                  <Trash2 size={14} />
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
              <div>
                <h2 style={{ fontSize: '2rem', marginBottom: '24px', color: 'var(--primary-dark)' }}>Inquiries & Feedback</h2>
                <div className="admin-table-container">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>From</th>
                        <th>Subject</th>
                        <th>Message</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inquiries.length === 0 ? (
                        <tr><td colSpan="5" style={{ textAlign: 'center', padding: '24px' }}>No inquiries received yet.</td></tr>
                      ) : (
                        inquiries.map(i => (
                          <tr key={i._id}>
                            <td>
                              <strong>{i.name}</strong>
                              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{i.email} {i.phone ? `| ${i.phone}` : ''}</div>
                            </td>
                            <td style={{ fontWeight: 600 }}>{i.subject}</td>
                            <td style={{ maxWidth: '300px', fontSize: '0.9rem' }}>{i.message}</td>
                            <td>
                              <span className={`status-badge status-${i.status}`}>{i.status}</span>
                            </td>
                            <td>
                              <div className="action-btn-group">
                                {i.status === 'unread' && (
                                  <button 
                                    className="icon-btn icon-btn-confirm" 
                                    title="Mark Read"
                                    onClick={() => updateInquiryStatus(i._id, 'read')}
                                  >
                                    <Check size={16} />
                                  </button>
                                )}
                                {i.status !== 'replied' && (
                                  <button 
                                    className="icon-btn icon-btn-edit" 
                                    title="Mark Replied"
                                    onClick={() => updateInquiryStatus(i._id, 'replied')}
                                  >
                                    <MessageSquare size={14} />
                                  </button>
                                )}
                                <button 
                                  className="icon-btn icon-btn-delete" 
                                  title="Delete inquiry"
                                  onClick={() => deleteInquiry(i._id)}
                                >
                                  <Trash2 size={14} />
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
              <div>
                <div className="admin-card-header">
                  <h2 style={{ fontSize: '2rem', color: 'var(--primary-dark)' }}>Manage Packages</h2>
                  <button className="btn btn-primary" onClick={() => openPkgModal()}>
                    <Plus size={18} /> Add New Package
                  </button>
                </div>

                <div className="grid-3">
                  {packages.map(p => (
                    <div className="package-card" key={p._id}>
                      <div className="package-img-wrapper" style={{ height: '160px' }}>
                        <img className="package-img" src={p.image} alt={p.name} />
                        <span className="package-badge">{p.difficulty}</span>
                        <span className="package-price-badge">Rs. {p.price}</span>
                      </div>
                      <div className="package-content" style={{ padding: '16px' }}>
                        <div style={{ display: 'flex', gap: '12px', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={12} /> {p.location}</span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={12} /> {p.duration} Days</span>
                        </div>
                        <h4 style={{ fontSize: '1.25rem', marginBottom: '8px', color: 'var(--primary-dark)' }}>{p.name}</h4>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px', flexGrow: 1 }}>{p.shortDescription}</p>
                        
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '12px' }}>
                          <button className="icon-btn icon-btn-edit" onClick={() => openPkgModal(p)}>
                            <Edit size={14} />
                          </button>
                          <button className="icon-btn icon-btn-delete" onClick={() => deletePackage(p._id)}>
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* VEHICLES (FLEET) TAB */}
            {activeTab === 'vehicles' && (
              <div>
                <div className="admin-card-header">
                  <h2 style={{ fontSize: '2rem', color: 'var(--primary-dark)' }}>Manage Fleet</h2>
                  <button className="btn btn-primary" onClick={() => openVehicleModal()}>
                    <Plus size={18} /> Add New Vehicle
                  </button>
                </div>

                <div className="grid-3">
                  {vehicles.map(v => (
                    <div className="package-card" key={v._id}>
                      <div className="package-img-wrapper" style={{ height: '160px' }}>
                        <img className="package-img" src={v.image} alt={v.name} />
                        <span className="package-badge">{v.type}</span>
                      </div>
                      <div className="package-content" style={{ padding: '16px' }}>
                        <div style={{ display: 'flex', gap: '12px', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Users size={12} /> {v.seats} Seats</span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Luggage size={12} /> {v.luggage}</span>
                        </div>
                        <h4 style={{ fontSize: '1.25rem', marginBottom: '8px', color: 'var(--primary-dark)' }}>{v.name}</h4>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '16px', flexGrow: 1 }}>
                          {v.driverIncluded ? 'Driver Included' : 'Self-Drive'} · {v.ac ? 'A/C' : 'No A/C'}
                        </p>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '12px' }}>
                          <button className="icon-btn icon-btn-edit" onClick={() => openVehicleModal(v)}>
                            <Edit size={14} />
                          </button>
                          <button className="icon-btn icon-btn-delete" onClick={() => deleteVehicle(v._id)}>
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {vehicles.length === 0 && (
                  <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '40px' }}>No vehicles in the fleet yet. Add your first one above.</p>
                )}
              </div>
            )}

            {/* GALLERY TAB */}
            {activeTab === 'gallery' && (
              <div>
                <h2 style={{ fontSize: '2rem', marginBottom: '24px', color: 'var(--primary-dark)' }}>Manage Gallery</h2>
                
                {/* Add Photo Form */}
                <div className="booking-form-box" style={{ marginBottom: '32px', maxWidth: '800px' }}>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', color: 'var(--primary-dark)' }}>Add Image to Portfolio</h3>
                  <form onSubmit={handleGallerySubmit} className="form-group-row">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">Photo URL</label>
                        <input 
                          type="url" 
                          className="form-control" 
                          placeholder="https://unsplash.com/..." 
                          required
                          value={galleryForm.url}
                          onChange={(e) => setGalleryForm({...galleryForm, url: e.target.value})}
                        />
                      </div>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">Title / Caption</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          placeholder="e.g. Sunrise Drive to Sarangkot" 
                          required
                          value={galleryForm.title}
                          onChange={(e) => setGalleryForm({...galleryForm, title: e.target.value})}
                        />
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">Category</label>
                        <select 
                          className="form-control"
                          value={galleryForm.category}
                          onChange={(e) => setGalleryForm({...galleryForm, category: e.target.value})}
                        >
                          <option value="sightseeing">Sightseeing</option>
                          <option value="culture">Culture</option>
                          <option value="nature">Nature / Landscapes</option>
                          <option value="adventure">Adventure / Mountain Roads</option>
                          <option value="wildlife">Wildlife</option>
                        </select>
                      </div>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">Location</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          placeholder="e.g. Pokhara" 
                          required
                          value={galleryForm.location}
                          onChange={(e) => setGalleryForm({...galleryForm, location: e.target.value})}
                        />
                      </div>
                      <button type="submit" className="btn btn-primary" style={{ marginTop: 'auto', padding: '12px 0' }}>
                        <Plus size={16} /> Upload Photo
                      </button>
                    </div>
                  </form>
                </div>

                {/* Gallery List */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
                  {gallery.map(img => (
                    <div key={img._id} style={{ position: 'relative', borderRadius: 'var(--radius-sm)', overflow: 'hidden', height: '150px', boxShadow: 'var(--shadow-sm)' }}>
                      <img src={img.url} alt={img.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', opacity: 0, transition: '0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onMouseEnter={(e) => e.currentTarget.style.opacity = 1} onMouseLeave={(e) => e.currentTarget.style.opacity = 0}>
                        <button 
                          onClick={() => deleteGalleryItem(img._id)}
                          style={{ background: 'var(--accent-orange)', color: '#FFF', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center', cursor: 'pointer' }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PACKAGE CREATE/EDIT FORM MODAL */}
            {pkgModalOpen && (
              <div className="admin-modal">
                <div className="admin-modal-box">
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', color: 'var(--primary-dark)' }}>
                    {editingPkg ? 'Edit Package' : 'Create Package'}
                  </h3>
                  <form onSubmit={handlePkgSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Package Name</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        required 
                        value={pkgForm.name} 
                        onChange={(e) => setPkgForm({...pkgForm, name: e.target.value})} 
                      />
                    </div>

                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Short Description (for cards)</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        required 
                        value={pkgForm.shortDescription} 
                        onChange={(e) => setPkgForm({...pkgForm, shortDescription: e.target.value})} 
                      />
                    </div>

                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Full Description</label>
                      <textarea 
                        className="form-control" 
                        required 
                        value={pkgForm.description} 
                        onChange={(e) => setPkgForm({...pkgForm, description: e.target.value})} 
                      />
                    </div>

                    <div className="form-group-row">
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">Duration (Days)</label>
                        <input 
                          type="number" 
                          className="form-control" 
                          required 
                          value={pkgForm.duration} 
                          onChange={(e) => setPkgForm({...pkgForm, duration: e.target.value})} 
                        />
                      </div>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">Price (NPR)</label>
                        <input 
                          type="number" 
                          className="form-control" 
                          required 
                          value={pkgForm.price} 
                          onChange={(e) => setPkgForm({...pkgForm, price: e.target.value})} 
                        />
                      </div>
                    </div>

                    <div className="form-group-row">
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">Location Region</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          required 
                          value={pkgForm.location} 
                          onChange={(e) => setPkgForm({...pkgForm, location: e.target.value})} 
                        />
                      </div>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">Vehicle</label>
                        <select 
                          className="form-control" 
                          value={pkgForm.difficulty} 
                          onChange={(e) => setPkgForm({...pkgForm, difficulty: e.target.value})}
                        >
                          <option value="Sedan (Hyundai Creta)">Sedan (Hyundai Creta)</option>
                          <option value="Jeep (Mahindra Scorpio)">Jeep (Mahindra Scorpio)</option>
                          <option value="Both Available">Both Available</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Main Image URL</label>
                      <input 
                        type="url" 
                        className="form-control" 
                        required 
                        value={pkgForm.image} 
                        onChange={(e) => setPkgForm({...pkgForm, image: e.target.value})} 
                      />
                    </div>

                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Highlights (comma separated)</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Highlight 1, Highlight 2, etc." 
                        required 
                        value={pkgForm.highlights} 
                        onChange={(e) => setPkgForm({...pkgForm, highlights: e.target.value})} 
                      />
                    </div>

                    <div className="form-group-row">
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">Max Passengers</label>
                        <input 
                          type="number" 
                          className="form-control" 
                          required 
                          value={pkgForm.maxGroupSize} 
                          onChange={(e) => setPkgForm({...pkgForm, maxGroupSize: e.target.value})} 
                        />
                      </div>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">Best Seasons</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          required 
                          value={pkgForm.bestSeason} 
                          onChange={(e) => setPkgForm({...pkgForm, bestSeason: e.target.value})} 
                        />
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '16px' }}>
                      <button type="button" className="btn btn-secondary" onClick={() => setPkgModalOpen(false)}>Cancel</button>
                      <button type="submit" className="btn btn-primary">Save Package</button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* VEHICLE CREATE/EDIT FORM MODAL */}
            {vehicleModalOpen && (
              <div className="admin-modal">
                <div className="admin-modal-box">
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', color: 'var(--primary-dark)' }}>
                    {editingVehicle ? 'Edit Vehicle' : 'Add New Vehicle'}
                  </h3>
                  <form onSubmit={handleVehicleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Vehicle Name</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="e.g. Hyundai Creta"
                        required 
                        value={vehicleForm.name} 
                        onChange={(e) => setVehicleForm({...vehicleForm, name: e.target.value})} 
                      />
                    </div>

                    <div className="form-group-row">
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">Vehicle Type</label>
                        <select 
                          className="form-control" 
                          value={vehicleForm.type} 
                          onChange={(e) => setVehicleForm({...vehicleForm, type: e.target.value})}
                        >
                          <option value="Sedan">Sedan</option>
                          <option value="SUV">SUV</option>
                          <option value="Jeep">Jeep</option>
                          <option value="Hiace">Hiace</option>
                          <option value="Luxury Vehicle">Luxury Vehicle</option>
                        </select>
                      </div>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">Passenger Seats</label>
                        <input 
                          type="number" 
                          className="form-control" 
                          min="1"
                          required 
                          value={vehicleForm.seats} 
                          onChange={(e) => setVehicleForm({...vehicleForm, seats: e.target.value})} 
                        />
                      </div>
                    </div>

                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Luggage Capacity</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="e.g. 3 Large Bags"
                        required 
                        value={vehicleForm.luggage} 
                        onChange={(e) => setVehicleForm({...vehicleForm, luggage: e.target.value})} 
                      />
                    </div>

                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Vehicle Image URL</label>
                      <input 
                        type="url" 
                        className="form-control" 
                        required 
                        value={vehicleForm.image} 
                        onChange={(e) => setVehicleForm({...vehicleForm, image: e.target.value})} 
                      />
                    </div>

                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Features (comma separated)</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Feature 1, Feature 2, etc." 
                        value={vehicleForm.features} 
                        onChange={(e) => setVehicleForm({...vehicleForm, features: e.target.value})} 
                      />
                    </div>

                    <div className="form-group-row">
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'var(--text-dark)', cursor: 'pointer' }}>
                        <input 
                          type="checkbox" 
                          checked={vehicleForm.driverIncluded} 
                          onChange={(e) => setVehicleForm({...vehicleForm, driverIncluded: e.target.checked})} 
                        />
                        Driver Included
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'var(--text-dark)', cursor: 'pointer' }}>
                        <input 
                          type="checkbox" 
                          checked={vehicleForm.ac} 
                          onChange={(e) => setVehicleForm({...vehicleForm, ac: e.target.checked})} 
                        />
                        Air Conditioned
                      </label>
                    </div>

                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '16px' }}>
                      <button type="button" className="btn btn-secondary" onClick={() => setVehicleModalOpen(false)}>Cancel</button>
                      <button type="submit" className="btn btn-primary">Save Vehicle</button>
                    </div>
                  </form>
                </div>
              </div>
            )}

          </>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;