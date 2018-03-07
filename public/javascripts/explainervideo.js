
//Videobutton clicked
$(".explainerModalButton").click(function(e){
    e.preventDefault();

    setTimeout(function () {
        fadeInDarkLayer();
    }, 0);

    setTimeout(function () {
        fadeInVideoModal();
    }, 200);
});

var videoModal = document.createElement('div');




function fadeInVideoModal() {
    videoModal.innerHTML  =  '<div id="videoModal" class="round">\n' +
        '        <iframe width="560" height="315" src="https://www.youtube.com/embed/mpjREfvZiDs?rel=0&amp;controls=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>\n'
    '    </div>';
    body.appendChild( videoModal );
    $("#videoModal").css("opacity", "0");
    $("#videoModal").css("display", "block");
    $("#videoModal").fadeTo('fast', 1.0);
}

function fadeOutVideoModal() {
    $("#videoModal").fadeTo('fast', 0.0).promise().done(
        function () {
            $("#videoModal").css("display", "none");
            videoModal.innerHTML  =  '';
        }
    );
}