$(function(){
	// $.getJSON();
	var a = [];
	// for (var i=0; i<100; i++) {
	// 	a[i]=i;
	// }
	var demoList = $("#demo-list");
	var demoContent = $("#demo-content");
	var count=1;
	$.each(a, function(index, content){
		var item = $("<div>").attr("id", "list-"+count).append($("<ul>").append($("<il>").append($("<a>").attr("href","#").text(content))));
		var item2 = $("<div>").attr("id", "content-"+count).append($("<ul>").append($("<il>").append($("<a>").attr("href","#").text(content))));
		demoList.append(item);
		demoContent.append(item2);
		count++;
	});
	// $("#demo-list").html("ASDASD");
	// console.log($("#demo-list").find("#list-1"));
});