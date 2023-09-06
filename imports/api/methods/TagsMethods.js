import { Meteor } from 'meteor/meteor'
import { TagsCollection } from '../Collection/TagsCollection'

Meteor.methods({
  'tags.insert'(tagData) {
    // Check if the user is logged in
    if (!this.userId) {
      throw new Meteor.Error('not-authorized', 'You are not authorized to perform this action.');
    }

    const currentUser = Meteor.users.findOne(this.userId);

    // Check if the user's role is keelaAdmin or their organization matches the tag's organization
    if (currentUser.profile.role === 'KeelaAdmin' || tagData.organizationName === currentUser.profile.organizationName) {
      TagsCollection.insert(tagData);
    } else {
      throw new Meteor.Error('not-authorized', 'You are not authorized to perform this action.');
    }
  },

    'tags.update'(tag) {
      TagsCollection.update(tag._id, {
        $set: {
          ...tag,
        }
      })
    },
    
    'tags.remove'(tagId) {
      TagsCollection.remove(tagId);
    },
  });