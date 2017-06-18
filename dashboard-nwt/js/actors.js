var glumci ="";
$(document).ready(function(){
    $.getJSON("http://localhost:8084/Glumci", function (result) {
        glumci = result;
		var tableHtml ="";
    $.each(glumci , function(i){
        var insertGlumac = " <tr class='odd gradeX'>"+
        "<td>"+glumci[i].firstName+"</td>"+
         "<td>"+glumci[i].lastName+"</td>"+
        "</tr>";
        tableHtml=tableHtml.concat(insertGlumac);
    });
    $("#actorTableBody").html(tableHtml);
    });
    

});