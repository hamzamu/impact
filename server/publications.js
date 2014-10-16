//Meteor.publish('posts', function(options) {
//  return posts.find({}, options);
//});

Meteor.publish('search', function (query, options) {
    return posts.find(query, options);
});


Meteor.publish('postsx', function () {
    return posts.find({});
});


//    if (this.userId) {
//        return ContactsFS.find({ owner: this.userId }, { limit: 30 });
//    }

Meteor.publish('Images', function (justuploaded) {

    return Images.find({
        id: justuploaded
    });
});





Meteor.publish('singlePost', function (id) {
    return id && posts.find(id);
});

//
//Meteor.publish('comments', function(post) {
//  return comments.find({post: post});
//  //return comments.find({postId: {$in: postId}});
//});


/// userprofiles 

Meteor.publish("userprofile", function (userId) {
    return Meteor.users.findOne({
        _id: userId
    });
});


Meteor.publish('userposts', function (userId, limit) {
    return posts.find({
        author: userId
    }, {
        sort: {
            created_at: -1
        },
        limit: limit
    });
});


Meteor.publishComposite('postcomments', function (post) {
//    return comments.find({
//        post: post
//    });
    //return comments.find({postId: {$in: postId}});
    
    return {
        find: function () {
            // Find posts made by user. Note arguments for callback function
            // being used in query.
            return comments.find({post: post});
        },
        childern : [
        
                {
                    find: function (comment) {
                        // Find user that authored comment.
                        return Meteor.users.find({
                            _id: comment.user
                        });
                    }
                }
        ],
    }
});


Meteor.publishComposite('SinglePostT', function (postID) {
    return{
        find : function (){
            return posts.find({_id : postID});
        },
        childern : [
            {
                find : function(post){
                return  Meteor.users.find({_id:post.author});
                }
            },
        
        ]
    
    
    }
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

//   Meteor.publish("directory", function () {
//      return Meteor.users.find({});
//  });


Meteor.publishComposite('posts', function (options) {
    return {
        find: function () {
            // Find posts made by user. Note arguments for callback function
            // being used in query.
            return posts.find({}, options);
        },

        children: [
        {
            find: function (post) {
                // Find top two comments on post
                return comments.find({
                    post: post._id
                }, {
                    sort: {
                        score: -1
                    },                  
                });
            },
            children: [
                {
                    find: function (comment, post) {
                        // Find user that authored comment.
                        return Meteor.users.find({
                            _id: comment.user
                        }, {
                           
                            fields: {
                                profile: 1
                            }
                        });
                    }
                }
            ]
        },


            {
                find: function (post) {
                    // Find post author. Even though we only want to return
                    // one record here, we use "find" instead of "findOne"
                    // since this function should return a cursor.
                    return Meteor.users.find({
                        _id: post.author
                    }, {

                    });
                }
            },

            {
                find: function (post) {
                    return Images.find({
                        post: post._id
                    });
                }
                }

            ]


    }
});

///rates

//Meteor.publish('rates', function (id) {
//    return rates.find({user:id});
//});

Meteor.publish('rates', function () {
    return rates.find();
});

