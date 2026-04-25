import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Calendar, Image as ImageIcon } from 'lucide-react';

export const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [name, setName] = useState('');
  const { setUser } = useAuth();
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/profile');
        setProfile(data);
        setName(data.name);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put('http://localhost:5000/api/profile/update', { name });
      toast.success('Profile updated');
      setProfile(data);
      const user = JSON.parse(localStorage.getItem('user'));
      user.name = data.name;
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
    } catch (err) {
      toast.error('Failed to update profile');
    }
  };

  if (!profile) return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem', width: '100%' }}>
      <div className="spinner"></div>
    </div>
  );

  return (
    <div style={{ margin: '0 auto', display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '800px' }}>
      <header className="page-header">
        <h2>Your Profile</h2>
        <p>Manage your account details and view statistics</p>
      </header>

      <div className="profile-stats">
        <div className="stat-box">
          <span className="stat-label"><Mail size={16} style={{display:'inline', verticalAlign:'text-bottom', marginRight:'5px'}}/> Email</span>
          <span className="stat-value" style={{fontSize: '1.2rem', wordBreak: 'break-all'}}>{profile.email}</span>
        </div>
        <div className="stat-box">
          <span className="stat-label"><ImageIcon size={16} style={{display:'inline', verticalAlign:'text-bottom', marginRight:'5px'}}/> Generated</span>
          <span className="stat-value">{profile.totalImages}</span>
        </div>
        <div className="stat-box">
          <span className="stat-label"><Calendar size={16} style={{display:'inline', verticalAlign:'text-bottom', marginRight:'5px'}}/> Member Since</span>
          <span className="stat-value" style={{fontSize: '1.1rem'}}>{new Date(profile.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
      </div>

      <div className="panel-card">
        <h3 className="panel-title"><User size={20} /> Personal Information</h3>
        <form onSubmit={handleUpdate} style={{ maxWidth: '400px', marginTop: '1.5rem' }}>
          <div className="form-group">
            <label>Full Name</label>
            <input 
              type="text" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              required 
              style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '10px', border: '1px solid #cbd5e1', background: 'rgba(255,255,255,0.8)', fontSize: '1rem', outline: 'none' }}
              onFocus={e => { e.target.style.borderColor = '#8b5cf6'; e.target.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.15)'; }}
              onBlur={e => { e.target.style.borderColor = '#cbd5e1'; e.target.style.boxShadow = 'none'; }}
            />
          </div>
          <button type="submit" style={{ padding: '0.85rem 1.5rem', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: 'white', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', transition: 'all 0.2s', marginTop: '0.5rem' }}>
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};
