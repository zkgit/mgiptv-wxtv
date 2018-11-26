//判斷是否安裝app，打開app，打開app對應頁面
//<a href="javascript:openApp('')">打开京東</a>
function openApp(url) {
	url = 'openApp.jdMobile://virtual?params={"category":"jump","des":"productDetail","skuId":"952871","sourceType":"JSHOP_SOURCE_TYPE","sourceValue":"JSHOP_SOURCE_VALUE"}'
	var timeout, t = 1000,
		hasApp = true;
	setTimeout(function() {
		if(!hasApp) {
			window.location.href = "http://d.kanketv.com/";
		}
		document.body.removeChild(ifr);
	}, 2000)

	var t1 = Date.now();
	var ifr = document.createElement("iframe");
	ifr.setAttribute('src', url);
	ifr.setAttribute('style', 'display:none');
	document.body.appendChild(ifr);
	timeout = setTimeout(function() {
		var t2 = Date.now();
		if(!t1 || t2 - t1 < t + 100) {
			hasApp = false;
		}
	}, t);
}

function GetRequest() {
	var url = window.location.hash;
	var theRequest = new Object();
	if(url.indexOf("?") != -1) {
		var start = url.indexOf("?"),
			str = url.substr(start + 1);
		strs = str.split("&");
		for(var i = 0; i < strs.length; i++) {
			theRequest[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
		}
	}
	return theRequest;
}

function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg); //匹配目标参数
	if(r != null) return unescape(r[2]);
	return null; //返回参数值
}
$query = function() {
	var aQuery = window.location.href.split("?"); //取得Get参数
	var aGET = new Array();
	if(aQuery.length > 1) {
		var aBuf = aQuery[1].split("&");
		for(var i = 0, iLoop = aBuf.length; i < iLoop; i++) {
			var aTmp = aBuf[i].split("="); //分离key与Value
			aGET[aTmp[0]] = aTmp[1];
		}
	}
	return aGET;
}

function getvtype(str) {
	if(str == "M") {
		return 'film';
	} else if(str == "T") {
		return 'tv';
	} else if(str == "E") {
		return 'arts';
	} else if(str == "C") {
		return 'anime';
	} else if(str == "D") {
		return 'documentary';
	} else {
		return str;
	}
}

function backvurl(arr) {
	var len = arr.length,
		p = ['流畅', '标清', '高清', '超清'],
		src = '';
	var narr = [];
	for(var i = 0; i < len; i++) {
		narr = narr.concat(arr[i]);
	}
	var len = narr.length;

	outerloop:
		for(var i = 0; i < 4; i++) {
			for(var ii = 0; ii < len; ii++) {
				if(narr[ii].high == p[i]) {
					src = narr[ii].iphone;
					break outerloop;
				}
			}
		}
	return src;
}

function aftertime(time) {
	var st = new Date(strattime.replace(/-/ig, '/')).getTime(),
		nt = new Date().getTime(),
		et = new Date(time.replace(/-/ig, '/')).getTime();
	if(st >= nt) {
		return true;
	} else {
		return false;
	}
}

// 底部滚动加载
var botscroll = function(num, shortof) {
	// num 页面底部距屏幕底部多少距离开始加重
	// shortof 自由配置增减距离项
	var _this = this;
	_this.timer = null;
	_this.isc = true; // 是否已加载完毕
	_this.fisrt = false; //首屏加载
	_this.bdh = $('.html').height();
	_this.winh = window.innerHeight;
	_this.max = _this.bdh - shortof - _this.winh - num;
	_this.isoff = false;
	_this.setmax = function(newh) {
		_this.max = newh - shortof - _this.winh - num;
	}
	$(window).scroll(function() {
		if(_this.isoff) {
			return false;
		}
		clearTimeout(_this.timer);
		_this.timer = setTimeout(function() {
			var st = $(window).scrollTop();
			if(_this.max <= st && _this.isc == true) {
				_this.isc = false;
				if(_this.fisrt) {
					_this.getbot();
				}
			}
		}, 10);
	});
	$(window).trigger("scroll");
	return this;
}

