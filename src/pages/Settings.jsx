import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { Shield, AlertTriangle } from 'lucide-react';

export const Settings = () => {
  const { logout } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:5000/api/change-password', { currentPassword, newPassword });
      toast.success('Password changed successfully');
      setCurrentPassword('');
      setNewPassword('');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to change password');
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        await axios.delete('http://localhost:5000/api/delete-account');
        toast.success('Account deleted');
        logout();
      } catch (err) {
        toast.error('Failed to delete account');
      }
    }
  };

  return (
    <div style={{ margin: '0 auto', display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '800px' }}>
      <header className="page-header">
        <h2>Settings</h2>
        <p>Configure security preferences and account actions</p>
      </header>
      
      <div className="panel-card">
        <h3 className="panel-title"><Shield size={20} /> Change Password</h3>
        <form onSubmit={handleChangePassword} style={{ maxWidth: '400px', marginTop: '1.5rem' }}>
          <div className="form-group">
            <label>Current Password</label>
            <input 
              type="password" 
              value={currentPassword} 
              onChange={e => setCurrentPassword(e.target.value)} 
              required 
              style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '10px', border: '1px solid #cbd5e1', background: 'rgba(255,255,255,0.8)', fontSize: '1rem', outline: 'none' }}
              onFocus={e => { e.target.style.borderColor = '#8b5cf6'; e.target.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.15)'; }}
              onBlur={e => { e.target.style.borderColor = '#cbd5e1'; e.target.style.boxShadow = 'none'; }}
            />
          </div>
          <div className="form-group">
            <label>New Password</label>
            <input 
              type="password" 
              value={newPassword} 
              onChange={e => setNewPassword(e.target.value)} 
              required 
              style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '10px', border: '1px solid #cbd5e1', background: 'rgba(255,255,255,0.8)', fontSize: '1rem', outline: 'none' }}
              onFocus={e => { e.target.style.borderColor = '#8b5cf6'; e.target.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.15)'; }}
              onBlur={e => { e.target.style.borderColor = '#cbd5e1'; e.target.style.boxShadow = 'none'; }}
            />
          </div>
          <button type="submit" style={{ padding: '0.85rem 1.5rem', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: 'white', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', transition: 'all 0.2s', marginTop: '0.5rem' }}>
            Update Password
          </button>
        </form>
      </div>

      <div className="danger-zone">
        <h3 className="panel-title"><AlertTriangle size={20} /> Danger Zone</h3>
        <p style={{ color: '#7f1d1d', marginBottom: '1.5rem', fontSize: '0.95rem' }}>These actions are highly destructive and cannot be completely undone. Please proceed with caution.</p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button onClick={handleDeleteAccount} className="btn-danger" style={{ padding: '0.85rem 1.5rem', borderRadius: '10px', border: 'none', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'all 0.2s' }}>
            <AlertTriangle size={18} /> Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};
