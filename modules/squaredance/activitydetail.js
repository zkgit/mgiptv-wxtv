define(['angular', 'wxshare','size', 'fun'], function(angular, tpl) {
    controller.$inject = ['$scope', '$rootScope', '$http'];

    function controller($scope, $rootScope, $http) {
        $rootScope.htmlname = '';
        $scope.rem = window.rem / 100;

        $scope.sc = GetRequest();

        $scope.notapply=function () {
            $.tipshow({
                'msg': '报名时间已截止，无法报名',
                'type': 'black'
            });
        }


    }
    return {
        controller: controller,
        tpl: tpl
    };
});