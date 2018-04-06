
//Buybutton clicked
$(".buyButton").click(function(e){
    e.preventDefault();

    setTimeout(function () {
        fadeInDarkLayer();
    }, 0);

    setTimeout(function () {
        fadeInBuyModal();
    }, 200);
});

var buyModal = document.createElement('div');




function fadeInBuyModal() {
    buyModal.innerHTML  =  '<div id="buyModal" class="round shadow modalView">\n' +
        '        <p>Purchase this Logo using Ether</p>\n' +
        '        <p class="smalltext">Using the Metamask extension, you can purchase this logo. </p>\n' +
        '        <img class="submissionImg inSubmissionElement" width="304" height="89" class="" src="/images/metamask.png" alt="Metamask">\n' +

        '    </div>';

    body.appendChild( buyModal );
    $("#buyModal").css("opacity", "0");
    $("#buyModal").css("display", "block");
    $("#buyModal").fadeTo('fast', 1.0);
}

function fadeOutBuyModal() {
    $("#buyModal").fadeTo('fast', 0.0).promise().done(
        function () {
            $("#buyModal").css("display", "none");
            buyModal.innerHTML  =  '';
        }
    );
}