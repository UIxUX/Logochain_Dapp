

var signupform = $('.signup');



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



function fadeOutSignupModal() {
    $("#signupModal").fadeTo('fast', 0.0).promise().done(
        function () {
            $("#signupModal").css("display", "none");
            signupModal.innerHTML  =  '';
        }
    );
}



function postSignup() {

       if ( signupValidation() ) {

           document.getElementsByClassName('signup')[0].submit();

       } else {
           alert("Registration Fields incorrect.");
       }
}

function signupValidation() {

    var validated = true;

    var wallet =document.getElementById('walletIDField').value.toString();

    var email =document.getElementById('emailField').value.toString();

    var password =document.getElementById('passwordField').value.toString();

    var name =document.getElementById('nameField').value.toString();

    if(wallet.length != 42){
        document.getElementById('walletIDField').style.borderColor = "red";
        validated = false;
    }else{
        document.getElementById('walletIDField').style.borderColor = "green";
    }

    if ( (email.includes('@') && email.includes('.')) == false ) {
        document.getElementById('emailField').style.borderColor = "red";
        validated = false;
    } else {
        document.getElementById('emailField').style.borderColor = "green";
    }

    if ( password.length < 3 ) {
        document.getElementById('passwordField').style.borderColor = "red";
        validated = false;
    } else {
        document.getElementById('passwordField').style.borderColor = "green";
    }

    if ( name.length < 3 ) {
        document.getElementById('nameField').style.borderColor = "red";
        validated = false;
    } else {
        document.getElementById('nameField').style.borderColor = "green";
    }
    return validated;

}



function fadeInSignupModal() {
    signupModal.innerHTML  =  '<div id="signupModal" class="round shadow modalView">\n' +
        '        <p>Register to participate!</p>\n' +
        '        <p class="smalltext">By registering and using our service you automatically agree to our terms of use, privacy policy & license agreement.</p>\n' +

        '<form onchange="signupValidation()" onsubmit="signupValidation()" class="signup" method="post" action="/signup">' +
        '<label>Wallet-ID</label><br>' +
        '<input type="text" name="walletID" class="round" id="walletIDField">' +
        '<br>' +
        '<br>' +
        '<label>Email</label><br>' +
        '<input type="text" name="email" class="round" id="emailField">' +
        '<br>' +
        '<br>' +
        '<label>Password</label><br>' +
        '<input type="password" name="password" class="round" id="passwordField">' +
        '<br>' +
        '<br>' +
        '<label>Name</label><br>' +
        '<input type="text" name="username" class="round" id="nameField">' +
        '<br>' +


        //'<input type="submit" value="Submit">' +

        '</form>' +
        '        <button class="btn upvoteButtonModal round" onclick="postSignup()">Signup</button>\n' +
    '    </div>';

    body.appendChild( signupModal );
    $("#signupModal").css("opacity", "0");
    $("#signupModal").css("display", "block");
    $("#signupModal").fadeTo('fast', 1.0);
}






