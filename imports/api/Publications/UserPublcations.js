// import { Meteor } from 'meteor/meteor';
// import { RegisterCollection } from './registercollection';
// import { ROLES } from './roles'; // Import roles constants

// if (Meteor.isServer) {
//   Meteor.publish('userData', function() {
//     if (ROLES.userIsInRole(this.userId, [ROLES.ADMIN, ROLES.COORDINATOR])) {
//       // Only allow Admin and Coordinator to access the data
//       return RegisterCollection.find();
//     } else {
//       // Return no data for other roles
//       return null;
//     }
//   });
// }
