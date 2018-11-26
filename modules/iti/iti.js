define(['angular','size','fun'], function(angular, tpl) {
	controller.$inject = ['$scope', '$rootScope', '$http'];

	function controller($scope, $rootScope, $http) {
		$rootScope.htmlname = 'pglist bgcfff pb60';
		$scope.pinyinCity=getCookie('pinyinCity');
		$scope.sc = GetRequest();
		$scope.seting = {
			"pageNo": 1,
			"pageSize": 12
		};
		$scope.list = [];
		$scope.toptil = '相关推荐';
		$scope.bs = new botscroll(100, 85); // 滚动事件
		$scope.lazy = new lazyload({
			'class': '.lazy',
			'elm': '#J_list',
			'outbot': 100
		})

		$scope.getAjax = function() {
			var urltj = webset.testapiurl + 'iti/iti_vod.json?appKey=D176EB3E8B1F044B&appScrect=64&pageSize=15&pageNo='+$scope.seting.pageNo+'&vodId=' + $scope.sc.vodId+'&kanke_id='+$scope.sc.kankeId+'&districtId='+$scope.pinyinCity;
			$http.post(urltj, {}).success(function(e) {
				console.log('相关推荐', e.response);
				$scope.list = $scope.list.concat(e.response.responseBody.list);
				$scope.bs.fisrt = true;
				$scope.bs.isc = true;
				if (e.response.responseBody.list.length == 15) {
					$scope.bs.isc = true;
					$scope.loadtext = '正在玩命加载...';
				} else {
					$scope.bs.isc = false;
					$scope.loadtext = '已加载全部数据';
				}
			});
		}
		$scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
			$scope.bs.setmax($('.html').height());
			$scope.lazy.setlazy($('.lazy'));
		});

		$scope.getAjax();

		$scope.bs.getbot = function(){
			$scope.bs.isc = false;
			$scope.seting.pageNo++;
			$scope.getAjax();
		}
		$scope.$on("$destroy", function(){
			$scope.bs.isc = false;
		})
	}
	return {
		controller: controller,
		tpl: tpl
	};
});