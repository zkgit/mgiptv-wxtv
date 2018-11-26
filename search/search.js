var app = angular.module('myapp', []);
// 底部滚动加载
var botscroll = function(num,shortof){
    // num 页面底部距屏幕底部多少距离开始加重
    // shortof 自由配置增减距离项
    var _this = this;
    _this.timer = null;
    _this.isc = true; // 是否已加载完毕
    _this.fisrt = false; //首屏加载
    _this.bdh = $('.html').height();
    _this.winh = window.innerHeight;
    _this.max = _this.bdh-shortof-_this.winh-num;
    _this.isoff = false;
    _this.setmax = function(newh){
        _this.max = newh-shortof-_this.winh-num;
    }
    $(window).scroll(function(){
        if(_this.isoff){return false;}
        clearTimeout(_this.timer);
        _this.timer = setTimeout(function(){
            var st = $(window).scrollTop();
            if(_this.max<=st && _this.isc == true){
                _this.isc = false;
                if(_this.fisrt){
                    _this.getbot();   
                }
            }
        },10);
    });
    $(window).trigger("scroll");
    return this;
}

			function getlist() {
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
			app.controller('searchCtr', function($scope, $http) {

				$('#container').on('focus', '#search_input', function() {
					var $weuiSearchBar = $('#search_bar');
					$weuiSearchBar.addClass('weui_search_focusing');
				}).on('blur', '#search_input', function() {
					var $weuiSearchBar = $('#search_bar');
					$weuiSearchBar.removeClass('weui_search_focusing');
					if($(this).val()) {
						$('#search_text').hide();
					} else {
						$('#search_text').show();
					}
				}).on('input', '#search_input', function() {
					var $searchShow = $("#search_show");
					if($(this).val()) {
						$searchShow.show();
					} else {
						$searchShow.hide();
					}
				}).on('touchend', '#search_cancel', function() {
					$("#search_show").hide();
					$('#search_input').val('');
				}).on('touchend', '#search_clear', function() {
					$("#search_show").hide();
					$('#search_input').val('');
				});

				$scope.textlist = ['奇幻、科技', '幽默、搞笑', '言情、偶像', '家庭、伦理', '历史、纪传'];
				$scope.typelist = {};
				$scope.loadtext = "正在加载···";
				$scope.list = [];
				$http.get('testJson/hotSearchList.txt', {}).success(function(res) {
					console.log('搜索推荐', res.response);
					$scope.typelist = res.response.responseBody;
				});
				$scope.pusharr = function(obj, v) {
					if($scope.typelist[obj] == undefined) {
						$scope.typelist[obj] = [];
					}
					if($scope.typelist[obj].length < 3) {
						$scope.typelist[obj].push(v)
					}
				}

				$scope.seting = {
					"pageNo": 1,
					"pageSize": 15,
					"columnType": "all",
					"key": ""
				};
				$scope.searchtype = 0;
				$scope.bs = new botscroll(100, 85); // 滚动事件
				$scope.bs.isc = false;

				$scope.getajax = function() {
					//		$http.post(webset.apiurl + 'vod/getHome.json', {}).success(function(res) {
					$http.get('testJson/search' + $scope.searchtype + '.txt', {}).success(function(res) {
						console.log('搜索结果', res)
						$scope.list = (res.responseStatus.object ? (res.responseStatus.object.list ? res.responseStatus.object.list : '') : '');
					});
					//			var senturl = webset.apiurl + 'vod/serach.json',
					//				data = {
					//					"columnType": $scope.seting.columnType,
					//					"key": $scope.seting.key,
					//					"pageNo": $scope.seting.pageNo,
					//					"pageSize": 15
					//				};
					//
					//			var transform = function(data) {
					//				return $.param(data);
					//			};
					//
					//			$http.post(senturl, data, {
					//				headers: {
					//					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
					//				},
					//				transformRequest: transform
					//			}).success(function(res) {
					//				console.log('搜索结果', res.response)
					//				$scope.list = $scope.list.concat(res.response.responseBody.list);
					//				$scope.bs.fisrt = true;
					//				if (res.response.responseBody.list.length < 15) {
					//					$scope.bs.isc = false;
					//					$scope.loadtext = res.response.responseBody.list.length == 0 ? "未搜索到相关数据" : "已加载全部数据";
					//				} else {
					//					$scope.bs.isc = true;
					//				}
					//			});
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
					if($scope.keyword == undefined || $scope.keyword.length == 0) {
						$.tipshow({
							'msg': '关键字不可为空',
							'type': 'warning'
						});
						return false;
					};
					$("#search_show").hide();
					i != undefined ? $scope.searchtype = i : '';
					$scope._text = $scope.keyword.replace(/\s/ig, '');
					$scope.setlocal($scope._text);
					$scope.seting.key = $scope._text;
					$scope.isresult = true;
					$scope.list = [];
					$scope.getajax();
				}
				$scope.searchtypefcn = function(i) {

				}
				$scope.keysearch = function(v) {
					$scope.loadtext = "正在加载···";
					$scope.seting.key = v;
					$scope.keyword = v;
					$scope.isresult = true;
					$scope.getajax();
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

				$scope.keyup = function() {
					if($scope.keyword.length == 0) {
						$scope.isresult = false;
						$scope.bs.isc = false;
					} else {

					}
				}

				$scope.typearr = [{
					"k": "全部",
					"v": "all"
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
				}]
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
			});
			app.filter(
				"mytime", [function() {
					return function(str) {
						//取日期
						var tem = str.slice(0, 10);
						//时间
						var tem2 = str.slice(10, 16)
						var now = GetDateStr(0);
						var tomorrow = GetDateStr(1);
						if(tem == now) {
							return '今天' + tem2;
						} else if(tem == tomorrow) {
							return '明天' + tem2;
						} else {
							var a = tem.slice(5, 10);
							return a + tem2;
						}
					}
				}]
			)