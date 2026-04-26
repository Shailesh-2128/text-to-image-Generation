import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { GoogleLogin } from '@react-oauth/google';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('https://text-to-image-ai-ypsw.onrender.com/api/auth/login', { email, password });
      login(res.data.token, res.data.user);
      toast.success('Logged in successfully!');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post('https://text-to-image-ai-ypsw.onrender.com/api/auth/google', {
        credential: credentialResponse.credential
      });
      login(res.data.token, res.data.user);
      toast.success('Logged in with Google successfully!');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Google Login failed');
    }
  };

  return (
    <div className="auth-container">
      <header>
        <h1>Welcome Back</h1>
        <p>Login to your account to continue</p>
      </header>
      <form onSubmit={handleSubmit} className="auth-form">
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
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <div className="auth-divider">
        <span>OR</span>
      </div>
      <div className="google-btn-wrapper">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => toast.error('Google Login Failed')}
          theme="outline"
          size="large"
          shape="pill"
          text="continue_with"
          width="100%"
        />
      </div>
      <div className="auth-link">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </div>
    </div>
  );
};
