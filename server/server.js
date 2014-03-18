posts = new Meteor.Collection("posts");

	
	Meteor.publish('posts', function () {
	   return posts.find({});
	})
	
	
	Meteor.publish("directory", function () {
		return Meteor.users.find({});
	});
	
	
  Meteor.startup(function () {
    // code to run on server at startup
  });
  
  
  
  
