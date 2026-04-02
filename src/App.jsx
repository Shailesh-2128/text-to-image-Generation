import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    setError('');
    setLoading(true);
    setImage(null);

    try {
      const response = await axios.post('https://text-to-image-ai-ypsw.onrender.com/api/generate-image', {
        prompt
      });
      setImage(response.data.image);
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
    <>
      {/* Creative Animated Background */}
      <div className="creative-bg">
        <div className="bg-shape shape-1"></div>
        <div className="bg-shape shape-2"></div>
        <div className="bg-shape shape-3"></div>
        <div className="bg-shape shape-4"></div>
        <div className="bg-shape shape-5"></div>
        <div className="bg-shape shape-6"></div>
      </div>

      <div className="container">
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
                <button className="download-btn" onClick={handleDownload} disabled={loading}>
                  Download Image
                </button>
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
    </>
  );
}

export default App;
