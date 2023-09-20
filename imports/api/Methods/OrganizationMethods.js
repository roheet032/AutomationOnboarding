import { Meteor } from 'meteor/meteor'
import { OrganizationsCollection } from '../Collection/OrganizationsCollection'

Meteor.methods({
    'organizations.insert'(formData) {
      OrganizationsCollection.insert(formData);
    },
    
    'organizations.update'(organization) {

      OrganizationsCollection.update(organization._id, {
        $set: {
          ...organization,
        }
      })
    },
    'organizations.remove'(organizationId) {
      OrganizationsCollection.remove(organizationId);
    },
  });