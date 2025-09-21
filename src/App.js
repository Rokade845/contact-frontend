import React, { useState, useEffect } from 'react';
import './App.css';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import { getContacts, addContact, deleteContact, updateContact } from './services/api';

function App() {
  const [contacts, setContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(null);
  const [loading, setLoading] = useState(false);

  // Load contacts on component mount
  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    setLoading(true);
    try {
      const data = await getContacts();
      setContacts(data);
    } catch (error) {
      console.error('Error loading contacts:', error);
      alert('Error loading contacts');
    } finally {
      setLoading(false);
    }
  };

  const handleAddContact = async (contactData) => {
    try {
      const newContact = await addContact(contactData);
      setContacts([newContact, ...contacts]);
      alert('Contact added successfully!');
    } catch (error) {
      console.error('Error adding contact:', error);
      alert('Error adding contact');
    }
  };

  const handleUpdateContact = async (id, contactData) => {
    try {
      const updatedContact = await updateContact(id, contactData);
      setContacts(contacts.map(contact => 
        contact.id === id ? updatedContact : contact
      ));
      setEditingContact(null);
      alert('Contact updated successfully!');
    } catch (error) {
      console.error('Error updating contact:', error);
      alert('Error updating contact');
    }
  };

  const handleDeleteContact = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await deleteContact(id);
        setContacts(contacts.filter(contact => contact.id !== id));
        alert('Contact deleted successfully!');
      } catch (error) {
        console.error('Error deleting contact:', error);
        alert('Error deleting contact');
      }
    }
  };

  const handleEditContact = (contact) => {
    setEditingContact(contact);
  };

  const handleCancelEdit = () => {
    setEditingContact(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Contact Book</h1>
        <p>Manage your contacts easily</p>
      </header>
      
      <main className="App-main">
        <div className="container">
          <ContactForm 
            onAddContact={handleAddContact}
            onUpdateContact={handleUpdateContact}
            editingContact={editingContact}
            onCancelEdit={handleCancelEdit}
          />
          
          <ContactList 
            contacts={contacts}
            onDeleteContact={handleDeleteContact}
            onEditContact={handleEditContact}
            loading={loading}
          />
        </div>
      </main>
    </div>
  );
}

export default App;