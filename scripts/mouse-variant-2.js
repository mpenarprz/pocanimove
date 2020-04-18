document.onmousemove = handleMouseMove;
var video = $("#video");

function createVector(x,y){
	var size = Math.sqrt(Math.pow(x,2) + Math.pow(y,2));
	var vector_x = x / size;
	var vector_y = y / size;
	return {x : vector_x, y : vector_y, size : Math.sqrt(Math.pow(vector_x,2) + Math.pow(vector_y,2))};
}

function handleMouseMove(event) {
	event = event || window.event;
	var ref_vector = createVector(0,-1);
	var half_width = window.innerWidth / 2;
	var half_height = window.innerHeight / 2;
	var x_percent = (event.pageX * 100 / window.innerWidth).toFixed(2);
	var y_percent = (event.pageY * 100 / window.innerHeight).toFixed(2);
	
	var mouse_vector = createVector(event.pageX  - window.innerWidth / 2, event.pageY  - window.innerHeight / 2);
	var cos = ref_vector.x * mouse_vector.x + ref_vector.y* mouse_vector.y;
	var angle = Math.acos(cos);
	var angle_percent = angle/Math.PI;
	var percent = event.pageX > window.innerWidth / 2 ? angle_percent * 0.5 : 0.5 * (2  - angle_percent);
	
	$("#text_coord").text('x: ' + event.pageX + ' y:' + event.pageY + ' x:' + x_percent + '% y:' + y_percent + '%' +
	'ref_vector: [' + ref_vector.x.toFixed(2) + ',' + ref_vector.y.toFixed(2) + '](' + ref_vector.size.toFixed(2) + ')' +
	' mouse_vector: [' + mouse_vector.x.toFixed(2) + ',' + mouse_vector.y.toFixed(2) + '](' + mouse_vector.size.toFixed(2) + ')'+
	' cos: ' + cos.toFixed(2) + ' angle: ' + angle.toFixed(2) + ' angle(%): ' + angle_percent.toFixed(2)+ ' percent(%): ' + percent.toFixed(2));
	
	if(video !== null){
		var duration = video.prop("duration");
		var current_time = duration * percent;
		video.prop("currentTime", current_time);
	}
}