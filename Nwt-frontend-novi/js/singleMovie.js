var movieId = window.location.href.split('?')[1].split('=')[1];
$(document).ready(function () {
    if (sessionStorage.username) {
        var logout = "<a id='logOut' style='float:right' href='#'><small>Log Off</small></a>";
        $('#loginToggle').html(logout);
    }
    getMovie();
    showMainActors(movieId);
    addComents(movieId);
});
//log off 
$('#loginToggle').click(function (e) {
    e.preventDefault();
    if (sessionStorage.username) {
        sessionStorage.clear();
        window.location.href = "index.html";
    } else {
        window.location.href = "login.html";
    }
});
// end log of
$('#addCommentBtn').click(function (e) {
    e.preventDefault();
    if (sessionStorage.username) { 
        var commentTxt = $('#commentInput').val();
        $('#commentInput').val("");
        var comment = "<div class='media'><p class='pull-right'><small>5 days ago</small></p>" +
            "<a class='media-left' href='#'>" + "<img src='https://en.opensuse.org/images/0/0b/Icon-user.png'></a><div class='media-body'>" +
            "<h4 class='media-heading user_name'>" + sessionStorage.username + "</h4>" + commentTxt + "</div></div>";
        $("#commentSectionMedia").append(comment);
        // dodan commentar u bazu nadin
        var obj = {
            "tekstKomentara": commentTxt,
           "idUsera": sessionStorage.userId,
            "idFilma": movieId
        };
        var myJSON = JSON.stringify(obj);
        $.ajax({
            type: "POST",
            url: "http://localhost:8081/komentari",
            data: myJSON,
            contentType: "application/json;charset=utf-8",
            success: function () {
                alert("good");
            },
            error: function () {
                alert("eror");
            }
        });
        // kraj dodavanja komentara 
    } else {
        if (confirm("Log in to comment!") == true) {
            window.location.href = "login.html";
        } else {

        }
    };
});

function showMainActors(movieId) {
    // get glumci 
    $.getJSON("http://localhost:8084/Glumci", function (result) {
        glumci = result;
        $.each(glumci, function (i) {
        var glumciHtml = "<div class='col-sm-4 text-center'>" +
            "<img class='img-responsive' src=" + "'img/" + movies[i].name  +".jpg'>"
            + "<h3>"+ "<a href='actor.html?id=" + glumci[i].glumacID + "'>" + glumci[i].firstName + " " + glumci[i].lastName+"</a>"  + "</h3>" + "</div>";
        $("#movieMainActors").append(glumciHtml);
    });
    });
    

}
function getMovie() {
    var movie = "";
    $.getJSON("http://localhost:8083/films/" + movieId, function (result) {
        movie = result;
		 if (movie) {
        $('#movieTitle').html(movie.name);
        $('#movieImg').attr('src', 'img/'+movie.name+'.jpg')
        $('#movieDescription').html(movie.description);
    }
    });
   
}
function addComents(movieIdNumber) {
    var komentari = "";
    $.getJSON("http://localhost:8081/komentariPoFilmu/" + movieId, function (result) {
        komentari = result;
        $.each(komentari, function (i, field) {
            getUserById(komentari[i].idUsera, komentari[i]);
        });

    });

}
function getUserById(id , komentar) {
    var usernameHtml = "";
    $.getJSON("http://localhost:8082/Korisnici/" + id, function (result) {
        usernameHtml = result.ime + " " + result.prezime;
        var comment = "<div class='media'><p class='pull-right'><small>5 days ago</small></p>" +
            "<a class='media-left' href='#'>" + "<img src='https://en.opensuse.org/images/0/0b/Icon-user.png'></a><div class='media-body'>" +
            "<h4 class='media-heading user_name'>" + usernameHtml + "</h4>" + komentar.tekstKomentara + "</div></div>";
        $("#commentSectionMedia").append(comment);
    });
}

