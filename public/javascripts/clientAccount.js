
window.onload = function() {

    document.getElementById("deleteAccountButton").onclick = function (e){
        e.preventDefault();
        var confirmation = confirm('Are you sure you want to delete your Account?');

        if (confirmation) {
            $.ajax({
                type: 'DELETE',
                url: '/account/delete',

                success: function() {


                    setTimeout( function() {
                        window.location = "/";
                    }, 500);

                }, error: function() {
                    alert("Error! Try again.");
                }
            });
        } else {
            return false;
        }
    };


};

