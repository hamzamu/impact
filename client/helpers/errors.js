Errors = new Meteor.Collection(null);

	//throw an error 
	throwError = function(message) {
		Errors.insert({message: message})
	}
	
	
	//find errors
	Template.errors.helpers({
		errors: function() {
		return Errors.find();
		}
	});

