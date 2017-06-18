var actors = "";
$(document).ready(function () {
    $.getJSON("http://localhost:8084/Glumci", function (result) {
        actors = result;
        var tableHtml = "";
        $.each(result, function (i) {
            var link = "<li><a class='dropactorClass' data-id='" + result[i].glumacID + "' " + " href='#'>" + result[i].firstName + " " + result[i].lastName + "</a></li>";
            tableHtml = tableHtml.concat(link);
        });
        $("#dropdownActor").html(tableHtml);
    });
});

$('body').on('click','.dropactorClass',function(e){
      e.preventDefault();
    var id = $(this).attr("data-id");
    $.each(actors, function (i) {
        if (actors[i].glumacID == id) {
            $("#actorIdInput").val(id);
            $("#firstNameInput").val(actors[i].firstName);
            $("#lastNameInput").val(actors[i].lastName);
            $("#resimeInput").val(actors[i].biografy);
        }
    });	
});
$("#deleteActor").click(function (e) {
    var id = $("#actorIdInput").val();
    if (id) {
        $.ajax({
            type: "delete",
            url: "http://localhost:8084/Glumci/" + id,
            // contentType: "application/json;charset=utf-8",
            success: function () {
                alert("Actor deleted");
                location.reload();
            },
            error: function () {
                alert("Something went wrong");
            }
        });
    }
});

$("#saveChanges").click(function (e) {
    e.preventDefault();
    var name = $("#firstNameInput").val();
    var lastname = $("#lastNameInput").val();
    var resime = $("#resimeInput").val();
    var actorid = $("#actorIdInput").val();
    if (validate()) {
        var obj = {
            "glumacID": actorid,
            "firstName": name,
            "biografy": resime,
            "dateOfBirth": null,
            "lastName": lastname
        };
        var myJSON = JSON.stringify(obj);
        $.ajax({
            type: "put",
            url: "http://localhost:8084/Glumci",
            data: myJSON,
            contentType: "application/json;charset=utf-8",
            success: function () {
                alert("Actor updated");
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
    if ($("#actorIdInput").val() == "") {
        test = false;
    }
    if ($("#firstNameInput").val() == "") {
        $("#firstNameInputError").html("Insert valid value");
        test = false;
    }
    if ($("#lastNameInput").val() == "") {
        $("#lastNameInputError").html("Insert valid value");
        test = false;
    }
    return test;
};