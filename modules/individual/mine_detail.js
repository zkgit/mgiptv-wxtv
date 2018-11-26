define(['angular', 'size', 'fun'], function(angular, tpl) {
	controller.$inject = ['$scope', '$rootScope', '$http'];

	function controller($scope, $rootScope, $http) {
		$rootScope.htmlname = 'index_my_dt bgcfff pb60';
		$scope.headimg = getCookie('headimgurl');
		$scope.nickname = getCookie('nickname');
		$scope.sex = ['女', '男'][getCookie('sex')];
		$scope.area = getCookie('country') + ' ' + getCookie('province') + ' ' + getCookie('city');
		$scope.regtime = getCookie('registertime');
	}
	return {
		controller: controller,
		tpl: tpl
	};
});