var divScroll = function(options) {
	// elm：对象
	// short: 底部距离多少加载
	var _this = this;
	this.opts = options;
	this.seting();
	this.elm.addEventListener('touchstart', function(event) {
		var touches = event.targetTouches;
		_this.fy = touches[0].pageY;
	}, false)
	this.elm.addEventListener('touchmove', function(event) {
		var touches = event.targetTouches;
		_this.ly = touches[0].pageY;
		var cy = _this.fy - _this.ly;
		_this.elm.scrollTop = _this.ofy + cy;
		event.preventDefault();
	}, false)
	this.elm.addEventListener('touchend', function(event) {
		_this.ofy = _this.ofy + _this.fy - _this.ly;
		if(_this.ofy <= 0) {
			_this.ofy = 0;
			_this.elm.scrollTop = _this.ofy;
		} else if(_this.ofy >= _this.inh - _this.h) {
			_this.ofy = _this.inh - _this.h;
			_this.elm.scrollTop = _this.ofy;
		}
		this.fy = this.ly = 0;
	}, false)

	return this;
}
divScroll.prototype.seting = function() {
	var opts = this.opts;
	this.elm = opts.elm;
	this.h = opts.outh;
	this.inh = opts.inh;
	this.fy = this.ly = 0;
	this.ofy = this.elm.scrollTop;
}
divScroll.prototype.seth = function() {
	this.inh = this.elm.children[0].clientHeight;
}

