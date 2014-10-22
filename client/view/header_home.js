// publish from the front page
Session.set('adding_category', false);


Template.header_home.helpers({
  new_cat:function(){
    return Session.equals('adding_category', true);
  },
  postx:function(){
    return Session.equals('textareax', true);
  },
  files :function () {
      //return Images.files.find({_id : Session.get('uploadedfileId')}).fetch();
      return Images.files.find({
          _id: Session.get('uploadedfileId')
      }).fetch();
      var oldFile = Files.findOne({
          _id: Session.get('uploadedfileId')
      });
      var newFile = oldFile.copy({
          sourceStore: "thumbs"
      }, metadataObj);
      return newFile;

  },
});



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

            var testo = catVal.replace(/(http[^ ]+)/g, '$1\n');

            if (catVal) {
                if (Meteor.userId()) {
                    var postText = catVal.toLowerCase();
                    var tagslist = postText.split(' ');
                    var arr = [];
                    $.each(tagslist, function (i, val) {
                        if (tagslist[i].indexOf('#') == 0) {

                            arr.push(tagslist[i]);
                            var tag = tags.findOne({
                                tag: tagslist[i]
                            });

                            if (!tag) {

                                var res = tagslist[i].toLowerCase();
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



                    var postId = posts.insert({
                        //post: replacex,
                        //post: catVal,
                        post: testo,
                        created_at: new Date(),
                        tags: arr,
                        //created_at: new Date().getTime(),
                        //user_id: Meteor.user()._id
                        //author : Meteor.user()._id
                        author: Meteor.userId(),
                        image: Session.get('uploadedfileId'),
                    });

                    var post = {
                        post: testo,
                        created_at: new Date(),
                        tags: arr,
                        author: Meteor.userId(),
                        image: Session.get('uploadedfileId'),

                    }
                    Meteor.call('post', post, function (error) {
                        //                        if (error)
                        //                            return alert(error.reason);

                        //                        Router.go('postPage', {
                        //                            _id: id
                        //                        });
                    });


                    //                    Meteor.call('post', post, function (error) {
                    //                    });


                    Images.update(Session.get('uploadedfileId'), {
                        $set: {
                            post: postId
                        }
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

        if (e.which === 32) {

            var post = $('#add-post-front').val();
            $("#add-post-front").val().replace(/(http[^ ]+)/g, "$1 &#10;");





        }

    },


    "change .myFileInput": function (event, template) {
        FS.Utility.eachFile(event, function (file) {

            Images.insert(file, function (err, fileObj) {
                //Inserted new doc with ID fileObj._id, and
                Session.set('uploadedfileId', fileObj._id);
                if (err)
                    Notifications.warn('Hey ya !', 'add an image fie please');
                else
                    Session.set('uploadedfileId', fileObj._id);
            });
        });
    },


});


