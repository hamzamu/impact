$(function() {
	
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
