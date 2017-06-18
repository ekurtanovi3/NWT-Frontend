var movies = "";
$(document).ready(function () {
    if (sessionStorage.username) {
        var logout = "<a id='logOut' style='float:right' href='#'><small>Log Off</small></a>";
        $('#loginToggle').html(logout);
    }
    $.getJSON("http://localhost:8083/films", function (result) {
        movies = result;
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
$('#searchMovieBtn').click(function (e) {
    e.preventDefault();
    var searchWord = $('#movieNameInput').val();
    var inputHtml = "";
    for (i = 0; i < movies.length; i++) {
        if (movies[i].name.toLowerCase().indexOf(searchWord.toLowerCase()) > -1) {
            var moviesHtml = "<div class='col-sm-4 text-center'>" +
                "<img width='200' height='200' class='img-responsive' src=" +
                "'img/" + movies[i].name  +".jpg'>"
                + "<h4><a href='movie.html?id=" + movies[i].id + "'>" + movies[i].name + "</a>" + "</h4>" + "</div>";
            inputHtml = inputHtml.concat(moviesHtml);
        }
    }
    $('#searchResultsMovie').html(inputHtml);
    $('#searchContainer').removeClass("hiddenElement");
    window.location.hash = "";
    window.location.hash = "#searchContainer";
});
