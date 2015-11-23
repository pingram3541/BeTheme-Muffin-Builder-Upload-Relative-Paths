function MfnUpload(){
	(function($) {

		if(typeof mfn_upload !== 'undefined') $( 'img[src=""]' ).attr( 'src', mfn_upload.url );

		$( '.mfn-opts-upload' ).click( function( event ) {
        	event.preventDefault();

        	var activeFileUploadContext = $( this ).parent();
        	var type = $( 'input', activeFileUploadContext ).attr( 'class' );

        	custom_file_frame = null;

            // Create the media frame.
            custom_file_frame = wp.media.frames.customHeader = wp.media({
            	title: $( this ).data( 'choose' ),
            	library: {
            		type: type
            	},
                button: {
                    text: $( this ).data( 'update' )
                }
            });

            custom_file_frame.on( "select", function() {
            	var attachment = custom_file_frame.state().get( "selection" ).first();

            	//convert url to relative path
            	var el = document.createElement('a');
                el.href = attachment.attributes.url; //use el.pathname

                // Update value of the targetfield input with the attachment url.
                $( '.mfn-opts-screenshot', activeFileUploadContext ).attr( 'src', el.pathname );
                $( 'input', activeFileUploadContext )
            		.val( el.pathname )
            		.trigger( 'change' );

                $( '.mfn-opts-upload', activeFileUploadContext ).hide();
                $( '.mfn-opts-screenshot', activeFileUploadContext ).show();
                $( '.mfn-opts-upload-remove', activeFileUploadContext ).show();
            });

            custom_file_frame.open();
        });

	    $( '.mfn-opts-upload-remove' ).click( function( event ) {
	    	event.preventDefault();

	        var activeFileUploadContext = $( this ).parent();

	        $( 'input', activeFileUploadContext ).val('');
	        $( this ).prev().fadeIn( 'slow' );
	        $( '.mfn-opts-screenshot', activeFileUploadContext ).fadeOut( 'slow' );
	        $( this ).fadeOut( 'slow' );
	    });

	})(jQuery);
}

jQuery(document).ready(function($){
	var mfn_upload = new MfnUpload();
});