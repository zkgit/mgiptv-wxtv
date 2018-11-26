$(document).ready(function() { //perform actions when DOM is ready
	//图示图片start
	var tipmark=0;
	if (window.touchJs) {
		tipmark = window.touchJs.isShowTips();
	}else{
		tipmark=1;
	}
	if(tipmark==1){
		$('.tip').css('display','');
	}else{
		$('.tip').css('display','none');
	}	
	var tiptouch = document.getElementsByClassName('tip')[0].getElementsByTagName('img')[0];
	tiptouch.addEventListener('touchstart', function(event) {
		$('.tip').css('display','none');
		if (window.touchJs) {
			window.touchJs.preventParentTouchEvent();
			window.touchJs.clickTips();
		}
				
	})
	//图示图片end
	
	
	var z = 0;
	var inAnimation = false;
	$('#pictures img').each(function() {
		z++;
		$(this).css('z-index', z);
	});

	function swapFirstLast(dd, isFirst) {
		if (inAnimation) return false;
		else inAnimation = true;
		var direct, processZindex, direction, newZindex, inDeCrease;
		if (isFirst) {
			processZindex = z;
			direction = '-' ;
			newZindex = 1;
			inDeCrease = 1;
		} else {
			processZindex = 1;
			direction = '';
			newZindex = z;
			inDeCrease = -1;
		}
		if (dd == "up") {
			$('#pictures img').each(function() {
				if ($(this).css('z-index') == processZindex) {
					$(this).animate({
						'top': direction+ $(this).height() + 'px'
					}, 150, function() {
						$(this).css('z-index', newZindex)
							.animate({
								'top': '0'
							}, 200, function() {
								inAnimation = false;
							});
					});
				} else {
					$(this).animate({
						'top': '0'
					}, 150, function() {
						$(this).css('z-index', parseInt($(this).css('z-index')) + inDeCrease); 
					});
				}
			});
		} else {
			$('#pictures img').each(function() {
				if ($(this).css('z-index') == processZindex) {
					$(this).animate({
						'right': direction+ $(this).width() + 'px'
					}, 150, function() {
						$(this).css('z-index', newZindex)
							.animate({
								'right': '0'
							}, 180, function() {
								inAnimation = false;
							});
					});
				} else {
					$(this).animate({
						'top': '0'
					}, 150, function() {
						$(this).css('z-index', parseInt($(this).css('z-index')) + inDeCrease); 
					});
				}
			});
		}
		return false; //don't follow the clicked link
	}
	//滑动手势事件
	window.noscroll = function(event) {
		event.preventDefault();
	}
	document.body.addEventListener('touchmove', noscroll, false);
	document.body.addEventListener('touchstart', function() {});
	var fx = 0,
		fy = 0,
		lx = 0,
		ly = 0,
		po = null,
		ismove = false;
	var touch = document.getElementById('pictures');
	touch.addEventListener('touchstart', function(event) {
		if (window.touchJs) {
			window.touchJs.preventParentTouchEvent();
		}
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
				lx = 0, ly = 0, po = null, ismove = false;
				return swapFirstLast('up', true);
			} else if (po == "right") {
				lx = 0, ly = 0, po = null, ismove = false;
				return swapFirstLast('right', true);
			} else if (po == "bottom") {
				lx = 0, ly = 0, po = null, ismove = false;
				return swapFirstLast('up', false);
			} else {
				lx = 0, ly = 0, po = null, ismove = false;
				return swapFirstLast('ritht', false);
			}
		} else {
			window.location.href = "ac_detail.html";
		}

	})
});