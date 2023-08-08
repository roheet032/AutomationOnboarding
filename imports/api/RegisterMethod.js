import { check } from "meteor/check";
import { RegisterCollection } from "./RegisterCollection";

Meteor.methods({
    'register.insert'(text){
        check(text,String)
    },

    'register.remove'(registerId){
        check(registerId,String)
    }
})