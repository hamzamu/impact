	//~ Meteor.Router.add({
	  //~ '/login': 'login',
	  //~ '/register': 'register',
	  //~ '/admin': 'admin',
	  //~ '/map': 'map',
	  //~ '/admin_all': 'admin_all',
	  //~ '/adminold': 'adminx',
	  //~ '/users': 'users',
	  //~ '/main': 'page',
	  //~ '/': 'page',
	  //~ '*': '404'
	//~ });


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

	//~ Meteor.Router.filter('checkLoggedIn', {
		//~ except: ['admin','register','page']
	//~ });

