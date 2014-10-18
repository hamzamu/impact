// comments show
Session.set('commentForm', false);



Template.commentsbox.helpers({
    commentForm : function(){
        return Session.equals('commentForm', this._id);
    }
});
Template.comments.helpers({
    username: function () {
        var userid = this.user;
        var username = Meteor.users.findOne({
            _id: userid
        });
        return (username);
    },
        date: function () {
        date = moment(this.time).fromNow();
        //date = moment(this.created_at).format('LL');
        return date;
    },
      commentsList : function (){
          return comments.find({
              post: this._id
          }, {
              sort: {
                  time: 1
              },
              limit: Session.get('MoreComments')
          });

      }

});




//Template.comments.rendered = function () {
//    //var $item = $(this.find('.post'));
//    Meteor.defer(function () {
//        $('.commentsbox').addClass('magictime  slideUpRetourn ');
//        //$(".commentsbox").slideDown("slow");
//    });
//}

Session.setDefault('MoreComments', 10);

Deps.autorun( function(){
    Meteor.subscribe('comments',Session.get('MoreComments'));
})

Template.comments.events({
    'click #closeComments': function () {
        $(".commentsbox").slideUp();
        Meteor.setTimeout(function () {
            Session.set('commentForm', false);
        }, 1000)


    },
    //    'keyup #add-post-front': function (e, t) {
    'click #addComments': function (e, t) {
        var comment = $('.commentText').val();
        if (comment){
        comments.insert({
            comment: comment,
            post: this._id,
            user: Meteor.userId(),
            time: new Date(),
        });
        }
        $('.commentText').val('');

    },
    'click #clearComment': function () {
        $('.commentText').val('');
    },

    'click .more': function(e,t){
        Session.set('MoreComments', Session.get('MoreComments') + 10);
}

});
