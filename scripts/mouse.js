document.onmousemove = handleMouseMove;
var video = $("#video");

function handleMouseMove(event) {
	event = event || window.event;
	refresh(event.pageX, event.pageY);
}

function refresh(x,y) {
	var x_percent = (x * 100 / window.innerWidth).toFixed(2);
	var y_percent = (y * 100 / window.innerHeight).toFixed(2);
	$("#text_coord").text('x: ' + x + ' y:' + y + ' x:' + x_percent + '% y:' + y_percent + '%');
	
	if(video !== null){
		var duration = video.prop("duration");
		var current_time = duration * x / window.innerWidth;
		video.prop("currentTime", current_time);
	}
}