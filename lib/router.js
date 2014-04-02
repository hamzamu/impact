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
		return posts.find({},findOptions);
    },
    
    data : function(){
	return posts ;
}

});

ListsController = RouteController.extend({

        data: function () {
            //return posts.find{}, {sort: { created_at: -1}});
           templateData = { posts: posts.find({},{sort :{created_at:-1}} ) };
            return templateData;
        }

});

SearchController = RouteController.extend({
    


        data: function () {
            //return posts.find{}, {sort: { created_at: -1}});
           templateData = { 
               //posts: posts.find({},{sort :{created_at:-1}} ) 
               posts: posts.find({post:'egypt'},{sort :{created_at:-1}} ) 
           };
            return templateData;
        }
    


});


Router.map(function () {
    /**
     * The route's name is "home"
     * The route's template is also "home"
     * The default action will render the home template
     */
    this.route('main', {
        path: '/',
        layoutTemplate: 'main',
        waitOn: function () {
            return Meteor.subscribe('posts');
        },
    });
    this.route('admin', {
        path: '/admin',
        layoutTemplate: 'admin'
    });


    this.route('users', {
        path: '/users',
        layoutTemplate: 'users'
    });

    this.route('postShow', {
        path: '/posts/:_id',
        //controller: 'PostShowController'
        waitOn: function () {
            return Meteor.subscribe('posts');
        },
        data: function () {
            return posts.findOne(this.params._id);
        },
        layoutTemplate: 'postShow',

    });    
    
    this.route('lists', {
        path: '/lists',
        controller: 'ListsController',
//        waitOn: function () {
//            return Meteor.subscribe('posts');
//        },

        layoutTemplate: 'lists',

    });

    this.route('searchResults', {
        path: '/s/:q',
        //        //controller: 'PostShowController'
        waitOn: function () {
            return Meteor.subscribe('posts');
        },
        controller : 'SearchController',
        layoutTemplate: 'lists',

    });

});