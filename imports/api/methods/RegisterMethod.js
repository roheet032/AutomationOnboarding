import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { RegisterCollection } from './registercollection';


Meteor.methods({
  'users.register': function(userData) {
    

    const userId = Accounts.createUser({
      email: userData.email,
      password: userData.password,
      profile: {
        name: userData.name,
        role: userData.role,
        organizationId:userData.organizationId,
      },
    });

    return userId;
  },
});
