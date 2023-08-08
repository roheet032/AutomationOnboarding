import { Mongo } from 'meteor/mongo';

export const ContactsCollection = new Mongo.Collection('contacts');

// Create a new contact
export const createContact = (contact) => {
    return ContactsCollection.insert(contact);
  };
  
  // Read all contacts
  export const readContacts = () => {
    return ContactsCollection.find().fetch();
  };
  
  // Update a contact by ID
  export const updateContact = (contactId, updatedContact) => {
    return ContactsCollection.update(contactId, { $set: updatedContact });
  };
  
  // Delete a contact by ID
  export const deleteContact = (contactId) => {
    return ContactsCollection.remove(contactId);
  };