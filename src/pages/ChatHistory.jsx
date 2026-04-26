import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const ChatHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const { data } = await axios.get('https://text-to-image-ai-ypsw.onrender.com/api/chat-history');
        setHistory(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  if (loading) return <div className="container">Loading chat history...</div>;

  return (
    <div style={{ margin: '0', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <header style={{ textAlign: 'left', marginBottom: '1rem' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: '800', background: 'linear-gradient(to right, #2563eb, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Generation History
        </h2>
        <p style={{ color: '#64748b', fontSize: '1.1rem' }}>Review all your previous brilliant AI creations</p>
      </header>

      {history.length === 0 ? (
        <div className="empty-state" style={{ background: 'rgba(255,255,255,0.5)', padding: '3rem', borderRadius: '20px', textAlign: 'center' }}>
          <p>No chat history available. Start generating to see your ideas here!</p>
        </div>
      ) : (
        <div className="showcase-container">
          {history.map(item => (
            <div key={item._id} className="showcase-card">
              <img src={item.imageUrl} alt="Generated" className="showcase-image" loading="lazy" />
              <div className="showcase-overlay">
                <span className="showcase-date">
                  {new Date(item.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
                <p className="showcase-prompt">"{item.prompt}"</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
