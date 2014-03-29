//find errors
Template.errors.helpers({
    errors: function() {
        return Errors.find();
    }
});
