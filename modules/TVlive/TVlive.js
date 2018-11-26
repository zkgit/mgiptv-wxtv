define(['angular','wxshare', 'size', 'fun', 'slide'], function(angular, tpl) {
	controller.$inject = ['$scope', '$rootScope', '$http'];

	function controller($scope, $rootScope, $http) {
		$scope.fold2 = true;
		$scope.openid=getCookie('openid');
		$scope.pinyinCity=getCookie('pinyinCity');
		$scope.boxId=getCookie('boxId');
		$scope.sc = GetRequest();
		$scope.rem = window.rem / 100;
		// $scope.lindex = getCookie('zbno')?getCookie('zbno'):0;
		// $http.post(webset.testapiurl + 'epg/liveType.json?did='+$scope.pinyinCity, {}).success(function(res) {
		// 	$scope.sectype =res.response.responseBody;
		// 	$scope.change($scope.lindex,$scope.sectype[getCookie('zbno')?getCookie('zbno'):0].channel_type,$scope.sectype[getCookie('zbno')?getCookie('zbno'):0].channel_en);
		// });
		
		$scope.unfold = function(i) {
			$scope.fold2 = !$scope.fold2;
		};
		$scope.elm = {
			"tody_scroll": $('#tody_scroll'),
			'J_second':$('#J_second')
		};
		$scope.elm.tody_scroll.css('height', window.innerHeight-window.rem*0.44);
		$scope.loadtext = "正在玩命加载...";
		$scope.leftbar = ["00:00", "02:00", "04:00", "06:00", "08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "22:00"];
		$scope.leftbarOn = getperiod();
		$scope.isload = true;
		$scope.change = function(v,api) {
			$scope.loadtext = "正在玩命加载...";
			// $scope.lindex = eq;
			if(v == "hot") {
				$scope.tindex = 1;
			}else if(v == "hottypes"){
				$scope.tindex = 2;
			}else if(v == "todayview") {
				$scope.tindex = 3;
			} else if(v == 'category') {
				$scope.tindex = 4;
			}
			$scope.changecn(v,api);
			// setCookie('zbno',eq);
			// $scope.mySwiper=null;
		};
		
		
		$scope.lazy = new lazyload({
			'class': '.lazy',
			'elm': '#J_list',
			'outbot': 100
		});
		
		//滑动分页
		$scope.bs = new botscroll(100, 85); // 滚动事件
		$scope.seting = {
			"pageNo": 1
		};

		$scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent,element) {
			var repeatId = element.parent().attr("repeat-id");
			switch (repeatId){
				case "r1":
					var elms = $scope.elm.J_second;
					var eq = parseInt(elms.find('.active').attr('eq'));
					elms.scrollLeft((eq) * 40 * $scope.rem);
					break;
				case "r2":
					$scope.bs.setmax($('.html').height());
					$scope.lazy.setlazy($('.lazy'));
					if($scope.zbtypelistLate.length>=2){
						$scope.mySwiper = new Swiper('.swiper-container',{
							initialSlide :1,
							slidesPerView : 3,
							centeredSlides : true,
							observer:true,
							watchSlidesProgress : true,
							watchSlidesVisibility : true,
							slideVisibleClass : 'my-slide-visible',
						})
						$('.swiper-wrapper').css("transform","translate3d(0, 0, 0)")
					}else{
						$scope.mySwiper = new Swiper('.swiper-container',{
							initialSlide :0,
							slidesPerView : 3,
							centeredSlides : true,
							observer:true,
							watchSlidesProgress : true,
							watchSlidesVisibility : true,
							slideVisibleClass : 'my-slide-visible'
						})
					}
					break;
			}
		});
		$scope.loadtextTonight=false;
		$scope.changecn = function(v,api) {
			$scope.loadtextTonight=false;
			$scope.isload = true;
			$scope.seting.pageNo=1;
			if(v == "hot") {
				$scope.bs.isc = false;
				$scope.zblist=[];
				$scope.currenthot();
			}
			 else if(v == "hottypes"){
				$scope.bs.isc = false;
				$scope.zbtypelistNow=[];
				$scope.zbtypelistLate=[];
				$scope.zbtypelistTonight=[];
				$scope.hots(v,api);
			}else if(v == "todayview") {
				$scope.bs.isc = false;
				$scope.epgToday=[];
				$scope.changetime($scope.leftbarOn);
			} else if(v == 'category') {
				$scope.bs.isc = false;
				$scope.livecates=[];
				$scope.livecate(v,api);
			}
		};

		$scope.currenthot = function() {
			$scope.isload = false;
			$http.post(webset.testapiurl + 'vod/hots.json?pageNo='+$scope.seting.pageNo+'&pageSize=15&appKey=34DB874AF269B539&appScrect=40&did='+$scope.pinyinCity, {}).success(function(res) {
				console.log('当前热播', res);
				$scope.zblist =$scope.zblist.concat(res.response.responseBody.list) ;
				$scope.bs.fisrt = true;
				$scope.bs.isc = true;
				if (res.response.responseBody.totalrecords == 15) {
					$scope.loadtext = "正在玩命加载...";
					$scope.bs.isc = true;
				} else {
					$scope.bs.isc = false;
					$scope.loadtext = '已加载全部数据';
				}

			});
		};
		$scope.bs.getbot = function() {
			$scope.bs.isc = false;
			$scope.seting.pageNo++;
			$scope.currenthot();
		};

		$scope.hots = function(v,api) {
			$scope.classId = api;
			//正在播出
			$http.post(webset.testapiurl + 'vod/hottypes.json?type=' +api+'&times=now'+'&did='+$scope.pinyinCity, {}).success(function(res) {
				$scope.loadtext="";
				if(res) {
					console.log('直播分类-now' + v, res, res.response.responseBody);
					$scope.zbtypelistNow = res.response.responseBody.list;
				}else{
					$scope.loadtextNow = true;
				}
			});
			//即将播出
			$http.post(webset.testapiurl + 'vod/hottypes.json?type=' + api+'&times=late'+'&did='+$scope.pinyinCity, {}).success(function(res) {
				$scope.loadtext="";
				if(res) {
					console.log('直播分类-late' + v, res, res.response.responseBody);
					$scope.zbtypelistLate = res.response.responseBody.list;
					var data = $scope.zbtypelistLate,
						gt = 0,
						len = $scope.zbtypelistLate.length,
						t = new Date(),
						tm = t.getTime(),
						tstr = $scope.dates.replace(/-/ig, '/');
					//新增start
					for(var i = 0; i < len; i++) {
						var nt = new Date(tstr + ' ' + data[i].epgs[0].startTime).getTime();
						if(t < nt) {
							data[i].order_active = true;
						}
					}
					//获取已经预约的节目改变界面预约状态
					// $http.post(webset.testapiurl + "user/userReserveInfo.json?openId=" + $scope.openid, {}).success(function(e) {
					// 	if(e && e.response.responseHeader.code == 200) {
					// 		$scope.userList = e.response.responseBody;
					// 		var list = $scope.userList;
					// 		for(var i = 0; i < $scope.zbtypelistLate.length; i++) {
					// 			var liveStartTime_i = $scope.dates + " " + data[i].epgs[0].startTime;
					// 			var liveEndTime_i = $scope.dates + " " + data[i].epgs[0].endTime;
					// 			if(list != undefined && list != '' && list != null) {
					// 				var orderInfo = 'liveStartTime=' + liveStartTime_i + '&liveEndTime=' + liveEndTime_i + '&channelId='+data[i].epgs[0].channel_id;
					// 				for(j = 0; j < list.length; j++) {
					// 					var orderInfo_j = 'liveStartTime=' + list[j].liveStartTime + '&liveEndTime=' + list[j].liveEndTime + '&channelId='+list[j].channelId;
					// 					if(orderInfo_j == orderInfo) {
					// 						console.log('已预约节目', orderInfo);
					// 						data[i].isorder = true;
					// 					}
					// 				}
					// 			}
					// 		}
					// 	}
					// });
				}else{
					$scope.loadtextLate = true;
				}
			});
			//今晚播出
			$http.post(webset.testapiurl + 'vod/hottypes.json?type=' +api+'&times=tonight'+'&did='+$scope.pinyinCity, {}).success(function(res) {
				$scope.loadtext="";
				if(res) {
					console.log('直播分类-tonight' + v, res, res.response.responseBody);
					$scope.zbtypelistTonight = res.response.responseBody.list;
					var data = $scope.zbtypelistTonight;
					//获取已经预约的节目改变界面预约状态
					// $http.post(webset.testapiurl + "user/userReserveInfo.json?openId=" + $scope.openid, {}).success(function(e) {
					// 	if(e && e.response.responseHeader.code == 200) {
					// 		$scope.userList = e.response.responseBody;
					// 		var list = $scope.userList;
					// 		for(var i = 0; i < $scope.zbtypelistTonight.length; i++) {
					// 			var liveStartTime_i = $scope.dates + " " + data[i].epgs[0].startTime;
					// 			var liveEndTime_i = $scope.dates + " " + data[i].epgs[0].endTime;
					// 			if(list != undefined && list != '' && list != null) {
					// 				var orderInfo = 'liveStartTime=' + liveStartTime_i + '&liveEndTime=' + liveEndTime_i + '&channelId='+data[i].epgs[0].channel_id;
					// 				for(j = 0; j < list.length; j++) {
					// 					var orderInfo_j = 'liveStartTime=' + list[j].liveStartTime + '&liveEndTime=' + list[j].liveEndTime + '&channelId='+list[j].channelId;
					// 					if(orderInfo_j == orderInfo) {
					// 						console.log('已预约节目', orderInfo);
					// 						data[i].isorder = true;
					// 					}
					// 				}
					// 			}
					// 		}
					// 	}
					// });
				}else{
					$scope.loadtextTonight = true;
				}
			});
		};
		//今日看点
		$scope.changetime = function(eq) {
			$scope.leftbarOn = eq;
			var time = parseInt(eq.split(':')[0]) + 2;
			time = time < 10 ? '0' + time : time;
			$scope.nextbar = time + ':00';
			$http.post(webset.testapiurl + 'epg/epgToday.json?districtEnName='+$scope.pinyinCity+'&startTime=' + $scope.leftbarOn + '&endTime=' + $scope.nextbar + '&pageNo=1&pageSize=50&appKey=34DB874AF269B539&appScrect=40', {}).success(function(res) {
				$scope.loadtext = "";
				console.log('今日看点', res);
				$scope.epgToday = res.response.responseBody.list;
				if($scope.epgToday.length==0||res.response.responseHeader.code!='SCC_002'){
					$scope.loadtext = "暂无数据";
				}
				var data = $scope.epgToday;
				//获取已经预约的节目改变界面预约状态
				$http.post(webset.testapiurl + "user/userReserveInfo.json?openId=" + $scope.openid, {}).success(function(e) {
					if(e && e.response.responseHeader.code == 200) {
						$scope.userList = e.response.responseBody;
						var list = $scope.userList;
						for(var i = 0; i < $scope.epgToday.length; i++) {
							var liveStartTime_i = $scope.dates + " " + data[i].startTime;
							var liveEndTime_i = $scope.dates + " " + data[i].endTime;
							if(list != undefined && list != '' && list != null) {
								var orderInfo = 'liveStartTime=' + liveStartTime_i + '&liveEndTime=' + liveEndTime_i + '&channelId='+data[i].channelId;
								for(j = 0; j < list.length; j++) {
									var orderInfo_j = 'liveStartTime=' + list[j].liveStartTime + '&liveEndTime=' + list[j].liveEndTime + '&channelId='+list[j].channelId;
									if(orderInfo_j == orderInfo) {
										console.log('已预约节目', orderInfo);
										data[i].isorder = true;
									}
								}
							}
						}
					}
				});
			});
		};
		//央视、卫视、本地频道
		$scope.livecate = function(v,api) {
			$http.get(webset.testapiurl + 'epg/liveCate.json?typeIds=' +api + '&className='+$scope.pinyinCity+'&pageNo=1&pageSize=15&appKey=34DB874AF269B539&appScrect=40', {}).success(function(res) {
				$scope.loadtext = "";
				console.log(v, res);
				$scope.livecates = res.response.responseBody.list[0].channels;
				if($scope.livecates.length==0||res.response.responseHeader.code!=200){
					$scope.loadtext = "暂无数据";
				}
				var data = $scope.livecates;
				//获取已经预约的节目改变界面预约状态
				$http.post(webset.testapiurl + "user/userReserveInfo.json?openId=" + $scope.openid, {}).success(function(e) {
					if(e && e.response.responseHeader.code == 200) {
						$scope.userList = e.response.responseBody;
						var list = $scope.userList;
						for(var i = 0; i <$scope.livecates.length; i++) {
							for(var k = 0;k<data[i].epgs.length; k++){
								var liveStartTime_i = $scope.dates + " " + data[i].epgs[k].startTime;
								var liveEndTime_i = $scope.dates + " " + data[i].epgs[k].endTime;
								if(list != undefined && list != '' && list != null) {
									var orderInfo = 'liveStartTime=' + liveStartTime_i + '&liveEndTime=' + liveEndTime_i + '&channelId='+data[i].channelId;
									for(j = 0; j < list.length; j++) {
										var orderInfo_j = 'liveStartTime=' + list[j].liveStartTime + '&liveEndTime=' + list[j].liveEndTime + '&channelId='+list[j].channelId;
										if(orderInfo_j == orderInfo) {
											console.log('已预约节目', orderInfo);
											data[i].isorder = true;
										}
									}
								}
							}
						}
					}
				});
			});
		};
		// 地方台
		// $scope.placeinit = function() {
		// 	$http.get(webset.testapiurl + 'epg/LOCAL.json?localName=' + $scope.pinyinCity + '&appKey=34DB874AF269B539&appScrect=40', {}).success(function(res) {
		// 		console.log($scope.pinyinCity + ':', res);
		// 		// $scope.livecates = res.response.responseBody.list[0].channels;
		// 		$scope.loadtext = "加载完成";
		// 	});
		// }

		$scope.dates = GetDateStr(0);
		$scope.ordertv = function(data, index,type) {
			var startTime,endTime,chaneseName,englishName,title,icon,columnType,videoId;
			if(type=='type'||type=='tonight'){
				startTime=data.startTime?data.startTime:data.epgs[0].startTime;
				endTime=data.endTime?data.endTime:data.epgs[0].endTime;
				chaneseName=data.chaneseName?data.chaneseName:data.epgs[0].chaneseName;
				englishName=data.englishName?data.englishName:data.epgs[0].englishName;
				title=data.oriTitle?data.oriTitle:data.title;
				icon=data.icon2?data.icon2:data.epgs[0].icon2;
				channelId=data.epgs[0].channel_id;
				kankeId=data.kankeid;
				vodId=data.videoId;
				frequence='';//为了防止传送undefined，数据暂无vodId，暂时传空值
				tsid='';//为了防止传送undefined，数据暂无vodId，暂时传空值;
				columnType=data.kankeid.split('_')[0];
			}else if(type=='today'){
				console.info(2)
				//$event.stopPropagation();
				// $event.preventDefault();
				startTime=data.startTime;
				endTime=data.endTime;
				chaneseName=data.channelName;
				englishName=data.channelKen;
				title=data.videoTitle;
				icon='http://ikanpic.kanketv.com/image/live/icon2/'+data.channelKen+'.png';
				channelId=data.channelId;
				kankeId=data.kankeId;
				vodId='';//为了防止传送undefined，数据暂无vodId，暂时传空值
				frequence='';//为了防止传送undefined，数据暂无vodId，暂时传空值
				tsid='';//为了防止传送undefined，数据暂无vodId，暂时传空值;
				columnType=data.kankeId.split('_')[0];
			}else if(type=='live'){
				console.info(3)
				startTime=data.epgs[1].startTime;
				endTime=data.epgs[1].endTime;
				chaneseName=data.zh_name;
				englishName=data.en_name;
				title=data.epgs[1].videoTitle;
				icon=data.icon2;
				channelId=data.channelId;
				kankeId=data.epgs[1].kankeId;
				vodId='';//为了防止传送undefined，数据暂无vodId，暂时传空值
				frequence='';//为了防止传送undefined，数据暂无vodId，暂时传空值
				tsid='';//为了防止传送undefined，数据暂无vodId，暂时传空值;
				columnType=data.epgs[1].kankeId.split('_')[0];
			}
			var liveStartTime = $scope.dates + " " + startTime;
			var liveEndTime = $scope.dates + " " + endTime;
			//预约节目
			var orderUrl = webset.base + "tran?DEEPURL=";
			orderUrl += testapiServerBase + 'api/v1/user/reserveLive.json?liveStartTime=' + liveStartTime + '&liveEndTime='+ liveEndTime + '&openId=' + $scope.openid + '&channelId='+channelId+'&channelNameZh=' + encodeURI(chaneseName) + '&channelNameEn=' +englishName + '&programName=' + encodeURI(title) +'&isReserve=1&channelPicUrl=' + icon+ '&vodId=' + vodId +'&videoId='+vodId+ '&kankeId=' + kankeId+'&tsid='+tsid+'&SERVICEID='+channelId+'&frequence='+frequence+'&columnType='+columnType;
			$http.get(orderUrl, {}).success(function(e) {
				console.log('预约节目', e);
				if(e && e.response.responseHeader.code == 200) {
					if(type=='type'){
						$scope.zbtypelistLate[index].isorder=true;
					}else if(type=='tonight'){
						$scope.zbtypelistTonight[index].isorder=true;
					} else if(type=='today'){
						$scope.epgToday[index].isorder=true;
					}else if(type=='live'){
						$scope.livecates[index].isorder=true;
					}
					$.tipshow({
						'msg': '预约成功',
						'type': 'success'
					});
				} else {
					$.tipshow({
						'msg': '预约失败',
						'type': 'warning'
					});
				}
			});
		};
		//直播推送
		$scope.zbPlayLive=function(tsid,serviceid,zh_name,frequence){
			var senturl = webset.ctrl + 'playLive.json',
				data = {
					"boxId": $scope.boxId,
					"networkid":"1",
					"tsid":tsid,
					"serviceid":serviceid,
					"zh_name":zh_name,
					"frequence":frequence,
					'citycode':$scope.pinyinCity
				};
			var transform = function(data) {
				return $.param(data);
			};
			$http.post(senturl, data, {
				headers: {
					"Accept":"text/html;charset=UTF-8",
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
				},
				transformRequest: transform
			}).success(function(res) {
				console.log('直播电视播放:', res);
				if(res && res.response.responseHeader.code == "200") {
					$scope.addhistory();
					$.tipshow({
						'msg': '推送成功',
						'type': 'success'
					});
				} else {
					$.tipshow({
						'msg': '推送失败',
						'type': 'warning'
					});
				}
			});
		};
		$scope.change($scope.sc.type,$scope.sc.enName);
	}
	return {
		controller: controller,
		tpl: tpl
	};
});