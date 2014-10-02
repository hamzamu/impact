Meteor.publish('posts', function(options) {
  return posts.find({}, options);
});

Meteor.publish('search', function(query , options) {
  return posts.find(query, options);
});




  Meteor.publish('Images', function() {
//    if (this.userId) {
//        return ContactsFS.find({ owner: this.userId }, { limit: 30 });
//    }
      
       return Images.find();
});





Meteor.publish('singlePost', function(id) {
  return id && posts.find(id);
});


Meteor.publish('comments', function(postId) {
  return comments.find({postId: postId});
});


/// userprofiles 

Meteor.publish("userprofile", function (userId) {
      return Meteor.users.findOne({_id: userId});
});


Meteor.publish('userposts', function(userId,limit) {
   return posts.find({author: userId}, {sort: { created_at: -1}, limit : limit});
});



//rates 



   Meteor.publish('rates', function () {
      return rates.find();
  });

//tags

   Meteor.publish('tags', function () {
     return tags.find({}, {
        limit: 10,
        sort: {
            count: -1,
            dtime: -1
        }
    });
  })

   //users

   Meteor.publish("directory", function () {
      return Meteor.users.find({});
  });