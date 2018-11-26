define(['angular', 'size', 'fun'], function(angular, tpl) {
	controller.$inject = ['$scope', '$rootScope', '$http'];

	function controller($scope, $rootScope, $http) {
		var h = $(window).height() - $("#search_bar").height() * 1.47;
		$("#search_show").css('height', h);
		$("#container").focus();
		$('#search_input').focus();
		var $weuiSearchBar = $('#search_bar');
		$weuiSearchBar.addClass('weui_search_focusing');
		// $scope.search_text_on = true; //搜索
	// .on('blur', '#search_input', function() {
	// 		if($(this).val()) {
	// 			$scope.search_text_on = false;
	// 		} else {
	// 			$scope.search_text_on = true;
	// 		}
	// 	})
		$scope.openid = getCookie('openid');
		$scope.pinyinCity=getCookie("pinyinCity");
		$scope.search_on = false; //搜索联想词
		$scope.search_btn = false;//搜索按钮
		$scope.search_can=true;//显示取消按钮
		$('#container').on('focus', '#search_input', function() {
			var $weuiSearchBar = $('#search_bar');
			$weuiSearchBar.addClass('weui_search_focusing');
			$scope.search_btn = true;//显示搜索按钮
			$scope.search_can=false;//隐藏取消按钮
		}).on('input', '#search_input', function() {
			var $searchShow = $("#search_show");
			if($(this).val()) {
				$scope.search_can=false;//隐藏取消按钮
				$scope.search_on = true;
				$scope.search_btn = true;//显示搜索按钮
			} else {
				$scope.search_on = false;
				$scope.search_can=true;//显示取消按钮
				$scope.search_btn = false;//隐藏搜索按钮
			}
		}).on('touchend', '#search_cancel', function() {
			$scope.search_on = false;
			$scope.keyword = '';
		}).on('touchend', '#search_clear', function() {
			$scope.isresult = false;
			$scope.bs.isc = false;
			$scope.search_on = false;
			$scope.keyword = '';
			$scope.search_btn = false;//隐藏搜索按钮
			$scope.search_can=true;//显示取消按钮
		});
		$scope.search_clear = function() {
			$scope.istype = 0;
			$scope.isresult = false;
			$scope.bs.isc = false;
			$scope.search_on = false;
			$scope.keyword = '';
		};
		$scope.textlist = [];
		$scope.typelist = {};
		$scope.loadtext = "正在加载···";
		$scope.list = [];
		//热搜推荐
		$http.get(webset.testapiurl+'search/getHotVideo.json?district=changshashi', {}).success(function(res) {
			console.log('搜索推荐', res.response.responseBody);
			$scope.typelist = res.response.responseBody;
		})
		/*$http.get(webset.testapiurl+'vod/hotsearch.json?appKey=34DB874AF269B539&appScrect=40&did='+$scope.pinyinCity, {}).success(function(res) {
			console.log('搜索推荐', res.response.responseBody);
			$scope.typelist = res.response.responseBody;
		});*/
		$scope.pusharr = function(obj, v) {
			if($scope.typelist[obj] == undefined) {
				$scope.typelist[obj] = [];
			}
			if($scope.typelist[obj].length < 3) {
				$scope.typelist[obj].push(v)
			}
		};
		$scope.seting = {
			"pageNo": 1,
			"pageSize": 15,
			"columnType": "",
			"key": ""
		};
		$scope.searchtype = 0;
		$scope.bs = new botscroll(100, 85); // 滚动事件
		$scope.bs.isc = false;
		$scope.getajax = function() {
			var type 
			if($scope.searchtype == 0) type = '0'
			else if($scope.searchtype == 1) type = '1'
			$http.get(webset.testapiurl+'search/searchLiveAndDemand.json?appKey=34DB874AF269B539&appScrect=40&key=' + $scope.seting.key + '&pageNo=1&pageSize=20&videoType=' + $scope.seting.columnType+'&type='+type+'&district='+$scope.pinyinCity, {}).success(function(res) {
				console.log($scope.seting.key + '关键字' + type + '搜索结果:', res)
				if(res.response.responseHeader.code=="SCC_002"){
					$scope.list = res.response.responseBody.list;
					var data=$scope.list;
					var orderlistUrl = webset.testapiurl + "user/userReserveInfo.json?openId=" + $scope.openid;
					$http.post(orderlistUrl, {}).success(function(e) {
						if(e && e.response.responseHeader.code == 200) {
							$scope.userList = e.response.responseBody;
							var list = $scope.userList,
								len=data.length;
							for(var i = 0; i < len; i++) {
								var lenChild = data[i].epglist.length;
								for(var k= 0; k<lenChild ;k++){
									var dataChild = data[i].epglist;
									var liveStartTime_i = dataChild[k].date + " " + dataChild[k].beginTime;
									var liveEndTime_i = dataChild[k].date + " " + dataChild[k].endTime;
										if(list != undefined && list != '' && list != null) {
											var orderInfo = 'liveStartTime=' + liveStartTime_i + '&liveEndTime=' + liveEndTime_i + '&channelId='+data[i].channelId;
											for(j = 0; j < list.length; j++) {
												var orderInfo_j = 'liveStartTime=' + list[j].liveStartTime + '&liveEndTime=' + list[j].liveEndTime + '&channelId='+list[j].channelId;
												if(orderInfo_j == orderInfo) {
													console.log('已预约节目', orderInfo);
													dataChild[k].isorder = true;
												}
											}
										}
								}
							}
						}
					});
				}else{
					$scope.list = '';
				}		
				$scope.loadtext = "已加载全部数据";
			});
		}

		$scope.bs.getbot = function() {
			$scope.bs.isc = false;
			$scope.seting.pageNo++;
			$scope.getajax();
		}

		$scope.$on("$destroy", function() {
			$scope.bs.isc = false;
		})
		$scope.isresult = false;
		$scope.searchsub = function(i) {
			$scope.search_on = false;
			$scope.searchtype=0;
			if($scope.keyword == undefined || $scope.keyword.length == 0) {
				$('#toast').show();
				setTimeout(function() {
					$('#toast').hide();
				}, 2000);
				return false;
			};
			i != undefined ? $scope.searchtype = i : '';
			$scope._text = $scope.keyword.replace(/\s/ig, '');
			$scope.setlocal($scope._text);
			$scope.seting.key = $scope._text;
			$scope.isresult = true;
			$scope.list = [];
			$scope.sccol(0,'');
		};
		$scope.searchtypefcn = function(i) {
		};
		$scope.keysearch = function(v) {
			$('#search_input').focus();
			$scope.search_on = false;
			$scope.textlist = [];
			$scope.loadtext = "正在加载···";
			$scope.seting.key = v;
			$scope.keyword = v;
			$scope.isresult = true;
			$scope.sccol(0,'');
		}

		$scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
			$scope.bs.setmax($('.html').height());
		});

		$scope.setlocal = function(v) {
			var str = window.localStorage.getItem('hissearch'),
				isin = false,
				strarr = [];
			if(str) {
				str != null ? strarr = str.split(',') : '';
				for(var i = 0; i < 6; i++) {
					if(v == strarr[i]) {
						isin = true;
					}
				}
				if(!isin) {
					if(strarr.length) {
						str = v + ',' + strarr.join(',').substr(0, 200);
					}
				}
			} else {
				str = v;
			}
			window.localStorage.setItem('hissearch', str);
		}

		$scope.keyhistory = window.localStorage.getItem('hissearch') ? window.localStorage.getItem('hissearch').split(',').slice(0, 6) : [];

		if($scope.keyhistory.length == 0) {
			$scope.nohis = true;
		}
		$scope.nohistory = function() {
			$scope.keyhistory = [];
			$scope.nohis = true;
			window.localStorage.setItem('hissearch', '');
		}
		$scope.timeoutid;

		// 检测关键字
		$scope.keylen = function(v){
			if($scope.keyword){
				$scope.search_on = true;
				//联想结果
				$http.get(webset.testapiurl+'search/searchWordAssociate.json?pageNo=1&pageSize=15&key=' + $scope.keyword.replace(/\s/ig, '')+'&district='+$scope.pinyinCity, {}).success(function(res) {
					console.log($scope.keyword + '联想结果：', res,$scope.pinyinCity);
					$scope.textlist = res.response.responseBody;
				});
			}else{
				$scope.search_on = false;
				$scope.isresult = false;
				$scope.bs.isc = false;
			}
		};
		// $scope.typearr = [{
		// 	"k": "全部",
		// 	"v": ""
		// }, {
		// 	"k": "电影",
		// 	"v": "F"
		// }, {
		// 	"k": "电视剧",
		// 	"v": "T"
		// }, {
		// 	"k": "动漫",
		// 	"v": "C"
		// }, {
		// 	"k": "综艺",
		// 	"v": "A"
		// }, {
		// 	"k": "纪录片",
		// 	"v": "D"
		// }]
		$scope.typearr = [{
				"k": "全部",
				"v": ""
			}, {
				"k": "电影",
				"v": "film"
			}, {
				"k": "电视剧",
				"v": "tv"
			}, {
				"k": "动漫",
				"v": "anime"
			}, {
				"k": "综艺",
				"v": "arts"
			}, {
				"k": "纪录片",
				"v": "documentary"
			}];
		$scope.istype = 0;

		$scope.sccol = function(eq, v) {
			$scope.list = [];
			$scope.istype = eq;
			$scope.bs.isc = false;
			$scope.seting.pageNo = 1;
			$scope.seting.columnType = v;
			$scope.loadtext = "正在加载···";
			$scope.getajax();
		}
		$(document).keydown(
			function(e) {
				if(e.keyCode == 13) {
					//enter回车搜索
					$scope.searchsub();
				}
			}
		);
		$scope._delete=false;
		$scope.deleteHtml=function(){
			$scope._delete=true;
		}
		$scope.ordertv = function(data, index, _parent) {
			var startTime,endTime,chaneseName,englishName,title,icon,columnType,videoId;
				startTime=data.epglist[index].beginTime;
				endTime=data.epglist[index].endTime;
				chaneseName=data.zh_name;
				englishName=data.en_name;
				title=data.epglist[index].playTitle;
				icon=data.icon;
				channelId=data.channelId;
				kankeId=data.epglist[index].kankeId;
				vodId='';
				frequence=data.epglist[index].channelTid;
				tsid=data.epglist[index].channelSid.split('_')[1];
				columnType=data.epglist[index].kankeId.split('_')[0];
			var liveStartTime = data.epglist[index].date + " " + startTime;
			var liveEndTime = data.epglist[index].date + " " + endTime;
			var orderUrl = webset.base + "tran?DEEPURL=";
			orderUrl += testapiServerBase + 'version-api/api/v1/user/reserveLive.json?liveStartTime=' + liveStartTime + '&liveEndTime='+ liveEndTime + '&openId=' + $scope.openid + '&channelId='+channelId+'&channelNameZh=' + encodeURI(chaneseName) + '&channelNameEn=' +englishName + '&programName=' + encodeURI(title) +'&isReserve=1&channelPicUrl=' + icon+ '&vodId=' + vodId +'&videoId='+vodId+ '&kankeId=' + kankeId+'&tsid='+tsid+'&SERVICEID='+channelId+'&frequence='+frequence+'&columnType='+columnType;;
				$http.get(orderUrl, {}).success(function(e) {
					if(e && e.response.responseHeader.code == 200) {
						$scope.list[_parent].epglist[index].isorder=true;
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
		}
		$scope.afterTim =function(strattime) {
			var st = new Date(strattime.replace(/-/ig, '/')).getTime(),
				nt = new Date().getTime();
			// et = new Date(time.replace(/-/ig, '/')).getTime();
			if(st >= nt) {
				return true;
			} else {
				return false;
			}
		}
	}
	return {
		controller: controller,
		tpl: tpl
	};
});