import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { MessageSquare, LogOut, Menu, X } from 'lucide-react';
import { Button } from '../ui/Button';
import aurygenLogo from '../../assets/logo.png';
import './DashboardLayout.css';

const DashboardLayout = ({ children, currentPage = 'messages' }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const navigationItems = [
    {
      id: 'messages',
      label: 'Messages',
      icon: MessageSquare,
      path: '/dashboard/messages'
    }
  ];

  return (
    <div className="dashboard-layout starry-bg">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="sidebar-overlay"
          onClick={closeSidebar}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <img src={aurygenLogo} alt="Aurygen Logo" className="logo-image" />
            <h2 className="logo-text">Admin Panel</h2>
          </div>
          <button 
            className="sidebar-close-btn"
            onClick={closeSidebar}
          >
            <X size={20} />
          </button>
        </div>
        
        <nav className="sidebar-nav">
          <ul className="nav-list">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <li key={item.id} className="nav-item">
                  <a 
                    href={item.path}
                    className={`nav-link ${isActive ? 'nav-link-active' : ''}`}
                    onClick={closeSidebar}
                  >
                    <Icon size={20} className="nav-icon" />
                    <span className="nav-label">{item.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
        
        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">
              {user?.username?.charAt(0).toUpperCase() || 'A'}
            </div>
            <div className="user-details">
              <span className="user-name">{user?.username || 'Admin'}</span>
              <span className="user-role">Administrator</span>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="logout-btn"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </Button>
        </div>
      </aside>
      
      {/* Main content */}
      <main className="main-content">
        {/* Header */}
        <header className="main-header">
          <div className="header-left">
            <button 
              className="mobile-menu-btn"
              onClick={toggleSidebar}
            >
              <Menu size={24} />
            </button>
            <h1 className="page-title">
              {navigationItems.find(item => item.id === currentPage)?.label || 'Dashboard'}
            </h1>
          </div>
          
          <div className="header-right">
            <div className="header-user">
              <span className="header-username">Welcome, {user?.username || 'Admin'}</span>
            </div>
          </div>
        </header>
        
        {/* Page content */}
        <div className="page-content">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;