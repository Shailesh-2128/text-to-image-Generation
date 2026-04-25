import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthLayout } from './components/AuthLayout';
import { DashboardLayout } from './components/DashboardLayout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { NewChat } from './pages/NewChat';
import { ChatHistory } from './pages/ChatHistory';
import { SavedImages } from './pages/SavedImages';
import { Profile } from './pages/Profile';
import { Settings } from './pages/Settings';

function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
      
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<NewChat />} />
        <Route path="/history" element={<ProtectedRoute><ChatHistory /></ProtectedRoute>} />
        <Route path="/saved" element={<ProtectedRoute><SavedImages /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      </Route>
    </Routes>
  );
}

export default App;
