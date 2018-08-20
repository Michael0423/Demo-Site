function lineChart(){
	google.charts.load('current', {'packages':['corechart']});
	google.charts.load('current', {'packages':['bar']});
    google.charts.setOnLoadCallback(drawChart);
}

function drawChart() {
	var sendData = {
		sys_code_id: 38,
		start_date: "2018-01-01",
		end_date: "2018-06-04",
		supply: "",
		work_type: "水電"
	};
	var chartType = -1;
	if(sendData.supply != ""){
		chartType = 2; // 工種折線圖
	}else if(sendData.work_type != ""){
		chartType = 3; // 廠商折線圖
	}else{
		chartType = 1; // 長條圖
	}
// console.log(chartType);
	var option = {
		url: "http://127.0.0.1:88/bpsAPI",
		type: "GET",
		data: {
			api: "SuSupply/getWorkRecordList",
			data: sendData,
			threeModal: true
		},
		dataType: "JSON",
		success: function ( rs ) {
			// console.log(rs);
			if(rs.status){
				var countData = rs.data;
				var chartData = [];

				switch(chartType){
					case 1:
						chartData[0] = ["廠商(工種)", "人數"];
						var preData = {};
						$.each(countData, function(date, data){
							$.each(data, function(i, v){
								console.log(v);
								if(preData[v.supply.name+"-("+v.work.name+")"] == undefined) preData[v.supply.name+"-("+v.work.name+")"] = 0;
								preData[v.supply.name+"-("+v.work.name+")"] += parseInt(v.count);
							});
						});

						$.each(preData, function(index, value){
							var tmpData = [index, value];
							chartData.push(tmpData);
						});
						break;
					case 2: case 3:
						chartData[0] = ["日期"];

						var supplyIndex = {};
						var count = 0;

						$.each(countData, function(date, data){
							count++;
							// console.log(data);
							// debugger;
							var tmpData = [];
							tmpData.push(date);

							$.each(data, function(index, d){
								if(chartType == 2){
									if($.inArray(d.work.name, chartData[0]) == -1){
										chartData[0].push(d.work.name);
										supplyIndex[d.work.name] = chartData[0].length - 1;
									}
									// console.log(supplyIndex[d.work.name]);
									tmpData[supplyIndex[d.work.name]] = parseInt(d.count);
								}else if(chartType == 3){
									if($.inArray(d.supply.name, chartData[0]) == -1){
										chartData[0].push(d.supply.name);
										supplyIndex[d.supply.name] = chartData[0].length - 1;
									}
									// console.log(supplyIndex[d.supply.name]);
									tmpData[supplyIndex[d.supply.name]] = parseInt(d.count);
								}else{

								}
							});

							chartData.push(tmpData);
						});

						for (var i = chartData.length - 1; i > 0; i--) {
							for (var j = chartData[0].length - 1; j > 0; j--) {
								if(chartData[i][j] == undefined) chartData[i][j] = 0;
							}
						}
						chartData.sort(function(a, b){
							var aTime = +new Date(a[0]);
							var bTime = +new Date(b[0]);
							if(aTime < bTime){
								return -1;
							}else if(aTime > bTime){
								return 1;
							}else{
								return 0;
							}
						});
						break;
					default:
				}


				console.log(chartData);
				var data = google.visualization.arrayToDataTable(chartData);
				// var data = google.visualization.arrayToDataTable([
				// 	['Year', 'Sales', 'Expenses'],
				// 	['2004',  1000,      400],
				// 	['2005',  1170,      460],
				// 	['2006',  660,       1120],
				// 	['2007',  1030,      540]
				// ]);

				var options = {
					title: 'Company Performance',
					curveType: 'function',
					legend: { position: 'bottom' }
				};


				var chart = {};
				switch(chartType){
					case 1:
						chart = new google.charts.Bar(document.getElementById('content'));
						break;
					case 2: case 3: //
						chart = new google.visualization.LineChart(document.getElementById('content'));
						break;
					default:
				}


				chart.draw(data, options);

			}else{

			}
		},
		error: function( err ) {
			console.log(err);
		}
	};
	// console.log(option);
	$.ajax(option);
}