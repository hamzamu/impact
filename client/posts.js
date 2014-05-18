// get posts to the fron page
Template.posts.posts = function () {
    return posts.find({}, {
        sort: {
            created_at: -1
        }
    });

};






Template.postSingle.rendered = function () {
    var $item = $(this.find('.post'));
    Meteor.defer(function () {
        //$item.addClass('magictime  swashIn ');
        $item.addClass('animated fadeInDown');
        //$item.fadeIn("slow");
    });
}






Template.hashtag.hasthag = function () {
    return Session.get('hashtag');
};

Template.searchTest.searchQ = function () {
    return Session.get('prefix');
};





// publish from the front page
Session.set('adding_category', false);
Template.header_home.new_cat = function () {
    return Session.equals('adding_category', true);
};





// editing a post

Session.setDefault('editing_listname', null);


Template.postSingle.editing = function () {
    return Session.equals('editing_listname', this._id);
};
// editing a post




//get user name or profile name
Template.postSingle.helpers({
    username: function () {
        var userid = this.author;
        var username = Meteor.users.findOne({
            _id: userid
        });
        return (username);
    },
    avatar: function () {
        var userid = this.author;
        var username = Meteor.users.findOne({
            _id: userid
        });
        var avatar = username.avatar;
        return (avatar);
    },
    date: function () {
        date = moment(this.created_at).fromNow();
        //date = moment(this.created_at).format('LL');
        return date;
    },
    postin: function () {
        var posti = this.post;
        var replacex = posti.replace(/#(\S*)/ig, "<a href='/s/$1' class='taglink' alt='$1'>#$1</a>");
        //var replacex = posti.replace(/(#[a-z0-9][a-z0-9\-_]*)/ig, "<a href='/s/$1' class='taglink' alt='$1'>#$1</a>");
        return replacex;

    },

    slug: function () {
        var postxt = this.post;
        var slug = postxt.replace(/\W+/g, '-').toLowerCase();
        return slug;
    },

    numrates: function () {

        return rates.find({
            post: this._id

        }).count();

    },

    iflike: function () {
        var like = rates.findOne({
            post: this._id,
            user: Meteor.userId()
        });
        if (like)
            return 'likeit';
    },


});



//get user name or profile name
Template.postShow.helpers({
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
        var postx = this.post;
        //var replacex = postx.replace(postx, '_');
        return postx;

    },
});


Template.posts.events({

    //    isAdminUser: function () {
    //        return Roles.userIsInRole(Meteor.user(), ['admin']);
    'click #admin': function (e, t) {
        var isAdmin = Roles.userIsInRole(Meteor.user(), ['admin']);
        if (isAdmin) {
            Session.set('createError', 'Ha ha ha');
        }
    }
})

Template.more.events({
    'click #more': function (e, t) {
        Session.set('postsn', Session.get('postsn') + 10);
    }
})

Template.header_home.events({
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
            //var catVal = String(e.target.value || "");
            var catVal = $('#add-post-front').val();

            if (catVal.length > 10) {
                if (Meteor.userId()) {
                    var postText = catVal;
                    var tagslist = postText.split(' ');
                    var arr = [];
                    $.each(tagslist, function (i, val) {
                        if (tagslist[i].indexOf('#') == 0) {
                            arr.push(tagslist[i]);
                            var tag = tags.findOne({
                                tag: tagslist[i]
                            })
                            if (!tag) {
                                tags.insert({
                                    tag: tagslist[i],
                                    count: 1,
                                    dtime: new Date()
                                });
                            } else {
                                tags.update(tag._id, {
                                    $inc: {
                                        count: 1
                                    }
                                }, {
                                    dtime: new Date()
                                });
                            }
                        }
                    })
                    posts.insert({
                        post: catVal,
                        created_at: new Date(),
                        tags: arr,

                        author: Meteor.userId(),
                    });

                    $("#add-post-front").slideUp("slow");
                    Meteor.setTimeout(function () {
                        Session.set('adding_category', false);
                    }, 500)


                    Session.set('adding_category', false);

                    Meteor.call('createErrorMsg', 'You have to login to add posts');


                }
            } else
                Meteor.call('createErrorMsg', 'The post should be more than 10 letters and not empty  ');
            //$(e.target).val("").select().focus();
        }


        if (e.which === 27)

            $("#add-post-front").slideUp();
        Meteor.setTimeout(function () {
            Session.set('adding_category', false);
        }, 500)



    },

});


Meteor.setInterval(function () {
    $('#error').fadeOut();
    Session.set('createError', null);
}, 7000);




//home page post events
Template.postSingle.events({

    'click .delete-link': function () {

        posts.remove(this._id);

    },

    'click .commentshow': function (e, t) {
        Session.set('commentForm', this._id);
        Session.set('commentOpened', 'commentOpened');
        //$(e.target).toggleClass( "marked" );

    },
    //    'click .marked': function () {
    //        $(".commentsbox").slideUp();
    //        Session.set('commentOpened',false);
    //        Meteor.setTimeout(function () {
    //            Session.set('commentForm', false);
    //        }, 1000)
    //
    //
    //    },    


    //edit open session to edit 
    'click  .edit': function (e, t) { // start editing list name
        Session.set('editing_listname', this._id);
        Meteor.flush();
        $('.edit_post').focus();


    },

    'click .rateit': function (e, t) {
        var like = rates.findOne({
            post: this._id,
            user: Meteor.userId()
        });
        if (Meteor.userId() && !like)
            rates.insert({
                user: Meteor.userId(),
                post: this._id
            });

        if (!Meteor.userId()) {
            Session.set("createError", "login to rate");
        }
    },

    'click .taglink': function (e, t) {
        var hashtag = $(e.target).attr("alt");
        Session.set('hashtag', hashtag);
        Meteor.call('resetPostsNo');

    },
    'click .share': function (e, t) {
        $(e.currentTarget).siblings(".sharebox").show().addClass('animated  bounceIn');



    },
    'mouseleave .sharebox': function (e, t) {
        Meteor.setTimeout(function () {
            $(e.currentTarget).addClass('animated  bounceOut');
            //$(e.currentTarget).css('display','none');
        }, 1000);
        Meteor.setTimeout(function () {

            $(e.currentTarget).css('display', 'none');
        }, 2000);

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