define(['angular','size', 'fun'], function(angular, tpl) {
	controller.$inject = ['$scope', '$http', '$rootScope'];

	function controller($scope, $http, $rootScope) {
		$scope._config = _modules_config;
		$rootScope.htmlname = 'shake bgcfff pb10';
		$scope.lazy = new lazyload({
			'class': '.lazy',
			'elm': '#J_list',
			'outbot': 100
		})
		$scope.bs = new botscroll(100, 85); // 滚动事件
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