

Session.setDefault('createError', null);



Template.errorz.helpers({

  error : function(){

    return Session.get("createError");
  }


});

Meteor.setInterval(function () {
    //$('#error').fadeOut();
    $('#error').addClass('animated fadeInDown');
    Session.set('createError', null);
}, 10000);


function   CreateError(msg){
  return Session.set('createError', msg);
  //$('#error').css('display', 'block');
};

Meteor.methods({
    createErrorMsg: function (msg) {
        Session.set('createError', msg);
        //$('#error').css('display', 'block');
        $('#error').addClass('animated fadeInDown');
    },
//    resetPostsNo: function () {
//        Session.set('postsn', 20);
//    },
//    addPost: function(postText,postDate,postAuthor,postTag){
//
//    }

});
