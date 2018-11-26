define(['angular', 'size','fun'], function(angular, tpl) {
	controller.$inject = ['$scope', '$rootScope', '$http'];

	function controller($scope, $rootScope, $http) {
		$rootScope.htmlname = 'pglist  pb60';
		$scope.sc = GetRequest();

		$scope.seting = {
			"pageNo": 1,
			"pageSize": 15
		};
		$scope.elm = {
			"J_second_tr": $('#J_second_tr')
		};
		$scope.list = [];
		$scope.bs = new botscroll(100, 85); // 滚动事件
		$scope.lazy = new lazyload({
			'class': '.lazy',
			'elm': '#J_list',
			'outbot': 100
		});
		$scope.getAjaxList = function() {
			var senturl = webset.testapiurl + 'vod/typeInfo.json?tag='+$scope.sc.tag+'&type='+$scope.sc.coltype+'&pageNo='+$scope.seting.pageNo+'&pageSize='+$scope.seting.pageSize;
			$http.post(senturl, {}).success(function(res) {
				$scope.list = $scope.list.concat(res.response.responseBody[0].list);
				$scope.bs.fisrt = true;
				$scope.bs.isc = true;
				if (res.response.responseBody[0].list.length ==$scope.seting.pageSize) {
					$scope.bs.isc = true;
					$scope.loadtext = '正在玩命加载...';
					if(res.response.responseBody[0].totalrecords=="0"){
						$scope.loadtext = '抱歉暂无数据';
					}
				} else {
					$scope.bs.isc = false;
					$scope.loadtext = '已加载全部数据';
				}
			});
		};

		$scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
			$scope.bs.setmax($('.html').height());
			$scope.lazy.setlazy($('.lazy'));
		});
		$scope.getAjaxList();
		$scope.bs.getbot = function() {
			$scope.bs.isc = false;
			$scope.seting.pageNo++;
			$scope.getAjaxList();
		};

		$scope.$on("$destroy", function() {
			$scope.bs.isc = false;
		})
	}
	return {
		controller: controller,
		tpl: tpl
	};
});