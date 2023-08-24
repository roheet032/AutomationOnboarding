import { Meteor } from 'meteor/meteor'
import { OrganizationsCollection } from '../Collection/OrganizationsCollection'

Meteor.methods({
    'organizations.insert'(organizationsData) {
      OrganizationsCollection.insert(organizationsData);
    },
    'organizations.update'(organizationId, updatedData) {
      OrganizationsCollection.update(organizationId, { $set: updatedData });
    },
    'organizations.remove'(organizationId) {
      OrganizationsCollection.remove(organizationId);
    },
  });