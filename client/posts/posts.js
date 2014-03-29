// get posts to the fron page
Template.postlist.posts = function () {
//     return Posts.find({}, {sort: {created_at: -1}});
//     Sorted during subscription in router
    return Posts.find();
};

// get user name or profile name
Template.posts.helpers({
    username: function() {	   
        var userid = this.author;	  	
        var username = Meteor.users.findOne({_id: userid});
        return (username);
    },
    date: function() {
        // date1 = moment(this.created_at).fromNow();
        // date2 = moment(this.created_at).format("MMM Do YY");
        // date = date1 + ' @ ' + date2
        // return date1;
        return false;
    },
});

// publish from the front page 
Session.set('adding_category', false);
Template.home.new_cat = function () {
    return Session.equals('adding_category',true);
};

// editing a post 
Session.setDefault('editing_listname', null);
Template.posts.editing = function () {
    return Session.equals('editing_listname', this._id);
};

//home page post events
Template.home.events({
    'click #btnNewCat': function (e, t) {
        Session.set('adding_category', true);
        Meteor.flush();		
        $('#add-post').fadeIn("slow");	
        focusText(t.find("#add-post"));
        Session.set('createError', false);
        Meteor.flush();
    }, 
    'click #newpostclose': function (e, t) {
        Session.set('adding_category', false);
        Meteor.flush();
    }, 
    'click #close': function () {
        $('#tooltip-1').trigger( 'close' );			
    }, 
    'click #clickme': function() { 
        Session.set('open', true);
        $('#clickme').fadeOut();	 
    },
    'click .delete-link': function() {
        //if (confirm('Are you sure you want to remove this.')) {
        //if (confirm('are you sure you want to leave?'))  { 
        //$(this._id).fadeOut().fadeIn();
        Posts.remove(this._id);
        Meteor.flush();
        //}
        //}				
    },
    'click  .edit': function (e, t) { // start editing list name
        Session.set('editing_listname', this._id);			
        $('.edit_post').focus();
        //var wi = template.find(".edit_post");	
        //wi.focus();
        Meteor.flush();	
    },
    'keyup .list-name-input': function(e,t){
        if (e.which === 13){
            var catVal = String(e.target.value || "");					
            Posts.update(this._id, {$set: {post:catVal}});					
            Session.set('editing_listname', null);
            Session.set("createError","You Edit this");
            Meteor.setTimeout(function() {$('#error').fadeOut();}, 3000)			
        }
        if (e.which === 27)
        {
            Session.set('editing_listname', false);
        }
    },	
    'keyup #add-post': function (e,t){
        if (e.which === 13)
        {
            var catVal = String(e.target.value || "");
            if (catVal)
            {
                if (Meteor.userId()) {
                    Posts.insert({
                        post:catVal,
                        created_at: new Date(),
                        //created_at: new Date().getTime(),
                        //user_id: Meteor.user()._id
                        //author : Meteor.user()._id
                        author : Meteor.userId(),
                    });
                    Session.set('adding_category', false);
                    //$(event.target).slideUp('slow');
                    //$('#posts' + event.currentTarget.id).slideUp('slow');			
                    //$(this._id).slideUp('slow');
                    //$( "#posts:first" ).css( "font-style", "italic" );
                    //$( ".post" ).first().css( "background-color", "red" );
                }else{ //if the user is not logged in
                    //throw new Meteor.Error(422, 'Please provide a Last Name');
                    Session.set('adding_category', false);	
                    Session.set("createError","You have to login to add posts");			
                    Meteor.setTimeout(function() {$('#error').fadeOut();}, 3000) // working				
                        //Meteor.setTimeout(function() {$("#error").css({display:"none"});}, 1000) // working
                }
            }
        }
        if (e.which === 27)
        {
            Session.set('adding_category', false);
        }
    },
});
