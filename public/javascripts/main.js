//In order to get the index of the relevant selected submission when upvoting
var selectedSubmission = -1;
var selectedSubmissionPrice  = -1;
var selectedSubmissionID  = -1;
var selectedSubmissionImage  = {};
var g = document.getElementById('submissionsList');
for (var i = 0, len = g.children.length; i < len; i++)
{
    (function(index){
        g.children[i].onclick = function(){
            selectedSubmission = index;
            selectedSubmissionPrice = g.children[index].getElementsByClassName('submissionprice')[0].innerHTML;
            selectedSubmissionID = g.children[index].getElementsByClassName('submissionid')[0].innerHTML;
            selectedSubmissionImage = g.children[index].getElementsByClassName('submissionImg')[0];
            //alert("Price must be : " + selectedSubmissionPrice + " and selectedSubmissionID must be : " + selectedSubmissionID);
        }
    })(i);
}


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
    //'        <img id="upvoteModalImg" class="submissionImg inSubmissionElement" width="90" height="90" class="img-circle" src="/images/testSvg.svg" alt="Your Logo Alt" onerror="this.src=\'your-alternative-image.png\'">\n' +
    '<form class="upvoteForm" method="post" action="/upvote">' +
    '        <input class="form-control searchBox mr-sm-2 ethIDBox" type="text" name="upvotingWallet" placeholder="Ethereum Public Key" aria-label="ID">\n' +
    '</form>' +
    '        <button class="btn upvoteButtonModal round" onclick="postUpvote()">Upvote</button>\n' +
    '    </div>';



function fadeInUpvoteModal() {

    //upvoteModal.appendChild( selectedSubmissionImage.cloneNode(true) );

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

function postUpvote() {

    console.log("postUpvote fired");

    var url = '/upvote';

    $.ajax({
        type: "POST",
        url: url,
        data: $(".upvoteForm").serialize() + "&selectedID=" + selectedSubmissionID,
        success: function(data) {
            alert("Upvoted!");
            fadeOutUpvoteModal();
            fadeOutDarkLayer();
            window.location = "/";

        }, error: function(data) {
            alert("Error! Try again.");
        }
    });
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






