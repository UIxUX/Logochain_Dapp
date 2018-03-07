
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
        '        <p class="smalltext">Send the correct amount of Ether to the address below to purchase the Logo.</p>\n' +
        '        <img class="submissionImg inSubmissionElement" width="90" height="90" class="img-circle" src="/images/testSvg.svg" alt="Your Logo Alt" onerror="this.src=\'your-alternative-image.png\'">\n' +
        '        <p class="smalltext" id="buyAddress">👉 0x3831f5e181fccaF8410FA61e12b59BAd933fb643</p>\n'
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