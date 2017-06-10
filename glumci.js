$(document).ready(function () {

    $('#loadActors').click(function (e) {
	$(this).hide();
        e.preventDefault();
	$.getJSON("http://localhost:8084/Glumci", function(result){
            $.each(result, function(i, field){
                $("#glumciLoad").append(
			'<div id="lijevi"><div class="okvir2"><div class="naslov">' + result[i].firstName + ' ' + result[i].lastName+' </div>' +
			 '<div class="vijest"><img class="slika1" src="slike/'+result[i].firstName+'.jpg" alt=" ">' + result[i].biografy + '</div></div>' +
                        ' <input type="hidden" id="hit" data-id=' + result[i].id + ' class="deleteMovie btn">')
        });
  

    });

    });
});