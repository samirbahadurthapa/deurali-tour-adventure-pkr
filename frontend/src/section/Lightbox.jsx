import React from 'react';

function LightboxModal({ image, onClose }) {
  if (!image) return null;

  return (
    <div className="lightbox-modal" onClick={onClose}>
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <span className="lightbox-close" onClick={onClose}>&times;</span>
        <img className="lightbox-img" src={image.url} alt={image.title} />
        <div style={{ color: '#FFF', marginTop: '12px', textAlign: 'center' }}>
          <h4 style={{ fontFamily: 'var(--font-header)', fontSize: '1.25rem' }}>{image.title}</h4>
          <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}>{image.location}</span>
        </div>
      </div>
    </div>
  );
}

export default LightboxModal;
