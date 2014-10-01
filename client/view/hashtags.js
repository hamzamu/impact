Template.sidebarnav.hashlist = function () {
    return tags.find({});
}

Template.sidebarnav.helpers({
    tagout: function () {
        var tag = this.tag;
        var replacex = tag.replace(/#(\S*)/ig, "$1");
        return replacex;
    }

})

Template.sidebarnav.events({
    'click .taglink': function (e, t) {
        var hashtag = $(e.target).attr("alt");
        Session.set('hashtag', hashtag);
        Meteor.call('resetPostsNo');

    },
})