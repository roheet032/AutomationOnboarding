import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { OrganizationsCollection } from '../Collection/OrganizationsCollection'



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

    // return userId;
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


// import { Meteor } from 'meteor/meteor';
// import { Accounts } from 'meteor/accounts-base';

// Meteor.methods({
//   insertUser(user) {
//     if (!Meteor.users.findOne({ email: user.email })) {
//       const userId = Accounts.createUser({
//         email: user.email,
//         password: user.password,
//         profile: {
//           fullName: user.fullName,
//           organization: user.organization,
//           role: user.role,
//         },
//       });
//       return userId;
//     } else {
//       throw new Meteor.Error('Email already exists');
//     }
//   },
  

//   deleteUser(userId) {
//     Meteor.users.remove(userId);
//     return 'User deleted successfully';
//   },

//   updateUser(user) {
//     Meteor.users.update(
//       { _id: user._id },
//       {
//         $set: {

//             ...user,
//             'profile.fullName': user.profile.fullName,
//             'profile.organization': user.profile.organization,
//             'profile.role': user.profile.role,
//         },
//       })
//   }

// });
// Meteor.methods({
//   'accounts.insert'(formData) {
//     Accounts.insert(formData);
//   },


//   'accounts.update'(user) {
//     Accounts.update(user._id, {
//       $set: {
//         ...user,
//       }
//     })
//   },


//   'accounts.remove'(userId) {
//     Accounts.remove(userId);
//   },
// });