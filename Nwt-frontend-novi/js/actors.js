var actors = "";
$(document).ready(function () {
    if (sessionStorage.username) {
        var logout = "<a id='logOut' style='float:right' href='#'><small>Log Off</small></a>";
        $('#loginToggle').html(logout);
    }
    $.getJSON("http://localhost:8084/Glumci", function (result) {
        actors = result;
    });
});
$('#loginToggle').click(function (e) {
    e.preventDefault();
    if (sessionStorage.username) {
        sessionStorage.clear();
        window.location.href = "index.html";
    } else {
        window.location.href = "login.html";
    }
});
$('#searchActorBtn').click(function (e) {
    e.preventDefault();
    var searchWord = $('#actorNameInput').val();
    var inputHtml = "";
    for (i = 0; i < actors.length; i++) {
        if (actors[i].firstName.toLowerCase().indexOf(searchWord.toLowerCase()) > -1 || actors[i].lastName.toLowerCase().indexOf(searchWord.toLowerCase()) > -1  ) {
            var actorsHtml = "<div class='col-sm-4 text-center'>" +
                "<img width='200' height='200' class='img-responsive' src=" +
                "'img/" + actors[i].firstName  +".jpg'>"
                + "<h4><a href='actor.html?id=" + actors[i].glumacID + "'>" + actors[i].firstName + " " +actors[i].lastName+"</a>" + "</h4>" + "</div>";
            inputHtml = inputHtml.concat(actorsHtml);
        }
    }
    $('#searchResultsActor').html(inputHtml);
    $('#searchContainerActor').removeClass("hiddenElement");
    window.location.hash = "";
    window.location.hash = "#searchContainerActor";
});
