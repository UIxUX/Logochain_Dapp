console.log('****** ACCOUNT LOADED ******');

$(document).ready( function () {
    console.log('ACCOUNT LOADED');
    //$('.deleteAccount').on('click', deleteAccount);
    $('.deleteAccount').onclick = deleteAccount();
});

// Not working - not sure why
function deleteAccount () {
    var confirmation = confirm('Are you sure you want to delete your Account?');

    if (confirmation) {
        $.ajax({
            type.'DELETE',
            url: '/account/' + $('deleteUser').data('id')
    }).done(function (response) {
            window.location.replace('/');
        });
    } else {
        return false;
    }
}

