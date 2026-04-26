import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { GoogleLogin } from '@react-oauth/google';

export const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error('Passwords do not match');
    }
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/auth/signup', { name, email, password });
      toast.success('Account created! Please log in.');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };
  const { login } = useAuth();

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/google', {
        credential: credentialResponse.credential
      });
      login(res.data.token, res.data.user);
      toast.success('Signed up with Google successfully!');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Google Signup failed');
    }
  };

  return (
    <div className="auth-container">
      <header>
        <h1>Create Account</h1>
        <p>Join us to generate stunning AI images</p>
      </header>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Sign Up'}
        </button>
      </form>
      <div className="auth-divider">
        <span>OR</span>
      </div>
      <div className="google-btn-wrapper">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => toast.error('Google Signup Failed')}
          theme="outline"
          size="large"
          shape="pill"
          text="continue_with"
          width="100%"
        />
      </div>
      <div className="auth-link">
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </div>
  );
};
