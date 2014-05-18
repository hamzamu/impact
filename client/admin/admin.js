	Session.setDefault('admin', 'Dashboard');
	Session.setDefault('depadge', 'Dashboard');
	Session.setDefault('editing_listname', null);

	Meteor.subscribe("allUserData");


	Template.posts_admin.editing = function () {
	    return Session.equals('editing_listname', this._id);
	};

	Template.posts_admin.helpers({
	    username: function () {
	        var userid = this.author;
	        var username = Meteor.users.findOne({
	            _id: userid
	        });
	        return (username);
	    },
	    date: function () {
	        date1 = moment(this.created_at).fromNow();
	        date2 = moment(this.created_at).format("MMM Do YY");
	        date = date1 + ' @ ' + date2
	        return date1;
	    },
	});

	 //~ Template.admin.rendered = function() {
	 //~ $('a[rel=tooltip]').tooltip()
	 //~ };


	Template.posts_admin.posts = function () {
	    return posts.find({}, {
	        sort: {
	            created_at: -1
	        }
	    });
	};




	Template.admin_nav.events({
	    'click #menu-toggle': function (e) {
	        e.preventDefault();
	        $("#wrapper").toggleClass("active");
	    }

	})


	 Template.posts_admin.events({

	    'click .confirm ': function () { // start editing list name
	        //Session.set('editing_listname', this._id);
	        Deps.flush(); // force DOM redraw, so we can focus the edit field
	        posts.update(this._id, {
	            $set: {
	                confirmed: '1'
	            }
	        });
	    },
	    'click .unconfirm ': function () { // start editing list name
	        //Session.set('editing_listname', this._id);
	        Deps.flush(); // force DOM redraw, so we can focus the edit field
	        posts.update(this._id, {
	            $set: {
	                confirmed: ''
	            }
	        });
	    },
	    'click .social ': function () { // start editing list name
	        //Session.set('editing_listname', this._id);
	        Deps.flush(); // force DOM redraw, so we can focus the edit field
	        posts.update(this._id, {
	            $set: {
	                social: '1'
	            }
	        });
	    },
	    'click .unsocial ': function () { // start editing list name
	        //Session.set('editing_listname', this._id);
	        Deps.flush(); // force DOM redraw, so we can focus the edit field
	        posts.update(this._id, {
	            $set: {
	                social: ''
	            }
	        });
	    },
	    'click .eyewitness ': function () { // start editing list name
	        //Session.set('editing_listname', this._id);
	        Deps.flush(); // force DOM redraw, so we can focus the edit field
	        posts.update(this._id, {
	            $set: {
	                eyewitness: '1'
	            }
	        });
	    },
	    'click .uneyewitness ': function () { // start editing list name
	        //Session.set('editing_listname', this._id);
	        Deps.flush(); // force DOM redraw, so we can focus the edit field
	        posts.update(this._id, {
	            $set: {
	                eyewitness: ''
	            }
	        });
	    },
	    'click .publish ': function () { // start editing list name
	        //Session.set('editing_listname', this._id);
	        Deps.flush(); // force DOM redraw, so we can focus the edit field
	        posts.update(this._id, {
	            $set: {
	                published: '1'
	            }
	        });
	    },
	    'click .official ': function () { // start editing list name
	        //Session.set('editing_listname', this._id);
	        Deps.flush(); // force DOM redraw, so we can focus the edit field
	        posts.update(this._id, {
	            $set: {
	                official: '1'
	            }
	        });
	    },
	    'click .unofficial ': function () { // start editing list name
	        //Session.set('editing_listname', this._id);
	        Deps.flush(); // force DOM redraw, so we can focus the edit field
	        posts.update(this._id, {
	            $set: {
	                official: ''
	            }
	        });
	    },
	    'click .media ': function () { // start editing list name
	        //Session.set('editing_listname', this._id);
	        Deps.flush(); // force DOM redraw, so we can focus the edit field
	        posts.update(this._id, {
	            $set: {
	                media: '1'
	            }
	        });
	    },
	    'click .agancies ': function () { // start editing list name
	        //Session.set('editing_listname', this._id);
	        Deps.flush(); // force DOM redraw, so we can focus the edit field
	        posts.update(this._id, {
	            $set: {
	                agancies: '1'
	            }
	        });
	    },
	    'click .unagancies ': function () { // start editing list name
	        //Session.set('editing_listname', this._id);
	        Deps.flush(); // force DOM redraw, so we can focus the edit field
	        posts.update(this._id, {
	            $set: {
	                agancies: ''
	            }
	        });
	    },
	    'click .publish ': function () { // start editing list name
	        //Session.set('editing_listname', this._id);
	        Deps.flush(); // force DOM redraw, so we can focus the edit field
	        posts.update(this._id, {
	            $set: {
	                publish: '1'
	            }
	        });
	    },
	    'click .unpublish ': function () { // start editing list name
	        //Session.set('editing_listname', this._id);
	        Deps.flush(); // force DOM redraw, so we can focus the edit field
	        posts.update(this._id, {
	            $set: {
	                publish: ''
	            }
	        });
	    },


	    'click  .edit': function (e, t) { // start editing list name
	        Session.set('editing_listname', this._id);
	        $('.edit_post').focus();
	        //var wi = template.find(".edit_post");
	        //wi.focus();
	        Meteor.flush();

	    },

	    'click .delete-link': function () {
	        //if (confirm('Are you sure you want to remove this.')) {
	        //if (confirm('are you sure you want to leave?'))  {
	        //$(this._id).fadeOut().fadeIn();
	        posts.remove(this._id);
	        Meteor.flush();
	        //}
	        //}
	    },


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

	    'keyup #add_new_post': function (e, t) {
	        if (e.which == 13) {
	            //var post = tmpl.find('#add_new_post').value;
	            var post = $(e.target).val();
	            //var post =String(e.target.value || "");
	            //var post = tmpl.find('#add_new_post').value;


	            if (post.length > 10)
	                posts.insert({
	                    post: post,
	                    created_at: new Date(),
	                });
	            $(e.target).val("").select().focus();
	        }
	        if (post.length < 0)
	            Meteor.call('createErrorMsg', 'You have to login to add posts');





	        if (e.which == 27) {
	            $('#add_new_post').val("").focusout();
	        }
	    },

	    //~ $("#menu-toggle").click(function(e) {
	    //~ e.preventDefault();
	    //~ $("#wrapper").toggleClass("active");
	    //~ });


	});