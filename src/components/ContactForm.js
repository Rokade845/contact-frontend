import React, { useState, useEffect } from 'react';

const ContactForm = ({ onAddContact, onUpdateContact, editingContact, onCancelEdit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  // Update form data when editing contact changes
  useEffect(() => {
    if (editingContact) {
      setFormData({
        name: editingContact.name || '',
        email: editingContact.email || '',
        phone: editingContact.phone || ''
      });
    } else {
      setFormData({
        name: '',
        email: '',
        phone: ''
      });
    }
  }, [editingContact]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      alert('Name is required');
      return;
    }

    if (editingContact) {
      onUpdateContact(editingContact.id, formData);
    } else {
      onAddContact(formData);
    }
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: ''
    });
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      email: '',
      phone: ''
    });
    onCancelEdit();
  };

  return (
    <div className="contact-form">
      <h2>{editingContact ? 'Edit Contact' : 'Add New Contact'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter full name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email address"
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
          />
        </div>


        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {editingContact ? 'Update Contact' : 'Add Contact'}
          </button>
          {editingContact && (
            <button type="button" className="btn btn-secondary" onClick={handleCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
