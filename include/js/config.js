$(function(){
	// $.getJSON();
	var a = ["A", "B", "C", "D"];
	var demoList = $("#demo-list");
	$.each(a, function(index, content){
		var item = $("<div>").append($("<ul>").append($("<il>").append($("<a>").attr("href","#").text(content))));
		demoList.append(item);
	});
	// $("#demo-list").html("ASDASD");
});