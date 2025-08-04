import React, { useState, useEffect } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { Eye, Mail, Calendar, DollarSign, Building, User, ExternalLink, X } from 'lucide-react';
import { Button } from '../ui/Button';
import DashboardLayout from './DashboardLayout';
import './MessagesPage.css';

const MessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const messagesRef = collection(db, 'messages');
      const q = query(messagesRef, orderBy('submittedAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const messagesData = [];
      querySnapshot.forEach((doc) => {
        messagesData.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      setMessages(messagesData);
    } catch (err) {
      console.error('Error fetching messages:', err);
      setError('Failed to load messages. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    
    try {
      // Handle Firestore timestamp
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (err) {
      return 'Invalid Date';
    }
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      new: 'status-badge status-new',
      in_progress: 'status-badge status-progress',
      completed: 'status-badge status-completed',
      rejected: 'status-badge status-rejected'
    };
    
    return (
      <span className={statusClasses[status] || 'status-badge status-new'}>
        {status?.replace('_', ' ').toUpperCase() || 'NEW'}
      </span>
    );
  };

  const openMessageDetail = (message) => {
    setSelectedMessage(message);
    setShowModal(true);
  };

  const closeMessageDetail = () => {
    setSelectedMessage(null);
    setShowModal(false);
  };

  const MessageDetailModal = () => {
    if (!selectedMessage) return null;

    return (
      <div className="modal-overlay" onClick={closeMessageDetail}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2 className="modal-title">Message Details</h2>
            <button className="modal-close-btn" onClick={closeMessageDetail}>
              <X size={20} />
            </button>
          </div>
          
          <div className="modal-body">
            <div className="detail-grid">
              <div className="detail-item">
                <div className="detail-label">
                  <User size={16} />
                  <span>Name</span>
                </div>
                <div className="detail-value">{selectedMessage.name || 'N/A'}</div>
              </div>
              
              <div className="detail-item">
                <div className="detail-label">
                  <Mail size={16} />
                  <span>Email</span>
                </div>
                <div className="detail-value">
                  <a href={`mailto:${selectedMessage.email}`} className="email-link">
                    {selectedMessage.email || 'N/A'}
                  </a>
                </div>
              </div>
              
              <div className="detail-item">
                <div className="detail-label">
                  <Building size={16} />
                  <span>Company</span>
                </div>
                <div className="detail-value">{selectedMessage.companyName || 'N/A'}</div>
              </div>
              
              <div className="detail-item">
                <div className="detail-label">
                  <DollarSign size={16} />
                  <span>Budget</span>
                </div>
                <div className="detail-value budget-value">{selectedMessage.budget || 'N/A'}</div>
              </div>
              
              <div className="detail-item">
                <div className="detail-label">
                  <Calendar size={16} />
                  <span>Submitted</span>
                </div>
                <div className="detail-value">{formatDate(selectedMessage.submittedAt)}</div>
              </div>
              
              <div className="detail-item">
                <div className="detail-label">
                  <span>Status</span>
                </div>
                <div className="detail-value">{getStatusBadge(selectedMessage.status)}</div>
              </div>
              
              <div className="detail-item">
                <div className="detail-label">
                  <span>Services</span>
                </div>
                <div className="detail-value service-value">
                  {selectedMessage.services?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'N/A'}
                </div>
              </div>
              
              <div className="detail-item">
                <div className="detail-label">
                  <span>Source</span>
                </div>
                <div className="detail-value">{selectedMessage.source || 'N/A'}</div>
              </div>
              
              <div className="detail-item">
                <div className="detail-label">
                  <span>Heard About</span>
                </div>
                <div className="detail-value">{selectedMessage.hearAbout || 'N/A'}</div>
              </div>
              
              {selectedMessage.website && (
                <div className="detail-item">
                  <div className="detail-label">
                    <ExternalLink size={16} />
                    <span>Website</span>
                  </div>
                  <div className="detail-value">
                    <a 
                      href={selectedMessage.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="website-link"
                    >
                      {selectedMessage.website}
                    </a>
                  </div>
                </div>
              )}
            </div>
            
            {selectedMessage.projectDetails && (
              <div className="project-details">
                <h3 className="project-details-title">Project Details</h3>
                <div className="project-details-content">
                  {selectedMessage.projectDetails}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <DashboardLayout currentPage="messages">
      <div className="messages-page">
        <div className="page-header">
          <div className="page-header-content">
            <h1 className="page-title">Messages</h1>
            <p className="page-subtitle">Manage customer inquiries and project requests</p>
          </div>
          <Button 
            variant="primary" 
            onClick={fetchMessages}
            disabled={loading}
          >
            {loading ? 'Refreshing...' : 'Refresh'}
          </Button>
        </div>

        {error && (
          <div className="error-banner">
            <p>{error}</p>
            <Button variant="outline" size="sm" onClick={fetchMessages}>
              Retry
            </Button>
          </div>
        )}

        <div className="messages-container">
          {loading ? (
            <div className="loading-state">
              <div className="loading-spinner"></div>
              <p>Loading messages...</p>
            </div>
          ) : messages.length === 0 ? (
            <div className="empty-state">
              <Mail size={48} className="empty-icon" />
              <h3>No messages found</h3>
              <p>There are no messages to display at the moment.</p>
            </div>
          ) : (
            <div className="messages-table-container">
              <table className="messages-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Company</th>
                    <th>Budget</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {messages.map((message) => (
                    <tr key={message.id} className="message-row">
                      <td className="name-cell">
                        <div className="name-content">
                          <span className="name-text">{message.name || 'N/A'}</span>
                        </div>
                      </td>
                      <td className="email-cell">
                        <a href={`mailto:${message.email}`} className="email-link">
                          {message.email || 'N/A'}
                        </a>
                      </td>
                      <td className="company-cell">{message.companyName || 'N/A'}</td>
                      <td className="budget-cell">
                        <span className="budget-amount">{message.budget || 'N/A'}</span>
                      </td>
                      <td className="status-cell">
                        {getStatusBadge(message.status)}
                      </td>
                      <td className="date-cell">
                        <span className="date-text">{formatDate(message.submittedAt)}</span>
                      </td>
                      <td className="actions-cell">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openMessageDetail(message)}
                          className="view-btn"
                        >
                          <Eye size={16} />
                          <span>View</span>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {showModal && <MessageDetailModal />}
      </div>
    </DashboardLayout>
  );
};

export default MessagesPage;