var actorId = window.location.href.split('?')[1].split('=')[1];
$(document).ready(function () {
    if (sessionStorage.username) {
        var logout = "<a id='logOut' style='float:right' href='#'><small>Log Off</small></a>";
        $('#loginToggle').html(logout);
    }
    getActor();
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

function getActor() {
    var actor = "";
    $.getJSON("http://localhost:8084/Glumci/" + actorId, function (result) {
        actor = result;
		 if (actor) {
        $('#actorName').html(actor.firstName + " " + actor.lastName);
        $('#actorImg').attr('src', 'img/'+ actor.firstName +'.jpg');
        $('#actorDescription').html(actor.biografy);
    }
    });
   
}