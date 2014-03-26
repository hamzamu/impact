posts = new Meteor.Collection("posts");



if (Meteor.isClient) {
	
	Accounts.ui.config({
	passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
	});
	
	//~ Meteor.Router.add({
	  //~ '/l': 'login',
	  //~ '/register': 'register',
	  //~ '/admin': 'admin',
	  //~ '/map': 'map',
	  //~ '/admin_all': 'admin_all',
	  //~ '/adminold': 'adminx',
	  //~ '/admin/users': 'admin_user',
	  //~ //'/admin/users': 'users',
	  //~ '/main': 'page',
	  //~ '/': 'page',	
	  //~ '*': '404'
	//~ });
	//~ 
	//~ 
	//~ Meteor.Router.filters({
		//~ 'checkLoggedIn': function(page) {
			//~ if (Meteor.loggingIn()) {
				//~ return 'loading';
			//~ } else if (Meteor.user()) {
				//~ return 'page';
			//~ } else {
				//~ return 'login';
				//~ 
			//~ }
		//~ }
	//~ });
	//~ 
	//~ Meteor.Router.filter('checkLoggedIn', {
		//~ except: ['page','admin','register']
	//~ });
	//~ 
	
	
	Template.page.events({                                                                                                            

		});


	Session.setDefault('createError', false);
	Template.main.error = function () {
	  return Session.get("createError");
	};

	
	Meteor.subscribe('posts');
	Meteor.subscribe("directory");
	
  //~ Meteor.autosubscribe(function(){
    //~ posts.find().observe({
      //~ added: function(item){
        //~ setTimeout("$('.post').fadeIn('slow')",10)
      //~ }
    //~ });
  //~ });  
  
	//~ Meteor.autosubscribe(function() {
	  //~ posts.find().observe({
		//~ added: function(item){ 
		  //~ alert(item.status);
		//~ }
	  //~ });
	//~ });  
  
  	Template.posts.posts = function () {
		return posts.find({}, {sort: {created_at: -1}});
		
	};
  	Template.posts.users = function () {
		return Meteor.users.find({});
		
	};
	
	
	  Template.login.events({

		'click #btnLogOut': function (event, template) {
				if (Meteor.userId()) {
				  Meteor.logout();
				} else {
				  var userName     = template.find('#username').value,
					userPassword = template.find('#password').value;
				  Meteor.loginWithPassword(userName, userPassword, function (error) {
					  Router.go('/')
					if (error) {
					  console.log(error);
					}
				  });
				}
			  }
		
	  });
	  
	  Template.page.events({
		  'click #loginl': function(){
			  Router.go('/login')

			  },
			'click #logout': function () {      

			   Meteor.logout();
			   Router.go('/')


			}
		  
		  });
	
	
	Template.posts.helpers({
	 username: function() {	   
	   var userid = this.author;	  	
	   var username = Meteor.users.findOne({_id: userid});
	   return (username);
	 },
	    date: function() {
        date1 = moment(this.created_at).fromNow();
        date2 = moment(this.created_at).format("MMM Do YY");
        date = date1 + ' @ ' + date2
        return date1;
    },
	});
	
	Template.page.rendered = function(){
		$('.navbar').localScroll({hash:true, offset: {top: 0},duration: 800, easing:'easeInOutExpo'});
		}
	
	
	Template.canvmenu.rendered = function() {
	    $("#my-menu").mmenu({
			classes: "mm-navy",
			//classes: "mm-slide mm-light ",
			//classes: "mm-zoom-page"
			//classes: "mm-slide-right",
			//classes: "mm-fullscreen"
			//modal : true
			//searchfield: true,
					
			});
	    $("#tooltip-1").mmenu({
			// mm-bordeau mm-light mm-dark mm-navy mm-army
			classes:" mm-light",		
			modal : true,
			position:'bottom',
			});
		
		$("#close").click(function(){
		   $("#tooltip-1").trigger("close");
		  });

	};
	
  	//~ Template.posts.authorx = function () {
		//~ return Meteor.users.findOne({fields: {_id: posts.author}});
		//~ 
	//~ };

	Session.set('adding_category', false);
	Template.main.new_cat = function () {
		return Session.equals('adding_category',true);
	};	
	//~ Template.posts.rendered = function () {
	  //~ //if (Session.equals('selected', this.data._id))
		//~ $(this.firstNode).fadeOut().fadeIn();
		//~ 
	//~ };	
	//Template.posts.created = function () {
	//Template.posts.rendered = function () {
	  //if (Session.equals('selected', this.data._id))
		//$(this.firstNode).fadeOut().fadeIn();
		
	//};
	
	Template.main.open = function() { if (Session.get('open')) { return 'open'; }};	
	Template.posts.deleted = function() {		
		return Session.equals('deleted', this._id) ? "deleted" : '' ;
	};	

	Template.posts.editing = function () {
		return Session.equals('editing_listname', this._id);
	};

		
		 
	Session.setDefault('editing_listname', null);
	
	//~ Template.posts.rendered = function(){
		//~ var $this = $(this.firstNode);
		//~ $this.addClass("invisible");
		  //~ Meteor.defer(function() {
    //~ //instance.currentPosition = newPosition;
    //~ // bring element back to its new original position
          //~ $this.css("top",  "0px").removeClass("invisible");
          //~ $.fadeOut().fadeIn();
		//~ })
	//~ 
	//~ }
		
		Template.main.events({
		'click #btnNewCat': function (e, t) {
		Session.set('adding_category', true);
		Meteor.flush();		
		$('#add-post').fadeIn("slow");	
		focusText(t.find("#add-post"));
		Session.set('createError', false);
		Meteor.flush();
		}, 
		
		
		'click #newpostclose': function (e, t) {
			Session.set('adding_category', false);
			Meteor.flush();
			
		}, 
		'click #close': function () {
			$('#tooltip-1').trigger( 'close' );			
		}, 
		
		'click #clickme': function() { 
			Session.set('open', true);
			$('#clickme').fadeOut();	 
		},
		
			'click .delete-link': function() {
			//if (confirm('Are you sure you want to remove this.')) {
				//if (confirm('are you sure you want to leave?'))  { 
				 //$(this._id).fadeOut().fadeIn();
				 posts.remove(this._id);
				 Meteor.flush();
			  //}
			//}				
		  },
		  
		  		  
		  'click  .edit': function (e, t) { // start editing list name
			Session.set('editing_listname', this._id);			
			$('.edit_post').focus();
			//var wi = template.find(".edit_post");	
			//wi.focus();
			Meteor.flush();	
			
		  },
		  
		'keyup .list-name-input': function(e,t){
			 if (e.which === 13){
				var catVal = String(e.target.value || "");					
				posts.update(this._id, {$set: {post:catVal}});					
				Session.set('editing_listname', null);
				Session.set("createError","You Edit this");
				Meteor.setTimeout(function() {$('#error').fadeOut();}, 3000)			

			}
			
			if (e.which === 27)
			{
				Session.set('editing_listname', false);
			}
			  
		 },	
		 
		 	
		'keyup #add-post': function (e,t){
		if (e.which === 13)
		{
			var catVal = String(e.target.value || "");
			if (catVal)
			{
				if (Meteor.userId()) {
				
				posts.insert({
					post:catVal,
					created_at: new Date(),
					//created_at: new Date().getTime(),
					//user_id: Meteor.user()._id
					//author : Meteor.user()._id
					author : Meteor.userId(),
					});
				Session.set('adding_category', false);
				//$(event.target).slideUp('slow');
				 //$('#posts' + event.currentTarget.id).slideUp('slow');			
				//$(this._id).slideUp('slow');
				//$( "#posts:first" ).css( "font-style", "italic" );
				//$( ".post" ).first().css( "background-color", "red" );
				}else{ //if the user is not logged in
					//throw new Meteor.Error(422, 'Please provide a Last Name');
					Session.set('adding_category', false);	
					Session.set("createError","You have to login to add posts");			
					Meteor.setTimeout(function() {$('#error').fadeOut();}, 3000) // working				
					//Meteor.setTimeout(function() {$("#error").css({display:"none"});}, 1000) // working
					

					}
			}
		}
		if (e.which === 27)
		{
				Session.set('adding_category', false);
				
			}
		
		},
	});
	
function focusText(i,val) {
    i.focus();
    i.value = val ? val : "";
    i.select();

};

};


if (Meteor.isServer) {

	Meteor.publish('posts', function () {
	   posts.find({});
	});
	

	Meteor.publish("allUsers", function () {
	  return Meteor.users.find({});
	});	
	
	
  Meteor.startup(function () {
    // code to run on server at startup
  });
}





