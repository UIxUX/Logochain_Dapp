
//Buybutton clicked
$(".signupButton").click(function(e){
    e.preventDefault();

    setTimeout(function () {
        fadeInDarkLayer();
    }, 0);

    setTimeout(function () {
        fadeInSignupModal();
    }, 200);
});

var signupModal = document.createElement('div');




function fadeInSignupModal() {
    signupModal.innerHTML  =  '<div id="signupModal" class="round shadow modalView">\n' +
        '        <p>Upload & Sell your own Logo!</p>\n' +
        '        <p class="smalltext">Choose a logo from your computer and upload it! By uploading and using our service you automatically agree to our terms of use, privacy policy & license agreement.</p>\n' +

        '        <button class="btn round" > choose..</button>\n'
    '    </div>';

    body.appendChild( signupModal );
    $("#signupModal").css("opacity", "0");
    $("#signupModal").css("display", "block");
    $("#signupModal").fadeTo('fast', 1.0);
}

function fadeOutSignupModal() {
    $("#signupModal").fadeTo('fast', 0.0).promise().done(
        function () {
            $("#signupModal").css("display", "none");
            signupModal.innerHTML  =  '';
        }
    );
}