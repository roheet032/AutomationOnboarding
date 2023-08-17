import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base';

Meteor.methods({
  insertUser(user) {
    if (!Accounts.findUserByEmail(user.email)) {
      Accounts.createUser(user);
    } else {
      throw new Meteor.Error('Email already exists')
    }
  },

  deleteUser(userId) {
    Meteor.users.remove(userId);
    return 'User deleted successfully';
  },

//   updateUser(data) {
//     Meteor.users.update(
//       { _id: data.userId },
//       {
//         $set: {
//           'profile.role': data.updates['profile.role'],
//           'profile.firstName': data.updates['profile.firstName'],
//           'profile.lastName': data.updates['profile.lastName'],
//         },
// //       })
//   }
})