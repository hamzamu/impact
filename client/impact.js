Accounts.ui.config({
    passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
});






Template.navside.helpers({
    // check if user is an admin
    isAdminUser: function () {
        return Roles.userIsInRole(Meteor.user(), ['admin']);
    }
})





//Meteor.subscribe('posts');
Meteor.subscribe("directory");
Meteor.subscribe("rates");
Meteor.subscribe("comments");
Meteor.subscribe("tags");
//Meteor.subscribe("postscount");


Session.setDefault('postsn', 20);
var query = { $regex: Session.get('prefix') + ".*", $options: 'i' };
Deps.autorun(function () {
    Meteor.subscribe('posts', Session.get('postsn'), query);
})

Session.setDefault('createError', null);
Template.errorz.error = function () {
    return Session.get("createError");
};

//Template.posts.hasmore = function () {
//    //var postscounts = posts.find().count();
//    //return getPostsCount();
//    return posts.find().count();
//}


Template.sidebarnav.hashlist = function () {
    return tags.find({}, {
        limit: 10,
        sort: {
            count: -1,
            dtime: -1
        }
    });
}

Template.sidebarnav.helpers({
    tagout: function () {
        var tag = this.tag;
        var replacex = tag.replace(/#(\S*)/ig, "$1");
        return replacex;
    }

})

Template.sidebarnav.events({
    'click .taglink': function (e, t) {
        var hashtag = $(e.target).attr("alt");
        Session.set('hashtag', hashtag);
        Meteor.call('resetPostsNo');

    },
})

UI.body.events({
    'click #nav-expander': function (e, t) {
        e.preventDefault();
        $('body').toggleClass('nav-expanded');
        $('body').addClass('stop-scrolling');
    },    

    'click #nav-close': function (e, t) {
        $('body').removeClass('nav-expanded');
        $('body').removeClass('stop-scrolling');
    },
    'mouseup .main-menu': function (e, t) {
        $('body').removeClass('nav-expanded');
        $('body').removeClass('stop-scrolling');
    },
    'click #top': function (e, t) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 1000);
    },

})





Meteor.methods({
    createErrorMsg: function (msg) {
        Session.set('createError', msg);
        $('#error').css('display', 'block');
    },
    resetPostsNo: function () {
        Session.set('postsn', 20);
    }

});



function focusText(i, val) {
    i.focus();
    i.value = val ? val : "";
    i.select();

};