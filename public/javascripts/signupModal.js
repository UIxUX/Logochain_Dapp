    var signupform = $('.signup');

    $("body").on("submit", signupform, function(e){
        e.preventDefault();
        console.log();

        var url = '/signup';

        $.ajax({
            type: "POST",
            url: url,
            data: $(".signup").serialize(),
            success: function(data) {
                alert("Account created!");
                fadeOutSignupModal();
                fadeOutDarkLayer();
                setTimeout( function() {
                    window.location.href = "/account";
                }, 500);


            }, error: function(data) {
                alert("Error! Try again.");
                //$(document).getElementById('signupModal').append('<p>Try again. An Error occured.</p>');
            }
        });
    });

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
        '        <p>Register to participate!</p>\n' +
        '        <p class="smalltext">By registering and using our service you automatically agree to our terms of use, privacy policy & license agreement.</p>\n' +

        '<form class="signup" method="post" action="/signup">' +
        '<label>Name</label><br>' +
        '<input type="text" name="username"' +
        '<br>' +
        '<br>' +
        '<label>Email</label><br>' +
        '<input type="text" name="email">' +
        '<br>' +
        '<label>Password</label><br>' +
        '<input type="password" name="password">' +
        '<br>' +
        '<label>Wallet-ID</label><br>' +
        '<input type="text" name="wallet_id">' +
        '<br>' +

        '<input type="submit" value="Submit">' +

        '</form>' +
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