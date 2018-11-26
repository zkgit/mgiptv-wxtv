define(['angular', 'size','fun'], function(angular, tpl) {
	controller.$inject = ['$scope', '$rootScope', '$http'];

	function controller($scope, $rootScope, $http) {
		$rootScope.htmlname = 'pglist bgcfff pb60';
		$scope.sc = GetRequest();
		$scope.pinyinCity=getCookie('pinyinCity');

		$scope.seting = {
			"pageNo": 1,
			"pageSize": 15,
			"地区":"",
			"排序": "",
			"tag": "",
			"年份": "",
			"来源":"",
			"datasec": true
		};
		if($scope.sc.tag){
			$scope.seting.tag=$scope.sc.tag;
		}
		$scope.elm = {
			"choosetable": $('#choosetable')
		};
		$scope.list=[];
		//循环列表展示二级菜单
		$scope.toptil = $scope.sc.title ? ['电影', '电视剧', '综艺', '动漫', '纪录片','相关推荐'][$scope.sc.title-1] : ''


		$scope.bs = new botscroll(100, 85); // 滚动事件
		$scope.lazy = new lazyload({
			'class': '.lazy',
			'elm': '#J_list',
			'outbot': 100
		});

		$scope.getAjax = function() {
			var senturl = webset.testapiurl + 'search/siftings.json',
				data = {
					"videoType": $scope.sc.coltype,
					"region": $scope.seting.地区,
					"year": $scope.seting.年份,
					"source": $scope.seting.来源,
					"tag": $scope.seting.tag,
					"district":$scope.pinyinCity,
					"pageSize": 15,
					"pageNo": $scope.seting.pageNo,
					"sortBy":"",
					"appKey":"34DB874AF269B539",
					"appScrect":"40"
				};
			var transform = function(data) {
				return $.param(data);
			};
			$http.post(senturl, data, {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
				},
				transformRequest: transform
			}).success(function(res) {
				if(res.response.responseHeader.code=='SCC_002'){
					$scope.list = $scope.list.concat(res.response.responseBody.list);
					$scope.bs.fisrt = true;
					$scope.bs.isc = true;

					if (res.response.responseBody.currentPage != res.response.responseBody.totalPage) {
						$scope.bs.isc = true;
						$scope.loadtext = '正在玩命加载...';
						if(res.response.responseBody.totalrecords=="0"){
							$scope.loadtext = '抱歉暂无数据';
						}
					} else {
						$scope.bs.isc = false;
						$scope.loadtext = '已加载全部数据';
					}
					console.log('筛选结果', $scope.list);
				}
			});
		}
		$scope.getAjax();

		$scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent,element) {
			var repeatId = element.parent().attr("repeat-id");
			switch (repeatId){
				case "r1":
					var elms = $('.tabletype');
					var index = elms.find('.active').index();
					elms.scrollLeft(0.46*window.rem*index-0.46*window.rem*3);
					break;
				case "r2":
					$scope.bs.setmax($('.html').height());
					$scope.lazy.setlazy($('.lazy'));
					break;
			}


		});

		$scope.bs.getbot = function() {
			$scope.bs.isc = false;
			$scope.seting.pageNo++;
				$scope.getAjax();
		}
		//筛选
			$http.post(webset.testapiurl + 'vod/column/category.json?appKey=D176EB3E8B1F044B&appScrect=64', {}).success(function(res) {
				console.log('选择条件', res);
				var t = $scope.sc.coltype,
					dt = res.response.responseBody.list,
					len = dt.length;
				for (var i = 0; i < len; i++) {
					if (dt[i].p_type == t) {
						$scope.category = dt[i].sons;
					}
				}
			});
			$scope.elm.choosetable.on('click', '.type-li', function() {
				var self = $(this),
					tp = self.data('type')=='类型'?'tag':self.data('type');
				self.addClass('active').siblings().removeClass('active');
				$scope.seting[tp] = self.data('value');
				$scope.getAjax();
				$scope.list=[];
				$scope.loadtext = '正在玩命加载...';


			});


		$scope.$on("$destroy", function() {
			$scope.bs.isc = false;
		})
	}
	return {
		controller: controller,
		tpl: tpl
	};
});