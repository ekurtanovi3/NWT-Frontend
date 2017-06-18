$('#registerBtn').click(function(e){
    e.preventDefault();
    
    var username = $('#usernameInputReg').val();
    var firstNameInput = $('#firstNameInput').val();
    var lastNameInput = $('#lastNameInput').val();
    var password = $('#passInputReg').val();
    var passwordConfirm = $('#passInputConfirm').val();
    if(password != passwordConfirm){
        $('#errorMessage').html("Passwords don't macht!");
        return;
    }
    if(validate()){
    var obj = {
            "ime": firstNameInput,
            "prezime": lastNameInput,
           "username": username,
            "password": password
        };
        var myJSON = JSON.stringify(obj);
        $.ajax({
            type: "POST",
            url: "http://localhost:8082/Korisnici",
            data: myJSON,
            contentType: "application/json;charset=utf-8",
            success: function () {
                sessionStorage.setItem("username", username);
                window.location.href = "index.html";
            },
            error: function () {
                alert("Something went wrong!");
            }
        });
    }
});

function validate(){
    var test = true;
    if($('#usernameInputReg').val() == ""){
        test = false;
    }
    if($('#firstNameInput').val() == ""){
        test = false;
    }
    if($('#lastNameInput').val() == ""){
        test = false;
    }
    if($('#passInputReg').val() == ""){
        test = false;
    }
    if($('#passInputConfirm').val() == ""){
        test = false;
    }
    return test;
}

