var korisnici ="";
$(document).ready(function () {
     $.getJSON("http://localhost:8082/Korisnici", function (result) {
        korisnici = result;
    });
});
$('#singInBtn').click(function(e){
    e.preventDefault();
    
    var username = $('#usernameInput').val();
    var password = $('#passInput').val();
    var test = false;
    $.each(korisnici, function (i) {
        if(korisnici[i].username == username && korisnici[i].password == password ){
            sessionStorage.setItem("username", username);
            sessionStorage.setItem("userId", korisnici[i].id);
            test = true;
            history.back();
        }
    });
    if(!test){
        $("#errorMessage").html("Invalid username or password");
    }
});

