$(document).ready(function () {
    //redirect nadin

});
$("#saveMovie").click(function (e) {
    e.preventDefault();
    var name = $("#movieTitleInput").val();
    var director = $("#directorInput").val();
    var duration = $("#durationInput").val();
    var description = $("#descriptionInput").val();
    
    var obj = {
        "name": name,
        "description": description,
        "director": director,
        "duration": duration
    };
    var myJSON = JSON.stringify(obj);
    $.ajax({
        type: "POST",
        url: "http://localhost:8083/films",
        data: myJSON,
        contentType: "application/json;charset=utf-8",
        success: function () {
            alert("Movie added");
            location.reload();

        },
        error: function () {
            alert("Something went wrong");
        }
    });
});