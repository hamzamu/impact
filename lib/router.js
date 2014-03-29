/*
 * Configure site router
 */
Router.configure({
    layoutTemplate: 'home',
    waitOn: function() {
        return [
            //Meteor.subscribe('stats'),
        ];
    },
});
/*
 * Controller for home page
 */
PostListController = RouteController.extend({
    template: 'postlist',
    increment: +5,
    limit: function() {
        return parseInt(this.params.limit) || +this.increment;
    },
    findOptions: function() {
        return {sort: {created_at: -1}, limit: this.limit()};
    },
    waitOn: function() {
        return [
            Meteor.subscribe('posts'),
            // Meteor.subscribe('posts', this.findOptions()),
//            Meteor.subscribe('postsAll'),
//            Meteor.subscribe('comments'),
        ];
    },
    postCount: function() {
        // This is going to suck eventually, need to denormalize it
        return Posts.find().count();
    },
    posts: function() {
        return Posts.find();
        // return Posts.find({}, this.findOptions());
    },
    data: function() {
        var hasMore = this.postCount() > this.limit();
        var nextPath = '/' + (+this.limit() + +this.increment);
        return {
            posts: this.posts(), nextPath: hasMore ? nextPath : null
        };
    }
});

/*
 * URL Mapping
 */
Router.map(function() {

    this.route('contact', {
        path: '/contact',
    }),
    this.route('donate', {
        path: '/donate',
    }),
    this.route('admin', {
        path: '/admin',
    }),
    this.route('adminx', {
        path: '/adminx',
    }),
    this.route('admin_all', {
        path: '/admin_old',
    }),
    this.route('help', {
        path: '/help',
    }),
    this.route('login', {
        path: '/login',
    }),
    this.route('logout', {
        path: '/',
    }),  
    this.route('map', {
        path: '/map',
    }),
    this.route('page', {
        path: '/main',
    }),
    this.route('page', {
        path: '/',
    }),
    this.route('register', {
        path: '/register',
    }),  
    this.route('search', {
        path: '/search',
    }),
    this.route('users', {
        path: '/users',
    }),

    // :var turns segment into param 'var'
    this.route('post', {
        path: '/posts/:_id',
        waitOn: function() {
            return [
//                Meteor.subscribe('postSingle', this.params._id),
//                Meteor.subscribe('comments', this.params._id)
            ];
        },
        data: function() {
            return Posts.findOne(this.params._id);
        },
    }),

    // This tell IR to load the controller defined above
    this.route('postlist', {
        path: '/:limit?',
        controller: PostListController,
    }),

    this.route('*', {
        path: '404',
    })

});


/*
 * Pages that require standard login to access
    Router.before(requireLogin, {only: 'x'});
 */
