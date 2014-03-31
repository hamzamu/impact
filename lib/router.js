Router.configure({
    layoutTemplate: 'main',
    loadingTemplate: 'loading',
    notFoundtemplate: 'notFound'

});



Router.map(function () {
    /**
     * The route's name is "home"
     * The route's template is also "home"
     * The default action will render the home template
     */
    this.route('main', {
        path: '/',
        layoutTemplate: 'main'
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

});