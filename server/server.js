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
  
  
    Meteor.startup(function () {
        // bootstrap the admin user if they exist -- You'll be replacing the id later
        if (Meteor.users.findOne("9YEKgf65oEzjfQBqB"))
            Roles.addUsersToRoles("9YEKgf65oEzjfQBqB", ['admin']);

        // create a couple of roles if they don't already exist (THESE ARE NOT NEEDED -- just for the demo)
        if(!Meteor.roles.findOne({name: "manager"}))
            Roles.createRole("manager"); 
        if(!Meteor.roles.findOne({name: "editor"}))
            Roles.createRole("editor");
        if(!Meteor.roles.findOne({name: "reporter"}))
            Roles.createRole("reporter");
    });
  
  
  
