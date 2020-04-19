var video = $("#video");
document.onmousemove = handleMouseMove;
video.on("touchmove", handleTouchMove);

function handleMouseMove(event) {
	if(throttle()){		
		event = event || window.event;
		refresh(event.pageX, event.pageY);
	}
}

function handleTouchMove(event) {
	if(throttle()){		
		if (event.cancelable) {
		   event.preventDefault();
		}
		var touches = event.changedTouches;

		for (var i = 0; i < touches.length; i++) {
			refresh(touches[i].screenX, touches[i].screenY);
		}
	}
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