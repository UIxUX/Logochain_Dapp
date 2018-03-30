



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

uploadModal.innerHTML  =  '<div id="uploadModal" class="round shadow modalView">\n' +
    '        <p>Upload & Sell your own Logo!</p>\n' +
    '        <p class="smalltext">Choose a logo from your computer and upload it! By uploading and using our service you automatically agree to our terms of use, privacy policy & license agreement.</p>\n' +
    '<label>Title</label><br>' +
    '<input type="text" id="titleS" name="title">' +
    '<br>' +
    '<label>Price</label><br>' +
    '<input type="text" id="priceS" name="price">' +
    '<br>' +
    '<form id="dropzone-example" method="post" action="/upload" class="dropzone" enctype="multipart/form-data" >' +
    '<div class="fallback">' +
    '<input name="file" type="file" multiple />' +
    '</div>' +
    '</form>' +
    '    </div>'
;
body.appendChild( uploadModal );
$("#uploadModal").css("opacity", "0");
$("#uploadModal").css("display", "none");


function fadeInUploadModal() {

    $("#uploadModal").css("display", "block");
    $("#uploadModal").fadeTo('fast', 1.0);
}

function fadeOutUploadModal() {
    $("#uploadModal").fadeTo('fast', 0.0).promise().done(
        function () {
            $("#uploadModal").css("display", "none");
            //uploadModal.innerHTML  =  '';
        }
    );
}