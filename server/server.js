posts = new Meteor.Collection("posts");	
	Meteor.publish('posts', function () {
	   posts.find({});
	});
	
	
  Meteor.startup(function () {
    // code to run on server at startup
  });
