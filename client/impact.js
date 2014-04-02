posts = new Meteor.Collection("posts");

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

//~ Meteor.autosubscribe(function(){
//~ posts.find().observe({
//~ added: function(item){
//~ setTimeout("$('.post').fadeIn('slow')",10)
//~ }
//~ });
//~ });

//~ Meteor.autosubscribe(function() {
//~ posts.find().observe({
//~ added: function(item){
//~ alert(item.status);
//~ }
//~ });
//~ });


//Template.page.rendered = function () {
//$('.navbar').localScroll({hash:true, offset: {top: 0},duration: 800, easing:'easeInOutExpo'});
//}


//~ Template.canvmenu.rendered = function() {
//~ $("#my-menu").mmenu({
//~ classes: "mm-navy",
//~ //classes: "mm-slide mm-light ",
//~ //classes: "mm-zoom-page"
//~ //classes: "mm-slide-right",
//~ //classes: "mm-fullscreen"
//~ //modal : true
//~ //searchfield: true,
//~
//~ });
//~ $("#tooltip-1").mmenu({
//~ // mm-bordeau mm-light mm-dark mm-navy mm-army
//~ classes:" mm-light",
//~ modal : true,
//~ position:'bottom',
//~ });
//~
//~ $("#close").click(function(){
//~ $("#tooltip-1").trigger("close");
//~ });

//~ };

//~ Template.posts.authorx = function () {
//~ return Meteor.users.findOne({fields: {_id: posts.author}});
//~
//~ };


//~ Template.posts.rendered = function () {
//~ //if (Session.equals('selected', this.data._id))
//~ $(this.firstNode).fadeOut().fadeIn();
//~
//~ };
//Template.posts.created = functcion () {
//Template.posts.rendered = function () {
//if (Session.equals('selected', this.data._id))
//$(this.firstNode).fadeOut().fadeIn();

//};


// junk test

Template.main.open = function () {
    if (Session.get('open')) {
        return 'open';
    }
};

Template.main.events({
    'click #openi': function (e, t) {
        $('body').addClass('stop-scrolling');
        $("#tooltip").fadeToggle("fast", "linear");
        $('#search').focus();
    },
    'click #closei': function (e, t) {

        $("#tooltip").fadeToggle("fast", "linear");
        Meteor.setTimeout(function () {
            $('body').removeClass('stop-scrolling');
        }, 100)

    },
    'keyup #search': function (e, t) {
        if (e.which === 13) {
            $("#tooltip").fadeToggle("fast", "linear");
            var val = $('#search').val('');
            Meteor.setTimeout(function () {
                $('body').removeClass('stop-scrolling');
            }, 100)
            var param = val ;
            Session.set('SearchQ',val);
            Router.go('/s');
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