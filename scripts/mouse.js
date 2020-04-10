document.onmousemove = handleMouseMove;

function handleMouseMove(event) {
	event = event || window.event;
	var x_percent = (event.pageX * 100 / window.innerWidth).toFixed(2);
	var y_percent = (event.pageY * 100 / window.innerHeight).toFixed(2);
	$("#text_coord").text('x: ' + event.pageX + ' y:' + event.pageY + ' x:' + x_percent + '% y:' + y_percent + '%');
}