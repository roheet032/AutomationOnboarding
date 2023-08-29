import { Meteor } from 'meteor/meteor'
import {Accounts} from 'meteor/accounts-base'
import '../imports/api/Methods/UserMethods'


import { ContactsCollection } from '../imports/api/Collection/ContactsCollection';
import '../imports/api/Methods/ContactsMethods'

Meteor.publish('contacts', function publishContacts() {
 
  return ContactsCollection.find();
});


import { OrganizationsCollection } from '../imports/api/Collection/OrganizationsCollection';
import '../imports/api/Methods/OrganizationMethods'

Meteor.publish('organizations',function publishOrganizations(){
  return OrganizationsCollection.find();
})

import { TagsCollection } from '../imports/api/Collection/TagsCollection';
import '../imports/api/Methods/TagsMethods'

Meteor.publish('tags',function publishTags(){
  const currentUser = Meteor.users.findOne(this.userId);
  if (currentUser.profile.role === 'keelaAdmin') {
    return TagsCollection.find();
  } else {
    return TagsCollection.find({ organizationName: currentUser.profile.organizationName });
  }
  //return TagsCollection.find();
})

//user-role
// import '../imports/api/Methods/UserMethods'


Meteor.publish('users', function publishUsers() {
  return Meteor.users.find();
});


Meteor.methods({
  'users.login'(userData) {
    const user = Meteor.users.findOne({ 'emails.address': userData.email });

    if (!user || !Accounts._checkPassword(user, userData.password)) {
      throw new Meteor.Error('Invalid credentials');
    }

    return user._id;
  },
});
// Defining userData publication directly
Meteor.publish('userData', function() {
  if (!this.userId) {
    return this.ready();
  }

  const currentUser = Meteor.users.findOne(this.userId);

  if (currentUser && currentUser.profile.organizationId) {
    return Meteor.users.find({
      'profile.organizationId': currentUser.profile.organizationId,
    });
  } else {
    return this.ready();
  }
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
