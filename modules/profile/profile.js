define(['angular','size', 'fun'], function(angular, tpl) {
	controller.$inject = ['$scope', '$http', '$rootScope'];

	function controller($scope, $http, $rootScope) {
		$scope.sc = GetRequest();
		$scope.fold = true;
		$scope.pinyinCity=$scope.sc.did?$scope.sc.did:getCookie('pinyinCity');
		$scope.unfold = function() {
			$scope.fold = !$scope.fold;
			if($scope.fold) {
				$scope.introduce = $scope.actor0.introduction.slice(0, 40) + '...';
			} else {
				$scope.introduce = $scope.actor0.introduction;
			}
		}
		var dmurl = webset.testapiurl + 'recommend/star/profiles.json?appKey=D176EB3E8B1F044B&appScrect=64&name=' + $scope.sc.name;
		$http.post(dmurl, {}).success(function(e) {
			console.log('明星列表', e);
			$scope.actor0 = e.responseBody[0];
			$scope.introduce = $scope.actor0.introduction.slice(0, 40) + '...';
		});


		$scope.seting = {
			"pageNo": 1,
			"pageSize": 6
		};

		$scope.tjlist = [];
		$scope.bs = new botscroll(100, 85); // 滚动事件
		$scope.lazy = new lazyload({
			'class': '.lazy',
			'outbot': 100
		});
		$scope.getAjaxList = function() {
			var urltj =webset.testapiurl + 'recommend/people/related.json?pageNo='+$scope.seting.pageNo+'&pageSize='+$scope.seting.pageSize+'&appKey=D176EB3E8B1F044B&appScrect=64&columnType=all&actorId=' + $scope.sc.actorId+'&did='+$scope.pinyinCity;
			$scope.tjshow = true;
			$http.post(urltj, {}).success(function(res) {
				$scope.bs.fisrt = true;
				$scope.bs.isc = true;
				if (res.responseBody) {
					$scope.tjlist = $scope.tjlist.concat(res.responseBody);
					$scope.bs.isc = true;
					if(res.responseBody.length<6){
						$scope.loadtext = '';
					}else {
						$scope.loadtext = '正在玩命加载...';
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