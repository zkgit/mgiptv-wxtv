define(['angular',  'size', 'fun'], function(angular, tpl) {
	controller.$inject = ['$scope', '$rootScope', '$http'];

	function controller($scope, $rootScope, $http) {
		$rootScope.htmlname = 'bgcfff';
		$scope.headimg = decodeURIComponent(getCookie('headimgurl'));
		$scope.nick=decodeURIComponent(getCookie('nickname'));
		$scope.token = getCookie('token');
		//直播标签记录问题处理
		setCookie('zbno',0);
		$scope.orderList = function(){
			$http.post(webset.testapiurl + 'user/history/list.json?token=' + $scope.token + '&behaviorType=history&pageNo=1&pageSize=20&appKey=D176EB3E8B1F044B&appScrect=64', {}).success(function (res) {
				if (res && res.response.responseHeader.code == 200){
						$scope.newhistory = res.response.responseBody.list;
				}
			});
		};
		$scope.orderList();
	}
	return {
		controller: controller,
		tpl: tpl
	};
});