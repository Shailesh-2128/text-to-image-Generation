import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { PlusCircle, History, Image as ImageIcon, User, Settings, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const DashboardLayout = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const closeSidebar = () => setIsSidebarOpen(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="dashboard-layout">
      {/* Mobile Toggle Button */}
      <button className="mobile-toggle-btn" onClick={toggleSidebar}>
        <Menu size={24} />
      </button>

      {/* Overlay for mobile */}
      {isSidebarOpen && <div className="sidebar-overlay" onClick={closeSidebar}></div>}

      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div style={{ textAlign: 'left' }}>
            <h2 style={{ marginBottom: '0.2rem', fontSize: '1.5rem', fontWeight: '800', background: 'linear-gradient(to right, #2563eb, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>AI ImgGen</h2>
            {user && <p style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '700' }}>Welcome, {user.name.split(' ')[0]}</p>}
          </div>
          <button className="close-sidebar-btn" onClick={closeSidebar}>
             <X size={24} />
          </button>
        </div>
        <nav className="sidebar-nav">
          <NavLink to="/" onClick={closeSidebar} className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`} end>
            <PlusCircle size={20} />
            <span>New Chat</span>
          </NavLink>
          <NavLink to="/history" onClick={closeSidebar} className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <History size={20} />
            <span>Chat History</span>
          </NavLink>
          <NavLink to="/saved" onClick={closeSidebar} className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <ImageIcon size={20} />
            <span>Saved Images</span>
          </NavLink>
          <NavLink to="/profile" onClick={closeSidebar} className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <User size={20} />
            <span>Profile</span>
          </NavLink>
          <NavLink to="/settings" onClick={closeSidebar} className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <Settings size={20} />
            <span>Settings</span>
          </NavLink>
        </nav>
        
        <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid rgba(0,0,0,0.1)' }}>
          {user ? (
            <button className="sidebar-link" onClick={() => { logout(); closeSidebar(); }} style={{ width: '100%', background: 'transparent', border: 'none', textAlign: 'left', cursor: 'pointer', color: '#ef4444' }}>
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          ) : (
            <button className="sidebar-link" onClick={() => { navigate('/login'); closeSidebar(); }} style={{ width: '100%', background: 'transparent', border: 'none', textAlign: 'left', cursor: 'pointer', color: '#3b82f6' }}>
              <User size={20} />
              <span>Login</span>
            </button>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        <div className="container" style={{ margin: '0 auto', maxWidth: '900px', width: '100%' }}>
          <Outlet />
        </div>
      </main>
      
      {/* Background Shapes */}
      <div className="creative-bg">
        <div className="bg-shape shape-1"></div>
        <div className="bg-shape shape-2"></div>
        <div className="bg-shape shape-3"></div>
      </div>
    </div>
  );
};
