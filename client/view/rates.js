
Template.saved.helpers({

    postx: function () {
        var postID = this.post;
        return posts.find({
            _id: postID
        }, {
            limit: 1
        });
    },

    rates : function (){
     return rates.find({}, {
        sort: {
            _id: -1
        }
    });
    },

    files: function () {
        var postID = this.post;
        return Images.files.find({
            post: postID
        }).fetch();
    },


})
