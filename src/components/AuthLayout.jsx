import React from 'react';
import { Outlet } from 'react-router-dom';

export const AuthLayout = () => {
  return (
    <div className="auth-wrapper">
      <div className="creative-bg">
        <div className="bg-shape shape-1"></div>
        <div className="bg-shape shape-2"></div>
        <div className="bg-shape shape-4"></div>
      </div>
      <Outlet />
    </div>
  );
};
