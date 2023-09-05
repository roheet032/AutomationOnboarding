import { Meteor } from 'meteor/meteor'
import {Accounts} from 'meteor/accounts-base'
import '../imports/api/Methods/UserMethods'

//publication for Contacts

import { ContactsCollection } from '../imports/api/Collection/ContactsCollection';
import '../imports/api/Methods/ContactsMethods'

Meteor.publish('contacts', function publishContacts() {
 
  return ContactsCollection.find();
});

//publication for Organization 

import { OrganizationsCollection } from '../imports/api/Collection/OrganizationsCollection';
import '../imports/api/Methods/OrganizationMethods'

Meteor.publish('organizations',function publishOrganizations(){
  return OrganizationsCollection.find();
})


//publication for Tags
import { TagsCollection } from '../imports/api/Collection/TagsCollection';
import '../imports/api/Methods/TagsMethods'

Meteor.publish('tags',function publishTags(){
  const currentUser = Meteor.users.findOne(this.userId);
  if (currentUser.profile.role === 'keelaAdmin') {
    return TagsCollection.find();
  } else {
    return TagsCollection.find({ organizationName: currentUser.profile.organizationName });
  }
  
})

// publication for users
Meteor.publish('users', function () {
  // Check if the user is logged in
  if (!this.userId) {
    return this.ready();
  }

  // Find the current user
  const currentUser = Meteor.users.findOne(this.userId);

  // Check if the current user has organization information
  if (currentUser && currentUser.profile && currentUser.profile.organizationId) {
    const organizationId = currentUser.profile.organizationId;

    if (currentUser.profile.role === 'KeelaAdmin') {
      // For KeelaAdmin, publish all users without filtering
      return Meteor.users.find();
    } else {
      // For other roles, publish users based on the organization
      return Meteor.users.find({ 'profile.organizationId': organizationId });
    }
  }

  // If no organization data is found, publish an empty cursor
  return this.ready();
});




// //publication for users 
// Meteor.publish('users', function () {
//   // Check if the user is logged in
//   if (!this.userId) {
//     return this.ready();
//   }
  
//   // Find the current user
//   const currentUser = Meteor.users.findOne(this.userId);

//   // Check if the current user has organization information
//   if (currentUser && currentUser.profile && currentUser.profile.organizationId) {
//     const organizationId = currentUser.profile.organizationId;

//     // Publish users based on the organization
//     return Meteor.users.find({ 'profile.organizationId': organizationId });
//   }

//   // If no organization data is found, publish an empty cursor
//   return this.ready();
// });

//userlogin authentication
Meteor.methods({
  'users.login'(userData) {
    const user = Meteor.users.findOne({ 'emails.address': userData.email });

    if (!user || !Accounts._checkPassword(user, userData.password)) {
      throw new Meteor.Error('Invalid credentials');
    }

    return user._id;
  },
});





Meteor.startup(async () => {
  

  // If the Links collection is empty, add some data.
  // if ((await LinksCollection.find().countAsync()) === 0) {
  //   await insertLink({
  //     title: 'Do the Tutorial',
  //     url: 'https://vuejs.org/guide/quick-start.html',
  //   })

  //   await insertLink({
  //     title: 'Follow the Guide',
  //     url: 'https://guide.meteor.com',
  //   })

  //   await insertLink({
  //     title: 'Read the Docs',
  //     url: 'https://docs.meteor.com',
  //   })

  //   await insertLink({
  //     title: 'Discussions',
  //     url: 'https://forums.meteor.com',
  //   })
  // }
})
