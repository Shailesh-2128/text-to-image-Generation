import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const NewChat = () => {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    if (!user) {
      if (localStorage.getItem('guestUsed')) {
        toast.error('You need to login to generate more images.');
        navigate('/login');
        return;
      }
    }

    setError('');
    setLoading(true);
    setImage(null);

    try {
      const response = await axios.post('http://localhost:5000/api/generate-image', {
        prompt
      });
      setImage(response.data.image);
      
      if (!user) {
        localStorage.setItem('guestUsed', 'true');
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!user) {
      toast.error('Please login to save images');
      navigate('/login');
      return;
    }
    try {
      await axios.post('http://localhost:5000/api/save-image', {
        imageUrl: image,
        prompt
      });
      toast.success('Image saved successfully!');
    } catch (err) {
      toast.error('Failed to save image');
    }
  };

  const handleDownload = () => {
    if (!image) return;
    const link = document.createElement('a');
    link.href = image;
    link.download = `generated-image-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container" style={{ margin: '0' }}>
      <header>
        <h1>AI Image Generator</h1>
        <p>Turn your imagination into stunning visuals</p>
      </header>

      <main>
        <form onSubmit={handleGenerate} className="generator-form">
          <input
            type="text"
            placeholder="Describe what you want to see (e.g., 'A futuristic city at sunset in synthwave style')"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={loading}
          />
          <button type="submit" disabled={loading || !prompt.trim()}>
            {loading ? 'Generating...' : 'Generate Image'}
          </button>
        </form>

        {error && <div className="error-message">{error}</div>}

        <div className="result-container">
          {loading && (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Crafting your vision, this might take a moment...</p>
            </div>
          )}

          {image && !loading && (
            <div className="image-display">
              <img src={image} alt={prompt} />
              <div style={{ display: 'flex', gap: '1rem', width: '100%', maxWidth: '300px', flexDirection: 'column' }}>
                <button className="download-btn" onClick={handleDownload} disabled={loading} style={{ maxWidth: '100%' }}>
                  Download Image
                </button>
                {user && (
                  <button className="download-btn" onClick={handleSave} disabled={loading} style={{ maxWidth: '100%', background: 'white', color: '#6366f1', border: '2px solid #6366f1' }}>
                    Save Image
                  </button>
                )}
              </div>
            </div>
          )}

          {!image && !loading && !error && (
            <div className="empty-state">
              Your generated image will appear here
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
