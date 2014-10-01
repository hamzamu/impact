//  Meteor.publish('posts', function (limit) {
//
//
//      return posts.find({}, {
//          limit: limit,
//          sort: {
//              created_at: -1
//          }
//      });
//  });

//
//Meteor.publish('posts', function(limit , hashtag){
//    return posts.find({},{ limit : limit ,sort: { created_at: -1}});
//});
//  





  //~ Meteor.publish('topPostsWithTopComments', function() {
  //~ // first, get the top 30 posts
  //~ var topPostsCursor = posts.find({}, {sort: {score: -1}, limit: 10});
  //~ // then extract those posts' userIds
  //~ var userIds = topPostsCursor.map(function(p) { return p.author });
//~ 
  //~ // then return an array containing both the posts, and their corresponding comments
  //~ return [
    //~ topPostCursor,
    //~ Meteor.users.find({_id: {$in: userIds}})
  //~ ];
//~ });



   //    
   //    Meteor.publish("postscount", function () {
   //		return  posts.find().count();
   //	});	

   //    Meteor.publish("comments", function () {
   //		return comments.find({});
   //	});


//  Accounts.onCreateUser(function (options, user) {
//      if (user.services.twitter) {
//          user.username = user.services.twitter.screenName;
//          user.avatar = user.services.twitter.profile_image_url;
//      }
//
//      if (user.services.facebook) {
//          user.username = user.services.facebook.name;
//          user.avatar = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=square";
//      }
//      return user;
//  });


//
//var users=[
//   {email: "dgra@gmail.com", username: "gra", name: "gra", roles:['admin']}
//];
//_.each(users, function(user){
//    Accounts.createUser({
//        email: user.email,
//        password: "admin",
//        profile: {username: user.username},
//        profile: {name: user.name},
//        roles: user.roles
//    });
//});



if ( Meteor.users.find().count() === 0 ) {
    Accounts.createUser({
        username: 'admin',
        email: 'email@manager.com',
        password: 'asdws12',
        profile: {
            first_name: 'manager',
            last_name: 'manager',
            company: 'manager',
        }
    });
}

  Meteor.startup(function () {
      // bootstrap the admin user if they exist 
      //if (Meteor.users.findOne("9YEKgf65oEzjfQBqB"))
      var userId = Meteor.users.findOne({
          username: 'admin'
      });
      if (Meteor.users.findOne(userId))
          Roles.addUsersToRoles(userId, ['admin']);      
      

      // create a couple of roles if they don't already exist 
      if (!Meteor.roles.findOne({
          name: "manager"
      }))
          Roles.createRole("manager");
      if (!Meteor.roles.findOne({
          name: "editor"
      }))
          Roles.createRole("editor");
      if (!Meteor.roles.findOne({
          name: "reporter"
      }))
          Roles.createRole("reporter");


  });
