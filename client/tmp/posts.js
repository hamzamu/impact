//posts.find().observe({
//    added: function (post) {
//        // when 'added' callback fires, add HTML element
//        //$('#posts').append('<p id="io">wwwwwww</p>');
//        //$('#posts').addClass(post._id); 
//        //$('#posts').append('<li id="' + post._id + '">' + post.post + '</li>');
//        //$('#' + post._id ).addClass('magictime swashOut');
////        Meteor.setTimeout(function () {
////            
////        }, 100)
//    },
//    changed: function (post) {
//        // when 'changed' callback fires, modify HTML element's text
//        //$('ul li#' + post._id).text(post.title);
//        $('#' + post._id ).addClass('magictime puffIn');
//    },
//    removed: function(post) {
//    //// when 'removed' callback fires, remove HTML element
//    ////$('ul li#' + post._id).remove();
//    //$('#' + post._id ).addClass('magictime swashOut');
//    $('#' + post._id ).addClass('magictime swashOut');
//    //$('#' + this._id ).addClass('magictime swashOut');
//    }
//});

//test