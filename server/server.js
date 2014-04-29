        
        
	Meteor.publish('posts', function (limit) {
	   return posts.find({},{limit:limit,sort:{created_at: -1}});
	})	
    
    
    Meteor.publish('comments', function (limit) {
	   return comments.find({},{limit:limit});
	})
		
    Meteor.publish('rates', function () {
	   return rates.find();
	})    
    
    Meteor.publish('tags', function () {
	   return tags.find();
	})
	
	
	Meteor.publish("directory", function () {
		return Meteor.users.find({});
	});		

//    
//    Meteor.publish("postscount", function () {
//		return  posts.find().count();
//	});	

//    Meteor.publish("comments", function () {
//		return comments.find({});
//	});
	


  
    Meteor.startup(function () {
        // bootstrap the admin user if they exist 
        //if (Meteor.users.findOne("9YEKgf65oEzjfQBqB"))
        var userId = Meteor.users.findOne({username:'admin'});
        if (Meteor.users.findOne(userId))
            Roles.addUsersToRoles(userId, ['admin']);

        // create a couple of roles if they don't already exist 
        if(!Meteor.roles.findOne({name: "manager"}))
            Roles.createRole("manager"); 
        if(!Meteor.roles.findOne({name: "editor"}))
            Roles.createRole("editor");
        if(!Meteor.roles.findOne({name: "reporter"}))
            Roles.createRole("reporter");
        
        
    });
  
  
  
