define(['angular', 'size','fun'], function(angular, tpl) {
	controller.$inject = ['$scope', '$rootScope', '$http'];

	function controller($scope, $rootScope, $http) {
		$scope.openid = getCookie('openid');

		$scope.bangding = function() {
			if ($scope.key == undefined || $scope.key.replace(/\s/ig, '').length == 0) {
				$.tipshow({
					'msg': '设备码不可为空',
					'type': 'warning'
				});
				return false;
			}
			
			$http.post(webset.device + '?key=' + $scope.openid + '&value=' + $scope.key + '&type=0', {}).success(function(res) {
				if (res.response.responseHeader.code == "200") {
					$.tipshow({
						'msg': '绑定成功',
						'type': 'success'
					});
					setCookie("boxId", res.response.responseBody.split(':')[2]);
					setTimeout(function() {
						window.history.go(-1);
					}, 2000);
				}
			});
		}
	}
	return {
		controller: controller,
		tpl: tpl
	};
});