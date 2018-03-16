//Upload clicked
$("#uploadButton").click(function(e){
    e.preventDefault();

    fadeInDarkLayer();
    //setTimeout(function () {

    // }, 3000);
});

//Upload clicked
$(".upvoteButton").click(function(e){
    e.preventDefault();

    setTimeout(function () {
        fadeInDarkLayer();
    }, 0);

    setTimeout(function () {
        fadeInUpvoteModal();
    }, 200);

});

var body = document.getElementsByTagName('body')[0];

var overlay = document.createElement('div');

var upvoteModal = document.createElement('div');

upvoteModal.innerHTML  =  '<div id="upvoteModal" class="round shadow modalView">\n' +
    '        <p>Upvote using your Ethereum wallet-id</p>\n' +
    '        <p class="smalltext">Enter your wallet-id in order to upvote - you’ll receive 5 upvotes every week!</p>\n' +
    '        <img class="submissionImg inSubmissionElement" width="90" height="90" class="img-circle" src="/images/testSvg.svg" alt="Your Logo Alt" onerror="this.src=\'your-alternative-image.png\'">\n' +
    '        <input class="form-control searchBox mr-sm-2 ethIDBox" type="search" placeholder="Ethereum Public Key" aria-label="ID">\n' +
    '        <button class="btn upvoteButtonModal round">Upvote</button>\n' +
    '    </div>';

function fadeInUpvoteModal() {
    body.appendChild( upvoteModal );
    $("#upvoteModal").css("opacity", "0");
    $("#upvoteModal").css("display", "block");
    $("#upvoteModal").fadeTo('fast', 1.0);
}

function fadeOutUpvoteModal() {
    $("#upvoteModal").fadeTo('fast', 0.0).promise().done(
        function () {
            $("#upvoteModal").css("display", "none");
        }
    );
}


function fadeInDarkLayer() {
        overlay.onclick = fadeOutDarkLayer;
        overlay.className = 'overlay';
        overlay.id = "overlay";
        body.appendChild(overlay);
        $("#overlay").css("opacity", "0");
        $("#overlay").css("display", "block");
        disableScrolling();
        $("#overlay").fadeTo('fast', 1.0);
}

function fadeOutDarkLayer() {
    setTimeout(function () {
        fadeOutUpvoteModal();
        fadeOutVideoModal();
        fadeOutBuyModal();
        fadeOutUploadModal();
        fadeOutSignupModal();
        fadeOutSigninModal();
    }, 0);

    $("#overlay").fadeTo('fast', 0.50).promise().done(
       function () {
            enableScrolling();
           $("#overlay").css("display", "none");
        }
    );
}



function disableScrolling(){
    var x=window.scrollX;
    var y=window.scrollY;
    window.onscroll=function(){window.scrollTo(x, y);};
}

function enableScrolling(){
    window.onscroll=function(){};
}






