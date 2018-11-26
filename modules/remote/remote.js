 define(['angular', 'size', 'fun'], function(angular, tpl) {
	controller.$inject = ['$scope', '$rootScope', '$http','$timeout'];

	function controller($scope, $rootScope, $http,$timeout) {
		$(".remote-01-01").css('display','none');
		$scope.code = getUrlParam('code');
		$scope.boxid=getCookie('boxId');
		// $scope.openid = getUrlParam('rn');
		$scope.openid = encodeURIComponent( getUrlParam('rn'));


		$http.post(webset.device + '?key=' + $scope.openid + '&type=1', {}).success(function(rest) {
			if(rest && rest.response.responseHeader.code == "200") {
				setCookie("boxId", rest.response.responseBody);
			}
		});


		var boxId;
		$scope.getdname = function() {
			var devicelistUrl = webset.testapiurl + "user/getDevice.json?openId=" + $scope.openid+"&pageNo=1&pageSize=5";
			$http.post(devicelistUrl, {}).success(function(res) {	
				// console.log('设备列表', res);
				// $scope.deviceList = res.responseBody.boxList;
				// $scope.active=res.currentBindBoxId;
				// var v = $scope.active,
				// 	lis = $scope.deviceList,
				// 	len = lis.length;
				// for (var i = 0; i < len; i++) {
				// 	if (lis[i].boxId == v) {
				// 		lis[i].boxName ==null ? '未命名' : lis[i].boxName;
				// 	}
				// }
				console.log('设备列表', res);
				$scope.deviceList = res.responseBody.boxList;
				//新增获取盒子状态
				boxId = getCookie('boxId');
				$scope.boxState();
				if(boxId){
					$scope.dname=res.responseBody.boxList[0].boxName
				}else {
					$scope.dname='未绑定'
				}
			});
		};
		$scope.getdname();

		$rootScope.showremote = false;
		
		window.noscroll = function(event) {
			event.preventDefault();
		}
		document.body.addEventListener('touchmove', noscroll, false);
		$('body').bind('contextmenu', function(e) {
			e.preventDefault();
		})
		document.body.addEventListener('touchstart', function() {});
		$scope.chooseTv=false;
		document.getElementById('choose').addEventListener('touchstart', function(e) {
			if($('#choose').hasClass('active')){
				$scope.chooseTv=false;
				$(".remote-01-01").css('display','none');
				$('#choose').removeClass('active');
			}else{
				//显示选择设备的框
				$scope.chooseTv=true;
				$(".remote-01-01").css('display','block');
				$('#choose').addClass('active');
				//切换设备
				$(".remote-01-01 li:first").css('color','#28cedd');
				$(".remote-01-01 li").click(function(){
					$(this).css('color','#28cedd').siblings().css('color','#d6d6d7');
					$scope.chooseTv=false;
					$(".remote-01-01").css('display','none');
					$('#choose').removeClass('active');
				})
			}
		}, false);

//方向键
		//点击的效果
		document.getElementById('svg').addEventListener('touchstart', function(e) {
			if (e.target.classList[0].indexOf('svg-up') > -1) {
				$('.remote-top').addClass('active');
			} else if (e.target.classList[0].indexOf('svg-right') > -1) {
				$('.remote-right').addClass('active');
			} else if (e.target.classList[0].indexOf('svg-bottom') > -1) {
				$('.remote-bottom').addClass('active');
			} else if (e.target.classList[0].indexOf('svg-left') > -1) {
				$('.remote-left').addClass('active');
			}

		}, false);
		document.getElementById('svg').addEventListener('touchend', function(e) {
			$('.direction').each(function(){
				$(this).removeClass('active');
			});
		}, false);

		//普通点击功能
		$('#svgbox').click(function(e) {
			var v;
			if (e.target.classList[0].indexOf('svg-up') > -1) {
				v='up';
			} else if (e.target.classList[0].indexOf('svg-right') > -1) {
				v='right';
			} else if (e.target.classList[0].indexOf('svg-bottom') > -1) {
				v='down';
			} else if (e.target.classList[0].indexOf('svg-left') > -1) {
				v='left';
			}else{
				return;
			}
			sentcode(v);
			console.log('触摸效果:'+v);
		});
		//持续点击效果
		var tia;
		document.getElementById('svgbox').addEventListener('touchstart', function(e) {
			var v;
			if (e.target.classList[0].indexOf('svg-up') > -1) {
				v='up';
			} else if (e.target.classList[0].indexOf('svg-right') > -1) {
				v='right';
			} else if (e.target.classList[0].indexOf('svg-bottom') > -1) {
				v='down';
			} else if (e.target.classList[0].indexOf('svg-left') > -1) {
				v='left';
			}else{
				return;
			}
			tia = setInterval(function(){
				sentcode(v);
				console.log('触摸效果:'+v);
			},500);
		}, false);
		document.getElementById('svgbox').addEventListener('touchmove', function(e) {
			event.preventDefault();
		});
		document.getElementById('svgbox').addEventListener('touchend', function(e) {
			clearInterval(tia);
		});

		// 1.touchstart: // 手指放到屏幕上的时候触发
		// 2.touchmove: // 手指在屏幕上移动的时候触发
		// 3.touchend: // 手指从屏幕上拿起的时候触发
		// 4touchcancel: // 系统取消touch事件的时候触发。至于系统什么时候会取消，不详

		//数字菜单OK等功能
		var cst='';
		var time
		$('.J_code').click(function() {
			clearTimeout(time)
			var v = $(this).attr('data-keyCode');
			var e = $(this).attr('data-keyNumber');
			setTimeout(function(){
				sentcode(v);
				console.log('单个点击效果:'+v);
			},500);
			if(v>=48&&v<=57){
				cst+=e;
				$scope.$apply(function(){
					$scope.option=cst;
					console.info($scope.option);
				});
					time = setTimeout(function(){
					cst='';
					console.info('执行了空');
					$scope.$apply(function(){
						$scope.option=cst;
					});
				},2000);
			}
		});



		var tid;
		var st='';
		$('.J_code').on('touchstart', function(e) {
			var v = $(this).attr('data-keyCode');
			var e = $(this).attr('data-keyNumber');
			tid = setInterval(function(){
				sentcode(v);
				console.log('连续点击效果:'+v);
				if(v>=48&&v<=57){
					st+=e;
				}
			},500);
		});
		$('.J_code').on('touchmove', function(e) {
			event.preventDefault();
		});


		$('.J_code').on('touchend', function(e) {
			clearInterval(tid);
			// $.numshow(st);
		});


		var fx = 0,
			fy = 0,
			lx = 0,
			ly = 0,
			po = null,
			ismove = false;
		var touch = $($($('.ico-item3-2')[1]).find('a'));
		touch.on('touchstart', function(event) {
			fx = event.originalEvent.touches[0].pageX;
			fy = event.originalEvent.touches[0].pageY;
			console.info(fx,fy)
		}).on('touchmove', function(event) {
			var j = Math.atan2((fy - event.originalEvent.touches[0].pageY), (event.originalEvent.touches[0].pageX - fx));

			if (j >= 0.785 && j <= 2.356) {
				 po = 'up';
			} else if (j >= -0.785 && j < 0.785) {
				 po = 'right';
			} else if (j <= -0.785 && j > -2.356) {
				 po = 'down';
			} else {
				 po = 'left';
			}
			ismove = true;
		}).on('touchend', function() {
			touch.attr('class', 'mt10');
			if (ismove) {
				if (po == "up") {
					touch.attr('class', 'mt10 top');
					sentCode('up');
					setTimeout(function(){
						touch.attr('class', 'mt10')
					},400)
				} else if (po == "right") {
					touch.attr('class', 'mt10 right');
					sentCode('right');
					setTimeout(function(){
						touch.attr('class', 'mt10')
					},400)
				} else if (po == "down") {
					touch.attr('class', 'mt10 bottom');
					sentCode('down');
					setTimeout(function(){
						touch.attr('class', 'mt10')
					},400)
				} else {
					touch.attr('class', 'mt10 left');
					sentCode('left');
					setTimeout(function(){
						touch.attr('class', 'mt10')
					},400)
				}
			} else {
				sentCode('ok');
			}
			lx = 0, ly = 0, po = null, ismove = false;
		}).on('touchstart',function(){
			touch.attr('class', 'mt10 ok');
		});

		var sentCode = function(v) {
			console.log(v);
			sentcode(v);
		};
		$scope.dvshow = false;
		$scope.showdv = function() {
			$scope.dvshow = !$scope.dvshow;
		};

		$scope.changedevice = function(v) {
			$http.post(webset.testapiurl + "user/bind.json?key=" + $scope.openid + "&value=" + v, {}).success(function(res) {
				if(res.response.responseHeader.code == 200) {
					$scope.dvshow = false;
					$scope.dname = name;
					delCookie('pinyinCity');
					$.tipshow({
						'msg': '切换成功！刷新定位',
						'type': 'info'
					});
					$scope.chooseTv=false;
					setCookie("boxId",res.response.responseBody.split(':')[2]);
					$scope.getdname();
					window.location.href='#/index'
				} else {
					$scope.dvshow = false;
					$.tipshow({
						'msg': '切换设备失败',
						'type': 'warning'
					});
				}
			});
		};
		//新增接口获取盒子当前状态
		$scope.boxState = function(){
			$http.post(webset.base + "ctrl/getboxol.json?boxId="+boxId, {}).success(function(res) {
				var code=res.response.responseBody;
				console.info('当前设备状态:'+code);
				if(code=='SUCCESS'){
					$scope.state='在线'
				}else if(code=='user_offline'){
					$scope.state='离线'
				}else if(code=='noboxid'){
					$scope.state='无设备'
				}
			});
		};

		$scope.tpshow = false;
		$scope.showtp = function() {
			$scope.tpshow = !$scope.tpshow;
		}
		$scope.dvscroll = function($last, eq) {
			if ($last) {
				$scope.device = new divScroll({
					elm: $('#J_chose_tv')[0],
					outh: window.rem * 1.55,
					inh: window.rem * 0.44 * (eq + 2)
				})
			}
		}

		$scope.showmodel = "default";
		$scope.showtype = function(type) {
			$("#J_chose_md").find('a').removeClass('active');
			if (type == 'btn') {
				$($("#J_chose_md").find('a')[0]).addClass('active');
				$scope.isshowtype = true;
			} else {
				$($("#J_chose_md").find('a')[1]).addClass('active');
				$scope.isshowtype = false;
			}
			$scope.tpshow = false;
		}

		$scope.numshow = false;
		$scope.shownum = function() {
			if($scope.showmodel == "num"){
				$scope.showmodel = "default";
			}else{
				$scope.showmodel = "num";
			}
		}
		$scope.showgesture=function(){
			if($scope.showmodel == "gesture"){
				$scope.showmodel = "default";
			}else{
				$scope.showmodel = "gesture";
			}
		}

		var winw = window.innerWidth,
			winh = window.innerHeight;
		var maxh = winh - window.rem * 1.54;
		$('#J_svg_box').css('height', maxh);
		$('#J_touch').css('height', maxh - 20);
	}
	return {
		controller: controller,
		tpl: tpl
	};
});