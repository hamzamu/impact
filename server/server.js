        Meteor.publish('posts', function (limit) {
           
  
            return posts.find({},{
                limit: limit,
                sort: {
                    created_at: -1
                }
            });
        })


         Meteor.publish('comments', function () {
            return comments.find();
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


        Accounts.onCreateUser(function (options, user) {
            if (user.services.twitter) {
                user.username = user.services.twitter.screenName;
                user.avatar = user.services.twitter.profile_image_url;
            }

            if (user.services.facebook) {
                user.username = user.services.facebook.name;
                user.avatar = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=square";
            }
            return user;
        });

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