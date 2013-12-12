$(document).ready(function() {
	$('#download').hide();
	var processcomplete = function () {
		$('#output').html( "Processing complete..." );
		$('#download').show();
	};
    $('#begin').click(function () {
        if ( $( "#fileupload" ).val() != "" ) {
			$('#output').html( "Processing..." );
			processcomplete();
		} else {
			$('#output').html( "Please select a valid image file." );
		}
    });
	$('#dlbutton').click(function () {
		console.log( "yep" );
	});
	var processimage = function() {
		
	};
});