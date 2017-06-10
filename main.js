
$(document).ready(function () {

    $('#loadMovies').click(function (e) {
	$(this).hide();
        e.preventDefault();
	$.getJSON("http://localhost:8083/films", function(result){
            $.each(result, function(i, field){
                $("#filmoviLoad").append(
			'<div id="lijevi"><div class="okvir2"><div class="naslov">' + result[i].name + ' (' + result[i].duration+ ' min)<img class="star" src="slike/star.png" alt=" "> <div class="iza">9.3</div></div>' +
                        '<div class="vijest"><img class="slika1" src="slike/'+result[i].name+'.jpg" alt=" ">' + result[i].description + '</div></div>' +
                        ' <input type="hidden" id="hit" data-id=' + result[i].id + ' class="deleteMovie btn">')
        });
  

    });

    });
});