//写cookies 
function setCookie(name, value) {
	var Days = 30;
	var exp = new Date();
	exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
	document.cookie = name + "=" + encodeURI(value) + ";expires=" + exp.toGMTString() + ";path=/";
}
//读取cookies 
function getCookie(name) {
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

	if(arr = document.cookie.match(reg))
	//return unescape(arr[2]); 
		return decodeURI(arr[2]);
	else
		return null;
}
//删除cookies 
function delCookie(name) {
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval = getCookie(name);
	if(cval != null)
		document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

var swipe = function(options) {
	this.opt = options;
	this.setting();
	this.bindevent();
}
swipe.prototype.setting = function() {
	var _this = this;
	var opt = this.opt;
	var outer = opt.elm,
		ls = outer.getElementsByClassName('lis'),
		len = ls.length,
		str = '';
	this.winw = window.innerWidth;
	for(var i = 0; i < len; i++) {
		ls[i].style.cssText = 'transform:translateX(' + (i * 100) + '%);-webkit-transform:translateX(' + (i * 100) + '%);';
		str += '<span class="po"></span>';
	}
	outer.getElementsByClassName('poter')[0].innerHTML = str;
	this.fx = this.lx = this.ox = this.st = 0;
	this.poters = outer.getElementsByClassName('po');
	this.poter();
}
swipe.prototype.bindevent = function() {
	var _this = this;
	this.elm = _this.opt.elm;
	this.outer = this.elm.getElementsByClassName('swipe-box')[0];
	this.elm.addEventListener('touchstart', function(event) {
		var touches = event.targetTouches;
		_this.fx = touches[0].pageX;
	}, false)
	this.elm.addEventListener('touchmove', function(event) {
		var touches = event.targetTouches;
		_this.lx = touches[0].pageX;
		_this.ox = _this.lx - _this.fx;
		_this.outer.style.cssText = 'transform:translateX(' + (_this.ox + _this.st * _this.winw) + 'px);-webkit-transform:translateX(' + (_this.ox + _this.st * _this.winw) + 'px);';
		event.preventDefault();
	}, false)
	this.elm.addEventListener('touchend', function(event) {
		if(Math.abs(_this.ox) <= 50) {
			_this.outer.style.cssText = '-webkit-transform 300ms; transition:transform 300ms;transform:translateX(' + (_this.st * _this.winw) + 'px);-webkit-transform:translateX(' + (_this.st * _this.winw) + 'px);';
		} else {
			_this.ox > 0 ? _this.st++ : _this.st--;
			_this.st <= -3 ? _this.st = -3 : '';
			_this.st >= 0 ? _this.st = 0 : '';
			_this.outer.style.cssText = '-webkit-transform 300ms; transition:transform 300ms;transform:translateX(' + (_this.st * _this.winw) + 'px);-webkit-transform:translateX(' + (_this.st * _this.winw) + 'px);';
		}
		_this.fx = _this.lx = _this.ox = 0;
		_this.poter();
	}, false)
}
swipe.prototype.poter = function() {
	var len = this.poters.length,
		ls = this.poters;
	for(var i = 0; i < len; i++) {
		-this.st == i ? ls[i].setAttribute('class', 'po active') : ls[i].setAttribute('class', 'po');
	}
}

// 懒加载
var lazyload = function(option) {
	function bindappear() { // 绑定事件
		_this.imgs.each(function(i, n) {
			var self = $(this);
			if(self.data('loaded') != 1 && self.attr("original")) {
				self.one("appear", function() {
					var img = new Image,
						src = self.attr("original");
					img.src = src;
					img.onload = function() {
						self.hide().attr("src", src).removeClass('lazy').fadeIn();
					}
					img.onerror = function() {
						self.hide().attr("src", self.attr('error')).removeClass('lazy').fadeIn();
					}
				});
				self.data('loaded', 1);
			}
		});
	}

	function setarr() { // 重置数组
		_this.srcarr = [];
		for(var i = 0; i < _this.imgs.length; i++) {
			_this.srcarr.push(_this.imgs.eq(i).offset().top);
			_this.imgs.eq(i).loaded = true;
		}
	}
	var _this = this;
	_this.imgs = $(option.elm).find(option.class);
	bindappear();
	_this.srcarr = [];
	_this.isoff = false;
	_this.winh = window.innerHeight;
	setarr();

	_this.setlazy = function(imgs) { // 抛出的图片加载事件
		_this.imgs = imgs;
		setarr();
		bindappear();
		$(window).trigger("scroll");
	}

	_this.timer = null;

	$(window).scroll(function() {
		clearTimeout(_this.timer);
		if(_this.isoff) {
			return false;
		}
		_this.timer = setTimeout(function() {
			var scrollTop = $(window).scrollTop();
			for(var i = 0; i < _this.srcarr.length; i++) {
				if(_this.srcarr[i] > 0 && _this.srcarr[i] <= (scrollTop + _this.winh + option.outbot)) {
					_this.imgs.eq(i).trigger("appear");
					_this.srcarr[i] = -1;
				}
			}
		}, 10);
	});
	$(window).trigger("scroll");
	return this;
}

function sentcode(v) {
	$.ajax({
		url: webset.ctrl + 'control?keyCode=' + v + '&boxId=' + getCookie('boxId'),
		data: {},
		type: "GET",
		dataType: 'json',
		success: function(res) {

		}
	});
}

function goBack() {
	if((navigator.userAgent.indexOf('MSIE') >= 0) && (navigator.userAgent.indexOf('Opera') < 0)) { // IE  
		if(history.length > 0) {
			window.history.go(-1);
		} else {
			window.location.href = webset.base;
		}
	} else { //非IE浏览器  
		if(navigator.userAgent.indexOf('Firefox') >= 0 ||
			navigator.userAgent.indexOf('Opera') >= 0 ||
			navigator.userAgent.indexOf('Safari') >= 0 ||
			navigator.userAgent.indexOf('Chrome') >= 0 ||
			navigator.userAgent.indexOf('WebKit') >= 0) {

			if(window.history.length > 1) {
				window.history.go(-1);
			} else {
				window.location.href = webset.base;
			}
		} else { //未知的浏览器  
			window.history.go(-1);
		}
	}
}
//n天后的日期
function GetDateStr(AddDayCount) {
	var dd = new Date();
	dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期 
	var y = dd.getFullYear();
	var m = dd.getMonth() + 1; //获取当前月份的日期 
	var d = dd.getDate();
	if(m < 10) {
		m = '0' + m;
	}
	if(d < 10) {
		d = '0' + d;
	}
	return y + "-" + m + "-" + d;
}