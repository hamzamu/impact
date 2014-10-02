Router.configure({
    layoutTemplate: 'main',
    loadingTemplate: 'loading',
    notFoundtemplate: 'notFound'

});


PostsListController = RouteController.extend({

    findOptions: function () {
        return {
            sort: {
                created_at: -1
            },
            limit: 4
        }
    },
    posts: function () {
        return posts.find({}, findOptions);
    },

    data: function () {
        return posts;
    }

});

ListsController = RouteController.extend({

    data: function () {
        //return posts.find{}, {sort: { created_at: -1}});
        templateData = {
            posts: posts.find({}, {
                sort: {
                    created_at: -1
                }
            })
        };
        return templateData;
    }

});


TagController = RouteController.extend({

    data: function () {
        //return posts.find{}, {sort: { created_at: -1}});

        templateData = {
            posts: posts.find({
                post: {
                    $regex: this.params.q + ".*",
                    $options: 'i'
                }
            }, {
                sort: {
                    created_at: -1
                }
            })
        };
        return templateData;
    }

});



PostsController = RouteController.extend({
    template: 'postsList',
    increment: 5,
    //sort: {submitted: -1, _id: -1},
    //postlimitz: Session.get('postsn'),
    sort: {
        created_at: -1
    },

    limit: function () {
        return parseInt(this.params.postsLimit) || this.increment;
    },
    findOptions: function () {
        return {
            sort: this.sort,
            limit: this.limit()
        };
    },
    onBeforeAction: function () {
        this.postsSub = Meteor.subscribe('posts', this.findOptions());
    },
    posts: function () {
        return posts.find({}, this.findOptions());
    },
    data: function () {
        var hasMore = this.posts().count() === this.limit();
        var nextPath = this.route.path({
            postsLimit: this.limit() + this.increment
        });
        return {
            posts: this.posts(),
            nextPath: hasMore ? nextPath : null
        };
    }
});


SeaController = RouteController.extend({
    //template: 'postsList',
    increment: 5,

    //postlimitz: Session.get('postsn'),
    sort: {
        created_at: -1
    },

    limit: function () {

        if (Meteor.isClient) {
            this.params.postsLimit = Session.get("postsn");
        }
        return parseInt(this.params.postsLimit) || this.increment;
    },
    findOptions: function () {
        return {
            sort: this.sort,
            limit: this.limit()
        };
    },

    onBeforeAction: function () {
        this.postsSub = Meteor.subscribe('search', {
            post: {
                $regex: this.params.q + ".*",
                $options: 'i'
            }
        }, this.findOptions());
    },
    posts: function () {
        return posts.find({}, this.findOptions());
    },
    data: function () {
        var hasMore = this.posts().count() === this.limit();
        var nextPath = this.route.path({
            postsLimit: this.limit() + this.increment
        });
        return {
            posts: this.posts(),
            nextPath: hasMore ? nextPath : null
        };
    }
});






Router.map(function () {
    /**
     * The route's name is "home"
     * The route's template is also "home"
     * The default action will render the home template
     */
    this.route('main', {
        path: '/:postsLimit?',
        layoutTemplate: 'main',
        controller: 'PostsController',
        //        waitOn: function () {
        //            return Meteor.subscribe('posts');
        //        },
    });
    this.route('admin', {
        path: '/admin',
        layoutTemplate: 'admin'
    });
    //


    this.route('users', {
        path: '/users',
        layoutTemplate: 'users'
    });

    //    this.route('profile',{
    //        path :'/profile/:_id',
    //        layoutTemplate:'profile',
    //        data :function(){ return Users.findOne(this.params._id);}
    //    });


    this.route('profile', {
        path: '/profile',
        layoutTemplate: 'profile',

        data: function () {
            return Meteor.user();
        }
    });

    this.route('user_profile', {
        path: '/users/:_id',
        layoutTemplate: 'user_profile',
        // controller: 'UserPostController',
        //data :function(){ return Meteor.users.findOne({_id: '699reeHfptobbmcr5'}
        waitOn: function () {

       return [
        Meteor.subscribe('userprofile', this.params._id),
        Meteor.subscribe('userposts', this.params._id , 10)
      ];
           },
        data: function () {
            return Meteor.users.findOne({
                _id: this.params._id
            });
        }

    });


    this.route('postShow', {
        path: '/posts/:_id',
        //controller: 'SearchController'
        waitOn: function () {
            return 
            [
                Meteor.subscribe('singlePost', this.params._id),
               // Meteor.subscribe('comments', this.params._id),
            ];
        },
        data: function () {
            return posts.findOne(this.params._id);
        },
        layoutTemplate: 'postShow',

    });

    this.route('hashtag', {
        path: '/s/:q/:postsLimit?',
        //controller: 'TagController',
        controller: 'SeaController',
        //        waitOn: function () {
        //            return Meteor.subscribe('posts');
        //        },
        //        data: function () {
        //            //return posts.findOne(this.params._id);
        //             //return posts.find({post: { $regex: this.params.q + ".*", $options: 'i' } }, { sort: { created_at: -1}
        //            return posts.find({post:this.params.q});
        //        },
        //layoutTemplate: 'hashtag',
        layoutTemplate: 'main',

    });

    this.route('lists', {
        path: '/lists',
        controller: 'ListsController',
        //        waitOn: function () {
        //            return Meteor.subscribe('posts');
        //        },

        layoutTemplate: 'lists',

    });

    this.route('search', {
        path: '/search',
        //controller: 'ListsController',
        //        waitOn: function () {
        //            return Meteor.subscribe('posts');
        //        },

        layoutTemplate: 'searchTest',
    });



});