Template.searchnav.events({
    'click #openi': function (e, t) {
        $('body').addClass('stop-scrolling');
        $("#tooltip").fadeToggle("fast", "linear");        
        $('#search').focus();
    },
        'click #menuside': function (e, t) {
        e.preventDefault();
        $('body').toggleClass('nav-expanded');
        $('body').addClass('stop-scrolling');
    },


});


Template.controlnav.events({
    'click #profile': function (e, t) {
        Router.go('profile');
    },
    'click #logout': function (e, t) {
        Router.go('entrySignOut');
    },    





});

Template.searchbox.events({
    'click #closei': function (e, t) {

        $("#tooltip").fadeToggle("fast", "linear");
        Meteor.setTimeout(function () {
            $('body').removeClass('stop-scrolling');
        }, 100)

    },
    'keyup #search': function (e, t) {
        if (e.which === 13) {
            $("#tooltip").fadeToggle("fast", "linear");
            e.preventDefault();
            //Session.set('prefix', $('#search').val());     
            Meteor.setTimeout(function () {
                $('body').removeClass('stop-scrolling');
            }, 100)
            //var param = val ;
            var seachterm =  $('#search').val();
            //Meteor.call('resetPostsNo');
            $('#search').val('');
            Session.set('hashtag', seachterm);
            Router.go('/s/'+seachterm);
            //Router.go('/search');
        }
        if (e.which === 27) {
            $("#tooltip").fadeToggle("fast", "linear");
            $('#search').val('');
            Meteor.setTimeout(function () {
                $('body').removeClass('stop-scrolling');
            }, 100)
        }
    }
});




// search stuff


Template.searchTest.posts = function () {
    return posts.find({
        post: { $regex: Session.get('prefix') + ".*", $options: 'i' } }, {       sort: { created_at: -1}
    });
};

Template.searchTest.helpers({
    thePrefix: function () {
        return Session.get("prefix");
    }
});
