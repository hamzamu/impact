Posts = new Meteor.Collection('posts');
Errors = new Meteor.Collection('errors');

//throw an error 
throwError = function(message) {
    Errors.insert({message: message})
}
