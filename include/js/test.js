function testFullCalendar() {
	var events = [
		{
	      	title: 'A會議',
	      	// resourceId: 'c',
	      	start: moment().add(-2, 'days').add(-8, 'hour').format('YYYY-MM-DD HH:mm'),
	      	end: moment().add(-2, 'days').add(-5, 'hour').format('YYYY-MM-DD HH:mm')
	    },
	    {
	      	title: 'A會議',
	      	// resourceId: 'a',
	      	start: moment().add(-4, 'days').add(-8, 'hour').format('YYYY-MM-DD HH:mm'),
	      	end: moment().add(-4, 'days').add(-5, 'hour').format('YYYY-MM-DD HH:mm')
	    },
	    {
	      	title: 'A會議',
	      	// resourceId: 'b',
	      	start: moment().add(-3, 'days').add(-8, 'hour').format('YYYY-MM-DD HH:mm'),
	      	end: moment().add(-3, 'days').add(-5, 'hour').format('YYYY-MM-DD HH:mm')
	    },

	    {
	      	title: 'A會議',
	      	// resourceId: 'd',
	      	start: moment().add(-1, 'days').add(-8, 'hour').format('YYYY-MM-DD HH:mm'),
	      	end: moment().add(-1, 'days').add(-5, 'hour').format('YYYY-MM-DD HH:mm')
	    },
	    {
	      	title: 'B會議',
	      	// resourceId: 'b',
	      	start: moment().add(-4, 'days').add(-8, 'hour').format('YYYY-MM-DD HH:mm'),
	      	end: moment().add(-4, 'days').add(-5, 'hour').format('YYYY-MM-DD HH:mm')
	    },
	    {
	      	title: 'B會議',
	      	// resourceId: 'c',
	      	start: moment().add(-3, 'days').add(-8, 'hour').format('YYYY-MM-DD HH:mm'),
	      	end: moment().add(-3, 'days').add(-5, 'hour').format('YYYY-MM-DD HH:mm')
	    },
	    {
	      	title: 'C會議',
	      	// resourceId: 'a',
	      	start: moment().add(-4, 'days').add(-8, 'hour').format('YYYY-MM-DD HH:mm'),
	      	end: moment().add(-4, 'days').add(-5, 'hour').format('YYYY-MM-DD HH:mm')
	    },
	    {
	      	title: 'C會議',
	      	// resourceId: 'c',
	      	start: moment().add(-3, 'days').add(-8, 'hour').format('YYYY-MM-DD HH:mm'),
	      	end: moment().add(-3, 'days').add(-5, 'hour').format('YYYY-MM-DD HH:mm')
	    }
	];
	console.log(events);
	// $("#content").fullCalendar({
	//     editable: true,
	//     events: events
	// });
	// events = [];
	$('#content').fullCalendar({
		// 語系
		locale: 'zh-TW',
		// 表頭配置
		// title:日期, today:今日按鈕, prev:往前, next:往後, prevYear:前一年, nextYear:下一年
		header: { left: "", center: "title", right: "today,prev,next" },
		// 預設呈現
		//
	    defaultView: 'agendaWeek',
	  	events: events
	});
}

function testMove(){
	var area = $("<div>").prop("id","element").css("background-color", "white").css("width","1500px").css("height", "1500px");
	var element = $("<div>").prop("id","element").css("background-color", "red").css("width","150px").css("height", "150px").css("position","absolute");
	$(area).append(element);
	$("#content").append(area);

	// console.log($(element).position());

	$(element).mousedown(function(e){
		console.log(e);
		$(e.target).data("move", true);
		$(e.target).data("x0", e.clientX);
		$(e.target).data("y0", e.clientY);
		$(e.target).data("px0", $(this).css("left"));
		$(e.target).data("py0", $(this).css("top"));
		console.log("mousedown mouse position: ", e.clientY, e.clientX);
		console.log("mousedown element position: ", $(this).css("top"), $(this).css("left"));
	});
	$(element).mouseup(function(e){
		$(e.target).data("move", false);
	});
	$(element).mousemove(function(e){
		if($(e.target).data("move")){
			var x0 = $(e.target).data("x0");
			var y0 = $(e.target).data("y0");

			var top = $(e.target).data("py0");
			top = parseInt(top.substring(0, top.length-2));
			top = top + (e.clientY - y0);

			var left = $(e.target).data("px0");
			left = parseInt(left.substring(0, left.length-2));
			left = left + (e.clientX - x0);
			$(this).css("top",top).css("left",left);
		}
	});
}
