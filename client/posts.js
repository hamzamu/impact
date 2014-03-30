// get posts to the fron page
Template.posts.posts = function () {
    return posts.find({}, {
        sort: {
            created_at: -1
        }
    });

};





//get user name or profile name
Template.post.helpers({
    username: function () {
        var userid = this.author;
        var username = Meteor.users.findOne({
            _id: userid
        });
        return (username);
    },
    date: function () {
        date = moment(this.created_at).fromNow();
        return date;
    },
    postin: function () {
        var posti = this.post;
        //var replacex = posti.replace(/#(\S*)/g, "<a href='/s/$1'>#$1</a>");
        return posti;

    },
});




// publish from the front page
Session.set('adding_category', false);
Template.main.new_cat = function () {
    return Session.equals('adding_category', true);
};



// editing a post

Session.setDefault('editing_listname', null);

Template.post.editing = function () {
    return Session.equals('editing_listname', this._id);
};

Template.main.events({
    'click #btnNewCat': function (e, t) {
        Session.set('adding_category', true);
        Meteor.flush();
        $("#add-post-front").focus();

    },


    'click #newpostclose': function (e, t) {
        $("#add-post-front").slideUp();
        Meteor.setTimeout(function () {
            Session.set('adding_category', false);
        }, 500)
    },


    //add post
    'keyup #add-post-front': function (e, t) {
        if (e.which === 13) {
            var catVal = String(e.target.value || "");
            if (catVal) {
                if (Meteor.userId()) {

                    posts.insert({
                        post: catVal,
                        created_at: new Date(),
                        //created_at: new Date().getTime(),
                        //user_id: Meteor.user()._id
                        //author : Meteor.user()._id
                        author: Meteor.userId(),
                    });
                    //$('#add-post').fadeOut();
                    $("#add-post-front").slideUp("slow");
                    Meteor.setTimeout(function () {
                        Session.set('adding_category', false);
                    }, 500)
                    //$(event.target).slideUp('slow');
                    //$('#posts' + event.currentTarget.id).slideUp('slow');
                    //$(this._id).slideUp('slow');
                    //$( "#posts:first" ).css( "font-style", "italic" );
                    //$( ".post" ).first().css( "background-color", "red" );
                } else { //if the user is not logged in
                    //throw new Meteor.Error(422, 'Please provide a Last Name');
                    Session.set('adding_category', false);
                    Session.set("createError", "You have to login to add posts");
                    Meteor.setTimeout(function () {
                        $('#error').fadeOut();
                    }, 3000) // working
                    //Meteor.setTimeout(function() {$("#error").css({display:"none"});}, 1000) // working


                }
            }
        }
        if (e.which === 27) {

            $("#add-post-front").slideUp();
            Meteor.setTimeout(function () {
                Session.set('adding_category', false);
            }, 500)

        }

    },

});
//home page post events
Template.post.events({





    'click .delete-link': function () {
        //if (confirm('Are you sure you want to remove this.')) {
        //(confirm('are you sure you want to leave?'))  {
        //$(this._id).fadeOut().fadeIn();
        posts.remove(this._id);
        //}
        //}
    },


    //edit open session to edit 
    'click  .edit': function (e, t) { // start editing list name
        Session.set('editing_listname', this._id);

        Meteor.flush();
        $('.edit_post').focus();


    },

    // edit in place 
    'keyup .list-name-input': function (e, t) {
        if (e.which === 13) {
            var catVal = String(e.target.value || "");
            posts.update(this._id, {
                $set: {
                    post: catVal
                }
            });
            Session.set('editing_listname', null);
        }

        if (e.which === 27) {
            Session.set('editing_listname', false);
        }

    },

});