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



//
//   Meteor.publish('comments', function () {
//      return comments.find();
//  })

   Meteor.publish('rates', function () {
      return rates.find();
  })

   Meteor.publish('tags', function () {
     return tags.find({}, {
        limit: 10,
        sort: {
            count: -1,
            dtime: -1
        }
    });
  })


   Meteor.publish("directory", function () {
      return Meteor.users.find({});
  });