posts = new Meteor.Collection("posts");


	Meteor.autosubscribe(function () {
	  Meteor.subscribe('posts'); 
	});
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
	
	Template.posts.rendered = function(){
		var $this = $(this.firstNode);
		$this.addClass("invisible");
		  Meteor.defer(function() {
    //instance.currentPosition = newPosition;
    // bring element back to its new original position
          $this.css("top",  "0px").removeClass("invisible");
          $.fadeOut().fadeIn();
		})
	
	}
		
		Template.main.events({
		'click #btnNewCat': function (e, t) {
		Session.set('adding_category', true);
		Meteor.flush();		
		$('#add-post').fadeIn("slow");	
		focusText(t.find("#add-post"));
		Meteor.flush();
		}, 
		'click #newpostclose': function (e, t) {
			

			Session.set('adding_category', false);
			Meteor.flush();
			
		}, 'click #clickme': function() { 
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
					posts.update(this._id, {$set: {status:catVal}});
					
				Session.set('editing_listname', null);
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
			posts.insert({
				status:catVal,
				created_at: new Date(),
				//user_id: Meteor.user()._id
				});
			Session.set('adding_category', false);
			//$(event.target).slideUp('slow');
			 //$('#posts' + event.currentTarget.id).slideUp('slow');			
			//$(this._id).slideUp('slow');
			//$( "#posts:first" ).css( "font-style", "italic" );
			//$( ".post" ).first().css( "background-color", "red" );
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






