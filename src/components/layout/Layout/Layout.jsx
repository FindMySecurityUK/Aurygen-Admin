import React from 'react';
import './Layout.css';

const Layout = ({ children, className = '' }) => {
  return (
    <div className={`layout ${className}`}>
      <header className="layout-header">
        <div className="container">
          <h1 className="layout-title">Aurygen Admin</h1>
          <nav className="layout-nav">
            {/* Navigation items will go here */}
          </nav>
        </div>
      </header>
      
      <main className="layout-main">
        <div className="container">
          {children}
        </div>
      </main>
      
      <footer className="layout-footer">
        <div className="container">
          <p>&copy; 2024 Aurygen Admin. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;