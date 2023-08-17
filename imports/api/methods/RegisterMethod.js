import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { RegisterCollection } from './registercollection';
import { ROLES } from './roles'; // Import roles constants

Meteor.methods({
  'users.register': function(userData) {
    // Validation and registration logic here

    const userId = Accounts.createUser({
      email: userData.email,
      password: userData.password,
      profile: {
        name: userData.name,
        role: userData.role,
      },
    });

    // // Insert user data into RegisterCollection
    // RegisterCollection.insert({
    //   userId: userId,
    //   email: userData.email,
    //   role:userData.role
    //   // ... other fields you want to store
    // });

    return userId;
  },
});
