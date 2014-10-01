Accounts.ui.config({
    passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
});



Template._loginButtonsLoggedInDropdown.events({
    'click #login-buttons-edit-profile': function(event) {
        event.stopPropagation();
        Template._loginButtons.toggleDropdown();
        Router.go('main');
    }
});


Template.navside.helpers({
    // check if user is an admin
    isAdminUser: function () {
        return Roles.userIsInRole(Meteor.user(), ['admin']);
    }
})



Session.setDefault('createError', null);
Template.errorz.error = function () {
    return Session.get("createError");
};




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
    },
    addPost: function(postText,postDate,postAuthor,postTag){
    
    }

});



function focusText(i, val) {
    i.focus();
    i.value = val ? val : "";
    i.select();

};