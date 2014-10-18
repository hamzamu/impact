Template.hashtag.hasthag = function () {
    return Session.get('hashtag');
};

Template.searchTest.searchQ = function () {
    return Session.get('prefix');
};




Template.sidebarnav.helpers({
    tagout: function () {
        var tag = this.tag;
        var replacex = tag.replace(/#(\S*)/ig, "$1");
        return replacex;
    },
    hashlist : function(){
      return tags.find({});

    }

})

Template.sidebarnav.events({
    'click .taglink': function (e, t) {
        var hashtag = $(e.target).attr("alt");
        Session.set('hashtag', hashtag);
        Meteor.call('resetPostsNo');

    },
})
