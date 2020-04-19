var video = $("#video");
document.onmousemove = handleMouseMove;
video.on("touchmove", handleTouchMove);

function createVector(x,y){
	var size = Math.sqrt(Math.pow(x,2) + Math.pow(y,2));
	var vector_x = x / size;
	var vector_y = y / size;
	return {x : vector_x, y : vector_y, size : Math.sqrt(Math.pow(vector_x,2) + Math.pow(vector_y,2))};
}

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
			setTimeout(function () { 
				refresh(touches[i].screenX, touches[i].screenY)
			});
		}
	}
}

function refresh(x,y){
	throttle();
	var ref_vector = createVector(0,-1);
	var half_width = window.innerWidth / 2;
	var half_height = window.innerHeight / 2;
	var x_percent = (x * 100 / window.innerWidth).toFixed(2);
	var y_percent = (y * 100 / window.innerHeight).toFixed(2);
	
	var mouse_vector = createVector(x  - window.innerWidth / 2, y  - window.innerHeight / 2);
	var cos = ref_vector.x * mouse_vector.x + ref_vector.y * mouse_vector.y;
	var angle = Math.acos(cos);
	var angle_percent = angle/Math.PI;
	var percent = x > window.innerWidth / 2 ? angle_percent * 0.5 : 0.5 * (2  - angle_percent);
	
	$("#text_coord").text('x: ' + x + ' y:' + y + ' x:' + x_percent + '% y:' + y_percent + '%' +
	'ref_vector: [' + ref_vector.x.toFixed(2) + ',' + ref_vector.y.toFixed(2) + '](' + ref_vector.size.toFixed(2) + ')' +
	' mouse_vector: [' + mouse_vector.x.toFixed(2) + ',' + mouse_vector.y.toFixed(2) + '](' + mouse_vector.size.toFixed(2) + ')'+
	' cos: ' + cos.toFixed(2) + ' angle: ' + angle.toFixed(2) + ' angle(%): ' + angle_percent.toFixed(2)+ ' percent(%): ' + percent.toFixed(2));
	
	if(video !== null){
		var duration = video.prop("duration");
		var current_time = duration * percent;
		video.prop("currentTime", current_time);
	}
}