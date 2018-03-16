    var signinform = $('.signin');

    $("body").on("submit", signinform, function(e){
        e.preventDefault();
        console.log();

        var url = '/signin';

        $.ajax({
            type: "POST",
            url: url,
            data: $(".signin").serialize(),
            success: function(data) {

                fadeOutSigninModal();
                fadeOutDarkLayer();
                setTimeout( function() {
                    window.location.href = "/account";
                }, 500);


            }, error: function(data) {
                alert("Error! Try again.");

            }
        });
    });

    //Buybutton clicked
    $(".signinButton").click(function(e){
        e.preventDefault();

        setTimeout(function () {
            fadeInDarkLayer();
        }, 0);

        setTimeout(function () {
            fadeInSigninModal();
        }, 200);
    });


var signinModal = document.createElement('div');


function fadeInSigninModal() {
    signinModal.innerHTML  =  '<div id="signinModal" class="round shadow modalView">\n' +
        '        <p>Sign In!</p>\n' +
        '        <p class="smalltext">By using our service you automatically agree to our terms of use, privacy policy & license agreement.</p>\n' +

        '<form class="signin" method="post" action="/signin">' +
        '<label>Email</label><br>' +
        '<input type="text" name="username"' +
        '<br>' +
        '<label>Password</label><br>' +
        '<br>' +
        '<input type="password" name="password">' +
        '<br>' +

        '<input type="submit" value="Submit">' +

        '</form>' +
    '    </div>';

    body.appendChild( signinModal );
    $("#signinModal").css("opacity", "0");
    $("#signinModal").css("display", "block");
    $("#signinModal").fadeTo('fast', 1.0);
}



function fadeOutSigninModal() {
    $("#signinModal").fadeTo('fast', 0.0).promise().done(
        function () {
            $("#signinModal").css("display", "none");
            signinModal.innerHTML  =  '';
        }
    );
}