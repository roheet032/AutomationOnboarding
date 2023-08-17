import { Mongo } from 'meteor/mongo';
 
export const RegisterCollection = new Mongo.Collection('register');


if (Meteor.isServer) {
    Meteor.publish('userData', function() {
      return RegisterCollection.find();
    });
  }