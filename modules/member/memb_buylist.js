define(['angular',  'wxshare','size', 'fun'], function(angular, tpl) {
    controller.$inject = ['$scope', '$rootScope', '$http'];

    function controller($scope, $rootScope, $http) {
        $rootScope.htmlname = '';
        $scope.rem = window.rem / 100;

        $scope.sc = GetRequest();




    }
    return {
        controller: controller,
        tpl: tpl
    };
});