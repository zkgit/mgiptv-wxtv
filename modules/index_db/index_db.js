define(['angular','size','fun'], function(angular, tpl) {
	controller.$inject = ['$scope', '$rootScope', '$http','$stateParams'];

	function controller($scope, $rootScope, $http,$stateParams) {
		$scope.sc = $stateParams;
		//父级的导航定位
		switch($scope.sc.t)
		{
			case '2':
				$rootScope.mySwiper3.slideTo(2);
				break;
			case '1':
				$rootScope.mySwiper3.slideTo(3);
				break;
			case '3':
				$rootScope.mySwiper3.slideTo(4);
				break;
			case '4':
				$rootScope.mySwiper3.slideTo(5);
				break;
			case '5':
				$rootScope.mySwiper3.slideTo(6);
				break;
		}

		$rootScope.htmlname = 'pglist pb60';
		$scope.issec = true;
		$scope.pinyinCity=getCookie('pinyinCity');
		$scope.bs = new botscroll(100, 85); // 滚动事件
		$scope.lazy = new lazyload({
			'class': '.lazy',
			'elm': '#J_list',
			'outbot': 100
		});

		$http.post(webset.testapiurl + 'vod/poster.json?did='+$scope.pinyinCity+'&poster='+$scope.sc.coltype+'&pageNo=1&pageSize=3&appKey=34DB874AF269B539&appScrect=40', {}).success(function(res) {
			console.log('海报', res);
			var posters = [];
			posters.push(res.response.responseBody[res.response.responseBody.length-1]);
			posters=posters.concat(res.response.responseBody);
			posters.push(res.response.responseBody[0]);
			$scope.poster=posters;
			console.log($scope.poster)
			// $scope.poster=res.response.responseBody;
		});
		$scope.checklast = function($last) {
			if($last) {
				$scope.swipe = new swipe({
					"elm": document.getElementById('J_swipe'),
					"autoplay": 3000
				})
			}
		};
		// $http.post(webset.testapiurl + 'vod/column/category.json?appKey=D176EB3E8B1F044B&appScrect=64', {}).success(function(res) {
		// 	var t = $scope.sc.coltype,
		// 		dt = res.response.responseBody.list,
		// 		len = dt.length;
		// 	for (var i = 0; i < len; i++) {
		// 		if (dt[i].p_type == t) {
		// 			for(var j=0;j<dt[i].sons.length;j++){
		// 				if(dt[i].sons[j].s_name=='类型'){
		// 					$scope.category =dt[i].sons[j].values.slice(1,8);
		// 				}
		// 			}
		// 		}
		// 	}
		// });

		$scope.seting = {
			"pageNo": 1,
			"pageSize": 1
		};
		$scope.list = [];

		$scope.getAjaxList = function() {
			var senturl = webset.testapiurl + 'vod/typeInfo.json?tag=&type='+$scope.sc.coltype+'&pageNo='+$scope.seting.pageNo+'&pageSize='+$scope.seting.pageSize;
			$http.post(senturl, {}).success(function(res) {
				$scope.list = $scope.list.concat(res.response.responseBody.list);
				$scope.bs.fisrt = true;
				$scope.bs.isc = true;
				if (res.response.responseBody.list.length ==$scope.seting.pageSize) {
					$scope.bs.isc = true;
					$scope.loadtext = '正在玩命加载...';
					if(res.response.responseBody.totalrecords=="0"){
						$scope.loadtext = '抱歉暂无数据';
					}
				} else {
					$scope.bs.isc = false;
					$scope.loadtext = '已加载全部数据';
				}
			});
		};

		$scope.getAjaxList();
		$scope.bs.getbot = function() {
			$scope.bs.isc = false;
			$scope.seting.pageNo++;
			$scope.getAjaxList();
		};


		$scope.$on("$destroy", function() {
			$scope.bs.isc = false;
		})
		$scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
			$scope.bs.setmax($('.html').height());
			$scope.lazy.setlazy($('.lazy'));
		});

	}
	return {
		controller: controller,
		tpl: tpl
	};
});