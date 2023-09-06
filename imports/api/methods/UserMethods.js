import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';


Meteor.methods({
  'users.insert': function(userData) {
    const userId = Accounts.createUser({
      email: userData.email,
      password: userData.password,
      profile: {
        name: userData.name,
        role: userData.role,
        organizationId:userData.organizationId,
        organizationName:userData.organizationName
       
      },
    });
  },

  'users.update'(user) {
  
    Meteor.users.update(user._id, {
      $set: {
        'profile.name': user.profile.name,
        'profile.role': user.profile.role,
        'profile.organizationId': user.profile.organizationId,
        'profile.organizationName':user.profile.organizationName
      }
    });
  },


  deleteUser(userId) {
    Meteor.users.remove(userId);
    return 'User deleted successfully';
  },

});
