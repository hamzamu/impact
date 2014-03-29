Meteor.publish('posts', function () {
    return Posts.find({});
})

Meteor.publish("directory", function () {
    return Meteor.users.find({});
});

Meteor.startup(function () {
    // code to run on server at startup
});
