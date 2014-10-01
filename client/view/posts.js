// get posts to the fron page
//Template.posts.posts = function () {
//    return posts.find({}, {
//        sort: {
//            created_at: -1
//        }
//    });
//
//};






Template.postSingle.rendered = function () {
    var $item = $(this.find('.post'));
    Meteor.defer(function () {
        //$item.addClass('magictime  swashIn ');
        $item.addClass('animated fadeInDown');
        //$item.fadeIn("slow");
        var yregex = /(?:http:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/;
        $('.embed').val().replace(yregex, '<iframe width="490" height="345" src="http://www.youtube.com/embed/$1" frameborder="0" allowfullscreen></iframe>');
    });
    
    (function(d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) return;
          js = d.createElement(s); js.id = id;
          js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=608515702536335";
          fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    
    
    
    

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
    
    ownPost : function(){
    
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

    
    
    postintext: function(){


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
        var regix1 =  /(https:)\/\/?(www.)(facebook.com)\/([a-zA-Z0-9.]*)\/(posts)\/([0-9.]*)/;
        var replacex = post.replace(regix1, '<div class="fb-post" data-href="https://www.facebook.com/$4/posts/$6" data-width="490"></div> ');        
        return replacex;

    },
      
    ombed: function () {
    var post = this.post;
        
        var yregex = /(?:http:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/gim;
        var fkregex =  /(https:)\/\/?(www.)(facebook.com)\/([a-zA-Z0-9.]*)\/(posts)\/([0-9.]*)/;

       if (post.match(yregex))
           var replacexy = post.match(yregex);
            var replacex = replacexy.join(" ").replace(yregex, '<iframe width="490" height="345" src="http://www.youtube.com/embed/$1" frameborder="0" allowfullscreen></iframe>');
           //var replacex = post.replace(yregex, '<iframe width="490" height="345" src="http://www.youtube.com/embed/$1" frameborder="0" allowfullscreen></iframe>').split(" ");
           
        
        if (post.match(fkregex))
            var replacex = post.replace(fkregex, '<div class="fb-post" data-href="https://www.facebook.com/$4/posts/$6" data-width="490"></div> '); 
        
        
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
            var catVal = String(e.target.value || "");
            if (catVal) {
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
                    });
                    
                    
                var yregex = /((?:http:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+))/gim;
               

               //if (postText.match(yregex))
                   //var replacexy = postText.match(yregex);
                    var replacex = postText.replace(yregex, '<p>$1 <p>&nbsp;&nbsp;&nbsp;');
                   //var replacex = post.replace(yregex, '<iframe width="490" height="345" src="http://www.youtube.com/embed/$1" frameborder="0" allowfullscreen></iframe>').split(" ");                    
                    
                    posts.insert({
                        //post: replacex,
                        post: catVal,
                        created_at: new Date(),
                        tags: arr,
                        //created_at: new Date().getTime(),
                        //user_id: Meteor.user()._id
                        //author : Meteor.user()._id
                        author: Meteor.userId(),
                        image: Session.get('uploadedfileId'),
                    });


                    Session.set('uploadedfileId', null);

                    //post._id = posts.insert(post);
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
                    //Session.set("createError", "You have to login to add posts");
                    Meteor.call('createErrorMsg', 'You have to login to add posts');

                    // working
                    //Meteor.setTimeout(function() {$("#error").css({display:"none"});}, 1000) // working


                }
            }
        }
        if (e.which === 27) {

            $("#add-post-front").slideUp();
            Meteor.setTimeout(function () {
                Session.set('adding_category', false);
            }, 500);
            
             Images.remove(Session.get('uploadedfileId')); 

        }

    },


    "change .myFileInput": function (event, template) {
        FS.Utility.eachFile(event, function (file) {

            Images.insert(file, function (err, fileObj) {
                //Inserted new doc with ID fileObj._id, and
                Session.set('uploadedfileId', fileObj.id);
                if (err)
                    Notifications.warn('Hey ya !', 'add an image fie please');
                else
                    Session.set('uploadedfileId', fileObj._id);
            });
        });
    },


});




//    Template.header_home.uploadedImage = function () {
//        return Images.files.find({
//            _id: Session.get('uploadedfileId')
//        }).fetch();
//
//    };

    Template.header_home.files = function() {
     //return Images.files.find({_id : Session.get('uploadedfileId')}).fetch();
     return Images.files.find({_id : Session.get('uploadedfileId')}).fetch();
        var oldFile = Files.findOne({_id : Session.get('uploadedfileId')});
        var newFile = oldFile.copy({sourceStore: "thumbs"}, metadataObj);
        return   newFile ;

    };




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