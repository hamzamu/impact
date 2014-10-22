Meteor.subscribe('Images', Session.get('uploadedfileId'));

Template.postSingle.rendered = function () {
    var $item = $(this.find('.post'));
    Meteor.defer(function () {
        //$item.addClass('magictime  swashIn ');
        $item.addClass('animated fadeInDown');
        //$item.fadeIn("slow");
        var yregex = /(?:http:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/;
       // $('.embed').val().replace(yregex, '<iframe width="95%" height="345" src="http://www.youtube.com/embed/$1" frameborder="0" allowfullscreen></iframe>');
    });

    //    Meteor.defer(function () {
    //    (function(d, s, id) {
    //          var js, fjs = d.getElementsByTagName(s)[0];
    //          if (d.getElementById(id)) return;
    //          js = d.createElement(s); js.id = id;
    //          js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=608515702536335";
    //          fjs.parentNode.insertBefore(js, fjs);
    //        }(document, 'script', 'facebook-jssdk'));
    //
    //    });
    //
    //   setTimeout(function() {
    //    (function(d, s, id) {
    //          var js, fjs = d.getElementsByTagName(s)[0];
    //          if (d.getElementById(id)) return;
    //          js = d.createElement(s); js.id = id;
    //          js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=608515702536335";
    //          fjs.parentNode.insertBefore(js, fjs);
    //        }(document, 'script', 'facebook-jssdk'));
    //  }, 0);

    //     (function(d, s, id) {
    //          var js, fjs = d.getElementsByTagName(s)[0];
    //          if (d.getElementById(id)) return;
    //          js = d.createElement(s); js.id = id;
    //          js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=608515702536335";
    //          fjs.parentNode.insertBefore(js, fjs);
    //        }(document, 'script', 'facebook-jssdk'));

}


// editing a post
Session.setDefault('editing_listname', null);

//get user name or profile name
Template.postSingle.helpers({
    username: function () {
        var userid = this.author;
        var username = Meteor.users.findOne({
            _id: userid
        });
        return (username);
    },

    editing : function(){

      return Session.equals('editing_listname', this._id);
    },
    ownPost: function () {

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


        //var replacedText, replacePattern1, replacePattern2, replacePattern3, replacePattern4, replacePattern5, replacePattern6;
        var replacedText, replacePattern1, replacePattern2, replacePattern3, replacePattern4;

        //URLs starting with http://, https://, or ftp://
        replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
        //replacedText = posti.replace(replacePattern1, '<a href="$1" target="_blank">link</a>');
        replacedText = posti.replace(replacePattern1, '');

        //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
        replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
        //replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">link2</a>');
        replacedText = replacedText.replace(replacePattern2, '');

        //Change email addresses to mailto:: links.
        replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
        //replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');
        replacedText = replacedText.replace(replacePattern3, '');


        //Change Hashtags.
        replacePattern4 = /#(\S*)/igm;
        replacedText = replacedText.replace(replacePattern4, "<a href='/s/$1' class='taglink' alt='$1'>#$1</a>");


        //Change Hashtags.
        //        replacePattern5 = /(?:http:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/g;
        //        replacedText = replacedText.replace(replacePattern5, '<iframe width="490" height="345" src="http://www.youtube.com/embed/$1" frameborder="0" allowfullscreen></iframe>');

        //Change Hashtags.

        //        replacePattern6 = /(https:)\/\/?(www.)(facebook.com)\/([a-zA-Z0-9.]*)\/(posts)\/([0-9.]*)/;
        //        replacedText = replacedText.replace(replacePattern6, "");

        return replacedText;






        //var replacex = posti.replace(/#(\S*)/ig, "<a href='/s/$1' class='taglink' alt='$1'>#$1</a>");
        //--old--// var replacex = posti.replace(/(#[a-z0-9][a-z0-9\-_]*)/ig, "<a href='/s/$1' class='taglink' alt='$1'>#$1</a>");
        //replacex = posti.replace(/(?:http:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/g, '<a href="http://youtu.be/$1" >video</a>');
        //return replacex;
    },


    //        postin: function () {
    //        var posti = this.post;
    //        var replacex = posti.replace(/#(\S*)/ig, "<a href='/s/$1' class='taglink' alt='$1'>#$1</a>");
    //        //var replacex = posti.replace(/(#[a-z0-9][a-z0-9\-_]*)/ig, "<a href='/s/$1' class='taglink' alt='$1'>#$1</a>");
    //        //replacex = posti.replace(/(?:http:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/g, '<a href="http://youtu.be/$1" >video</a>');
    //        return replacex;
    //    },
    //



    postintext: function () {


    },

    youtube: function () {
        var post = this.post;

        var replacex, regix1, regix2;
        var regix1 = /(?:http:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/;
        //var matchlink = post.match(regix1);
        var replacex = post.replace(regix1, '<iframe width="490" height="345" src="http://www.youtube.com/embed/$1" frameborder="0" allowfullscreen></iframe>');



        return replacex;

    },

    facebook: function () {
        var post = this.post;

        var replacex, regix1;
        //var matchlink = post.match(regix1);
        var regix1 = /(https:)\/\/?(www.)(facebook.com)\/([a-zA-Z0-9.]*)\/(posts)\/([0-9.]*)/;
        var replacex = post.replace(regix1, '<div class="fb-post" data-href="https://www.facebook.com/$4/posts/$6" data-width="490"></div> ');
        return replacex;

    },

    ombed: function () {
        var post = this.post;

        var yregex = /(?:http:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/gim;
        var fkregex = /(https:)\/\/?(www.)(facebook.com)\/([a-zA-Z0-9.]*)\/(posts)\/([0-9.]*)/gim;

        if (post.match(yregex)) {
            var replacexy = post.match(yregex);
            var replacex = replacexy.join(" ").replace(yregex, '<iframe width="100%" height="345" src="http://www.youtube.com/embed/$1" frameborder="0" allowfullscreen></iframe>');
        }
        //var replacex = post.replace(yregex, '<iframe width="490" height="345" src="http://www.youtube.com/embed/$1" frameborder="0" allowfullscreen></iframe>').split(" ");


        if (post.match(fkregex)) {
            var replacexy = post.match(fkregex);
            var replacex = replacexy.join(" ").replace(fkregex, '<div class="fb-post" data-href="https://www.facebook.com/$4/posts/$6" data-width="490px"></div> ');

        }

        //var matchlink = post.match(regix1);
        //        var regix1 =  /(https:)\/\/?(www.)(facebook.com)\/([a-zA-Z0-9.]*)\/(posts)\/([0-9.]*)/;
        //        var replacex = post.replace(regix1, '<div class="fb-post" data-href="https://www.facebook.com/$4/posts/$6" data-width="490"></div> ');
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

    files: function () {
        var imageId = this.image;
        return Images.files.find({
            _id: imageId
        }).fetch();
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
        // Router.go('/'+ 10);
    }
});

//home page post events
Template.postSingle.events({

    'click .delete-link': function () {

        //posts.remove(this._id);
        var postId = this._id;
        var OwnPost = this.author ;
        var user = Meteor.user();
        if(user === OwnPost )
            Meteor.call('postRemove', postId);
        else
            Meteor.call('createErrorMsg', 'You are not allodddd post U are not an awonser!');
        

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
                saved: new Date(),
                post: this._id
            });

        if (!Meteor.userId()) {
            Session.set("createError", "You have to login to rate and comment");
            //alertify.alert("login to rate");
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
            var testo = catVal.replace(/(http[^ ]+)/g, '$1\n');
            //            var postID = this._id ;

            //            var postEdit = {
            //
            //                post : testo ,
            //                modified_at : new Date(),
            //                editor : Meteor.userId(),
            //            }


            posts.update(this._id, {
                $set: {
                    post: catVal
                }
            }, function (error) {
                if (error)
                    //Meteor.call('createErrorMsg', 'You are not allowed to edit this post !');
                    CreateError('You are not allowed to edit this post !');
            });

            //            Meteor.call ( 'postedit ', postID ,  testo ,function(error){});


            Session.set('editing_listname', null);
        }

        if (e.which === 27) {
            Session.set('editing_listname', false);
        }

    },

});
