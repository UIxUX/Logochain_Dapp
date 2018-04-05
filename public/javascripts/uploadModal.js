



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


function uploadValidation() {

    var validated = true;

    var title =document.getElementById('titleS').value.toString();

    var price =document.getElementById('priceS').value;

    if ( title.length < 3 ) {
        document.getElementById('titleS').style.borderColor = "red";
        validated = false;
    } else {
        document.getElementById('titleS').style.borderColor = "green";
    }

    if ( price < 0.001 || price > 10 ) {
        document.getElementById('priceS').style.borderColor = "red";
        validated = false;
    } else {
        document.getElementById('priceS').style.borderColor = "green";
    }

    return validated;

}



var uploadModal = document.createElement('div');

uploadModal.innerHTML  =  '<div id="uploadModal" class="round shadow modalView">\n' +
    '        <p>Upload & Sell your own Logo!</p>\n' +
    '        <p class="smalltext">Choose a logo from your computer and upload it! By uploading and using our service you automatically agree to our terms of use, privacy policy & license agreement.</p>\n' +
    '<label>Title</label><br>' +
    '<input type="text" class="round" id="titleS" name="title" onchange="uploadValidation()">' +
    '<br>' +
    '<label>Price</label><br>' +
    '<input type="text" class="round" id="priceS" name="price" onchange="uploadValidation()">' +
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