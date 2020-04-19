var FPS = 60;
var last_refresh = 0;
var throttle_threshold = 1000 / FPS;

function throttle(){
	var now = Date.now();
	var test = now - last_refresh > throttle_threshold;
	if(test){
		last_refresh = now;
	}
	return test;
}