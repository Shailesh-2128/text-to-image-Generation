import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Download } from 'lucide-react';

export const SavedImages = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const { data } = await axios.get('https://text-to-image-ai-ypsw.onrender.com/api/saved-images');
        setImages(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  const handleDownload = (imageUrl, promptId) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `art-${promptId}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) return (
    <div className="container" style={{ margin: '0', display: 'flex', justifyContent: 'center', padding: '4rem' }}>
      <div className="spinner"></div>
    </div>
  );

  return (
    <div style={{ margin: '0', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <header style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: '800', background: 'linear-gradient(to right, #6366f1, #d946ef)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Personal Gallery
        </h2>
        <p style={{ color: '#64748b', fontSize: '1.1rem' }}>Your curated collection of saved visual masterpieces</p>
      </header>

      {images.length === 0 ? (
        <div className="empty-state" style={{ background: 'rgba(255,255,255,0.5)', padding: '4rem', borderRadius: '24px', textAlign: 'center' }}>
          <p style={{ fontSize: '1.2rem', color: '#475569' }}>Your gallery is empty. Save images from the generator to add them here!</p>
        </div>
      ) : (
        <div className="masonry-gallery">
          {images.map(img => (
            <div key={img._id} className="masonry-item">
              <img src={img.imageUrl} alt={img.prompt} loading="lazy" />
              <div className="masonry-content">
                <p className="masonry-prompt">"{img.prompt}"</p>
                <div className="masonry-actions">
                  <span className="masonry-date">{new Date(img.createdAt).toLocaleDateString()}</span>
                  <button onClick={() => handleDownload(img.imageUrl, img._id)} className="masonry-btn" title="Download">
                    <Download size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
