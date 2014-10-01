Template.profile.helpers({
    username: function () {
        return Meteor.user().username
    },
    email: function () {
        return Meteor.user().emails[0].address
    },
    //extraname : function() {return Meteir},
    lastsposts: function () {
        //var author = Meteor.user()._id;
        return posts.find({
            author: Meteor.userId()
        }, {
            sort: {
                created_at: -1
            }
        });
    },
    fbprofile: function () {
        if (Meteor.user().services.facebook) {
            return "http://graph.facebook.com/" + Meteor.user().services.facebook.id + "/picture/?type=square";
        }
    },
});


Template.user_profile.helpers({
    //     usernamex: function() {
    //         
    //         Meteor.userId();
    //         console.log(this);
    //     },
    //    username: function () {
    //        var userid = _id ;
    //        var username = Meteor.users.findOne({
    //            _id: userid
    //        }).username;
    //        return (username);
    //    },

    lastsposts: function () {
        //var author = Meteor.user()._id;
        return posts.find({
            author: this._id
        }, {
            sort: {
                created_at: -1
            }
        });
    },
    fbprofile: function () {
        var userb = Meteor.users.findOne(
                this._id
            );
        
        var box = userb.profile.username
            //return "http://graph.facebook.com/" + this._id + "/picture/?type=large";
        return box;
    },


});