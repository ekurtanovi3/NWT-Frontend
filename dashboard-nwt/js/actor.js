$(document).ready(function(){
  //redirect nadin

});
$("#saveActor").click(function (e) {
    e.preventDefault();
    var name = $("#firstNameInput").val();
    var lastname = $("#lastNameInput").val();
    var resime = $("#resimeInput").val();

    var obj = {
        "firstName": name,
        "biografy": resime,
        "dateOfBirth": null,
        "lastName": lastname
    };
    var myJSON = JSON.stringify(obj);
    $.ajax({
        type: "POST",
        url: "http://localhost:8084/Glumci",
        data: myJSON,
        contentType: "application/json;charset=utf-8",
        success: function () {
            alert("Actor added");
            location.reload();
        },
        error: function () {
            alert("Something went wrong");
        }
    });
});