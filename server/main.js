import { Meteor } from 'meteor/meteor'
import {Accounts} from 'meteor/accounts-base'
import '../imports/api/Methods/UserMethods'

//Publication for Contacts

import { ContactsCollection } from '../imports/api/Collection/ContactsCollection';
import '../imports/api/Methods/ContactsMethods'

Meteor.publish('contacts', function publishContacts() {
 
  return ContactsCollection.find();
});


//Publication for Organization 
import { OrganizationsCollection } from '../imports/api/Collection/OrganizationsCollection';
import '../imports/api/Methods/OrganizationMethods'

Meteor.publish('organizations', function publishOrganizations() {
  if (!this.userId) {
    return this.ready();
  }

  const currentUser = Meteor.users.findOne(this.userId);

  if (currentUser && currentUser.profile) {
    if (currentUser.profile.role === 'KeelaAdmin') {
      return OrganizationsCollection.find();
    } else if (currentUser.profile.organizationName) {
      return OrganizationsCollection.find({ name: currentUser.profile.organizationName });
    }
  }

  return this.ready();
});

//Publication for Tags
import { TagsCollection } from '../imports/api/Collection/TagsCollection';
import '../imports/api/Methods/TagsMethods'

Meteor.publish('tags',function publishTags(){
  const currentUser = Meteor.users.findOne(this.userId);
  if (currentUser.profile.role === 'KeelaAdmin') {
    return TagsCollection.find();
  } else {
    return TagsCollection.find({ organizationName: currentUser.profile.organizationName });
  }
  
})

// Publication for users
Meteor.publish('users', function () {
  // Check if the user is logged in
  if (!this.userId) {
    return this.ready();
  }
  
  // Find the current user
  const currentUser = Meteor.user();

  // Check the current User
  if (currentUser?.profile) {
  
    if (currentUser.profile.role === 'KeelaAdmin') {
      // For KeelaAdmin, publish all users without filtering
      return Meteor.users.find();
    } else {
      const organizationId = currentUser.profile.organizationId;
      // For other roles, publish users based on the organization
      return Meteor.users.find({ 'profile.organizationId': organizationId });
    }
  }

  // If no organization data is found, publish an empty cursor
  return this.ready();
});

Meteor.startup(async () => {
  
})
