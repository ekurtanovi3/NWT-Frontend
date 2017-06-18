var movies = "";
$(document).ready(function () {
    $.getJSON("http://localhost:8083/films", function (result) {
        movies = result;
        var tableHtml = "";
        $.each(result, function (i) {
            var link = "<li ><a class='dropClass' data-id='" + result[i].id + "' " + " href='#'>" + result[i].name + "</a></li>";
            tableHtml = tableHtml.concat(link);
        });
        $("#dropdownMovie").html(tableHtml);
    });
});

$('body').on('click','.dropClass',function(e){
	e.preventDefault();
    var id = $(this).attr("data-id");
    $.each(movies, function (i) {
        if (movies[i].id == id) {
            $("#movieIdInput").val(id);
            $("#movieTitleInput").val(movies[i].name);
            $("#directorInput").val(movies[i].director);
            $("#durationInput").val(movies[i].duration);
            $("#descriptionInput").val(movies[i].description);
        }
    });
});

$("#deleteMovie").click(function (e) {
    var id = $("#movieIdInput").val();
    if (id) {
        $.ajax({
            type: "delete",
            url: "http://localhost:8083/films/" + id,
            // contentType: "application/json;charset=utf-8",
            success: function () {
                alert("Movie deleted");
                location.reload();
            },
            error: function () {
                alert("Something went wrong");
            }
        });
    }
});

$("#saveMovie").click(function (e) {
    e.preventDefault();
    var name = $("#movieTitleInput").val();
    var director = $("#directorInput").val();
    var duration = $("#durationInput").val();
    var description = $("#descriptionInput").val();
	var id=$("#movieIdInput").val();
    if (validate()) {
        var obj = {
			"id": id,
            "name": name,
            "description": description,
            "director": director,
            "duration": duration
        };
        var myJSON = JSON.stringify(obj);
        $.ajax({
            type: "put",
            url: "http://localhost:8083/films",
            data: myJSON,
            contentType: "application/json;charset=utf-8",
            success: function () {
                alert("Movie updated");
                location.reload();
            },
            error: function () {
                alert("Something went wrong");
            }
        });
    }
});

function validate() {
    var test = true;
    if ($("#movieIdInput").val() == "") {
        test = false;
    }
    if ($("#movieTitleInput").val() == "") {
        test = false;
    }
    if ($("#directorInput").val() == "") {
        test = false;
    }
    if ($("#durationInput").val() == "") {
        test = false;
    }
    if ($("#descriptionInput").val() == "") {
        test = false;
    }
    return test;
};