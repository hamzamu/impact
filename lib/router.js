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


SearchController = RouteController.extend({

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

//SearchController = RouteController.extend({
//    
//
//
//        data: function () {
//            //return posts.find{}, {sort: { created_at: -1}});
//           templateData = { 
//               //posts: posts.find({},{sort :{created_at:-1}} ) 
//               posts: posts.find({post: this.param.q},{sort :{created_at:-1}} ) 
//           };
//            return templateData;
//        }
//    
//
//
//});


Router.map(function () {
    /**
     * The route's name is "home"
     * The route's template is also "home"
     * The default action will render the home template
     */
    this.route('main', {
        path: '/',
        layoutTemplate: 'main',
        //        waitOn: function () {
        //            return Meteor.subscribe('posts');
        //        },
    });
    this.route('admin', {
        path: '/admin',
        layoutTemplate: 'admin'
    });

    this.route('signin', {
        path: '/signin',
        layoutTemplate: 'signin'
    });

    this.route('signup', {
        path: '/signup',
        layoutTemplate: 'signup'
    });


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
        layoutTemplate:'profile',
        
        data: function () {
            return Meteor.user();
        }
    });

    this.route('user_profile', {
        path: '/users/:_id',
        layoutTemplate:'user_profile',
         data :function(){ return Meteor.users.findOne(
            {_id: this.params._id}
        );}

    });


    this.route('postShow', {
        path: '/posts/:_id',
        //controller: 'SearchController'
        waitOn: function () {
            return Meteor.subscribe('posts');
        },
        data: function () {
            return posts.findOne(this.params._id);
        },
        layoutTemplate: 'postShow',

    });

    this.route('hashtag', {
        path: '/s/:q',
        controller: 'SearchController',
        //        waitOn: function () {
        //            return Meteor.subscribe('posts');
        //        },
        //        data: function () {
        //            //return posts.findOne(this.params._id);
        //             //return posts.find({post: { $regex: this.params.q + ".*", $options: 'i' } }, { sort: { created_at: -1}
        //            return posts.find({post:this.params.q});
        //        },
        layoutTemplate: 'hashtag',

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

    //    this.route('searchResults', {
    //        path: '/s/:q',
    //        //        //controller: 'PostShowController'
    //        waitOn: function () {
    //            return Meteor.subscribe('posts');
    //        },
    //        controller : 'SearchController',
    //        layoutTemplate: 'lists',
    //
    //    });

});