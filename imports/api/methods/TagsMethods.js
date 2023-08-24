import { Meteor } from 'meteor/meteor'
import { TagsCollection } from '../Collection/TagsCollection'

Meteor.methods({
    'tags.insert'(formData) {
      TagsCollection.insert(formData);
    },
    'tags.update'(tagId, updatedData) {
      TagsCollection.update(tagId, { $set: updatedData });
    },
    'tags.remove'(tagId) {
      TagsCollection.remove(tagId);
    },
  });