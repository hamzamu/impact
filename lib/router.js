Router.configure({
  layoutTemplate: 'page',
  loadingTemplate:'Loading'
});

Router.map(function () {
  /**
   * The route's name is "home"
   * The route's template is also "home"
   * The default action will render the home template
   */
  this.route('page', {
    path: '/',

  });
  this.route('admin', {
    path: '/admin',
	layoutTemplate: 'admin'
  });
  this.route('login', {
    path: '/login',
	layoutTemplate: 'login'
  });
  this.route('logout', {
    path: '/',
	layoutTemplate: 'page'
  });
  
});


