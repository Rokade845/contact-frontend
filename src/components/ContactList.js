import React from 'react';

const ContactList = ({ contacts, onDeleteContact, onEditContact, loading }) => {
  if (loading) {
    return (
      <div className="contact-list">
        <h2>Contacts</h2>
        <div className="loading">Loading contacts...</div>
      </div>
    );
  }

  if (contacts.length === 0) {
    return (
      <div className="contact-list">
        <h2>Contacts</h2>
        <div className="empty-state">
          <h3>No contacts found</h3>
          <p>Add your first contact using the form above!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-list">
      <h2>Contacts ({contacts.length})</h2>
      <div className="contact-grid">
        {contacts.map(contact => (
          <div key={contact.id} className="contact-card">
            <div className="contact-name">{contact.name}</div>
            <div className="contact-details">
              {contact.email && (
                <div className="contact-detail">
                  <strong>Email:</strong>
                  <span>{contact.email}</span>
                </div>
              )}
              {contact.phone && (
                <div className="contact-detail">
                  <strong>Phone:</strong>
                  <span>{contact.phone}</span>
                </div>
              )}
            </div>
            <div className="contact-actions">
              <button
                className="btn btn-primary btn-sm"
                onClick={() => onEditContact(contact)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => onDeleteContact(contact.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactList;
