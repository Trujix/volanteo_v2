$(document).ready(function(){
	$('#btn-submit').css({
		"font-size": "25px",
		"padding": "10px",
		"width": "100%",
		"height": "40px"
	});
});

$(document).on('click', '.rad0', function(e){

 	if (this.childNodes[1].value == 2) {

		$(".preA").slideUp();

		$('.radios').prop("required", false);
	
	}
	else{
		// $("#q1").removeClass("required");
		$(".preA").slideDown();

		$('.radios').prop("required", true);

	}

});




