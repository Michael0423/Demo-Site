$(function(){
	// console.log("ASD");
	var ajaxOption = {
		url: "./router/login.php",
		type: "POST",
		success: function(rs){
			// alert(rs);
		},
		error: function(e){
			// alert(e);
		}
	};
	$.ajax(ajaxOption);
});

function A(){
	alert("A is called!");
}