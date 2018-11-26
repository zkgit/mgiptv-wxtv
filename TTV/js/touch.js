window.noscroll = function(event) {
	event.preventDefault();
}
document.body.addEventListener('touchmove', noscroll, false);

document.body.addEventListener('touchstart', function() {});

$('.J_code').click(function() {
	var v = $(this).attr('data-keyCode');
	sentcode(v);
	console.log(v)
	return false;
});

var fx = 0,
	fy = 0,
	lx = 0,
	ly = 0,
	po = null,
	ismove = false;
//var touch = document.getElementsByTagName('body')[0];
var touch=document.getElementById('pictures');
touch.addEventListener('touchstart', function(event) {
	fx = event.touches[0].pageX;
	fy = event.touches[0].pageY;

})
touch.addEventListener('touchmove', function(event) {
	var j = Math.atan2((fy - event.touches[0].pageY), (event.touches[0].pageX - fx));
	if (j >= 0.785 && j <= 2.356) {
		po = 'top';
	} else if (j >= -0.785 && j < 0.785) {
		po = 'right';
	} else if (j <= -0.785 && j > -2.356) {
		po = 'bottom';
	} else {
		po = 'left';
	}
	ismove = true;
})
touch.addEventListener('touchend', function() {
	if (ismove) {
		if (po == "top") {
			sentCode('up');
		} else if (po == "right") {
			sentCode('right');
		} else if (po == "bottom") {
			sentCode('bottom');
		} else {
			sentCode('left');
		}
	} else {
		sentCode('ok');
	}

	lx = 0, ly = 0, po = null, ismove = false;

})

var sentCode = function(v) {
	console.log(v);
	if(v=="up"){
		return swapFirstLast(true);
	}
}