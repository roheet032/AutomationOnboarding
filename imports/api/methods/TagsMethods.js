import { Meteor } from 'meteor/meteor'
import { TagsCollection } from '../Collection/TagsCollection'

Meteor.methods({
    'tags.insert'(formData) {
      TagsCollection.insert(formData);
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