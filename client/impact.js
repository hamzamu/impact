Accounts.ui.config({
    passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
});






Template.users.helpers({
    // check if user is an admin
    isAdminUser: function () {
        return Roles.userIsInRole(Meteor.user(), ['admin']);
    }
})


Meteor.subscribe('posts');
Meteor.subscribe("directory");
Meteor.subscribe("rates");
Meteor.subscribe("comments");



Session.setDefault('createError', null);
Template.errorz.error = function () {
    return Session.get("createError");
};


//var clearError = function(){
//                    Meteor.setTimeout(function () {
//                        $('#error').fadeOut();
//                        Session.set('createError', null);
//                    }, 1000)
//};

Meteor.methods({
    createErrorMsg: function (msg) {
        Session.set('createError', msg);
        $('#error').css('display', 'block');


    }

});





//Meteor.autosubscribe(function () {
//    posts.find().observe({
//        added: function (item) {
//          var $item = $(item.find('.post'));
//           $item.addClass('magictime swashIn');
//        },
//        removed: function (item){
//        	$('.post ' ).addClass('magictime swashIn');
//        }
//    });
//});




//Template.page.rendered = function () {
//$('.navbar').localScroll({hash:true, offset: {top: 0},duration: 800, easing:'easeInOutExpo'});
//}






//Template.posts.created = functcion () {
//Template.posts.rendered = function () {
//if (Session.equals('selected', this.data._id))
//$(this.firstNode).fadeOut().fadeIn();

//};




//~ Template.posts.rendered = function(){
//~ var $this = $(this.firstNode);
//~ $this.addClass("invisible");
//~ Meteor.defer(function() {
//~ //instance.currentPosition = newPosition;
//~ // bring element back to its new original position
//~ $this.css("top",  "0px").removeClass("invisible");
//~ $.fadeOut().fadeIn();
//~ })
//~
//~ }


function focusText(i, val) {
    i.focus();
    i.value = val ? val : "";
    i.select();

};