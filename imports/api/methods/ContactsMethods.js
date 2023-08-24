import { Meteor } from 'meteor/meteor'
import { ContactsCollection } from '../Collection/ContactsCollection'

Meteor.methods({
    'contacts.insert'(formData) {
      ContactsCollection.insert(formData);
    },


    'contacts.update'(contact) {
      ContactsCollection.update(contact._id, {
        $set: {
          ...contact,
        }
      })
    },
  
  
    'contacts.remove'(contactId) {
      ContactsCollection.remove(contactId);
    },
  });