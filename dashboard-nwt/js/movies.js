var movies ="";
$(document).ready(function(){
    $.getJSON("http://localhost:8083/films", function (result) {
        movies = result;
		var tableHtml ="";
    $.each(movies , function(i){
        var insertmovie = " <tr class='odd gradeX'>"+
        "<td>"+movies[i].name+"</td>"+
         "<td>"+movies[i].director+"</td>"+
         "<td>"+movies[i].duration+"</td>"+
        "</tr>";
        tableHtml=tableHtml.concat(insertmovie);
    });
    $("#movieTableBody").html(tableHtml);
    });
    
});