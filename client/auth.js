//~ // login template
//~ 
	  //~ Template.login.events({
		  //~ 
		  //~ 
//~ 
//~ 
		//~ 'click #btnLogin': function (event, template) {
				//~ if (Meteor.userId()) {
					//~ Meteor.logout();
				//~ } else {
				  //~ var userName     = template.find('#username').value,
					//~ userPassword = template.find('#password').value;
				  //~ Meteor.loginWithPassword(userName, userPassword, function (error) {
				  //~ Meteor.Router.to("/"); 
					//~ if (error) {
					  //~ console.log(error);
					//~ }
				  //~ });
				//~ }
			  //~ }
		//~ 
	  //~ });
	  //~ 
	  //~ Template.register.events({
		//~ 'click #btnCreateAccount': function (event, template) {
//~ 
		//~ var userEmail = template.find('#email').value,
		  //~ userName  = template.find('#newusername').value,
		  //~ password  = template.find('#newpassword').value,
		  //~ password2 = template.find('#password2').value,
		  //~ name      = template.find('#fullname').value;
	 //~ 
		//~ Accounts.createUser({
		  //~ username: userName,
		  //~ email:    userEmail,
		  //~ password: password,
		  //~ profile: {
			//~ name : name
		  //~ }  
		  //~ 
		//~ }, function (error) {
		  //~ Meteor.Router.to("/");
		  //~ if (error) {
			//~ console.log("Cannot create user");
		  //~ }
		//~ });
	  //~ },
  //~ });
	  //~ 
//~ // home login logout
	  //~ 
	  //~ Template.page.events({
		  //~ 'click #loginl': function(){
			  //~ Meteor.Router.go('/login') // for normal router 
			  //~ //Router.go('login') // for Iron router
//~ 
			  //~ },
			//~ 'click #logout': function () {       
//~ 
			   //~ Meteor.logout();
			   //~ Meteor.Router.go('page')
//~ 
//~ 
			//~ }
		  //~ 
		  //~ });
