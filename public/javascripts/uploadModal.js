/*Dropzone.options.uploadWidget = {
    paramName: 'file',
    maxFilesize: 2, // MB
    maxFiles: 1,
    dictDefaultMessage: 'Drag an image here to upload, or click to select one',
    headers: {
        'x-csrf-token': document.querySelectorAll('meta[name=csrf-token]')[0].getAttributeNode('content').value,
    },
    acceptedFiles: 'image/*',
    init: function() {
        this.on('success', function( file, resp ){
            console.log( file );
            console.log( resp );
        });
        this.on('thumbnail', function(file) {
            if ( file.width < 640 || file.height < 480 ) {
                file.rejectDimensions();
            }
            else {
                file.acceptDimensions();
            }
        });
    },
    accept: function(file, done) {
        file.acceptDimensions = done;
        file.rejectDimensions = function() {
            done('The image must be at least 640 x 480px')
        };
    }
};
*/

//Buybutton clicked
$(".uploadButton").click(function(e){
    e.preventDefault();

    setTimeout(function () {
        fadeInDarkLayer();
    }, 0);

    setTimeout(function () {
        fadeInUploadModal();
    }, 200);
});

var uploadModal = document.createElement('div');




function fadeInUploadModal() {
    uploadModal.innerHTML  =  '<div id="uploadModal" class="round shadow modalView">\n' +
        '        <p>Upload & Sell your own Logo!</p>\n' +
        '        <p class="smalltext">Choose a logo from your computer and upload it! By uploading and using our service you automatically agree to our terms of use, privacy policy & license agreement.</p>\n' +

        '<form id="dropzone-example" method="post" action="/upload" class="dropzone">' +
        '<div class="fallback">' +
        '<input name="file" type="file" />' +
        '</div>' +
        '</form>' +
    '    </div>';

    body.appendChild( uploadModal );
    $("#uploadModal").css("opacity", "0");
    $("#uploadModal").css("display", "block");
    $("#uploadModal").fadeTo('fast', 1.0);
}

function fadeOutUploadModal() {
    $("#uploadModal").fadeTo('fast', 0.0).promise().done(
        function () {
            $("#uploadModal").css("display", "none");
            uploadModal.innerHTML  =  '';
        }
    );
}