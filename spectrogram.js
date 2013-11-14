$(document).ready(function() {
	$('#download').hide();
    $('#begin').click(function () {
        if ( $( "#fileupload" ).val() != "" ) {
			$('#output').html( "Processing..." );
			downloadcomplete();
		} else {
			$('#output').html( "Please select a valid image file." );
		}
    });
	$('#dlbutton').click(function () {
		console.log( "yep" );
	});
	var downloadcomplete = function () {
		$('#output').html( "Processing complete..." );
		$('#download').show();
	};
});