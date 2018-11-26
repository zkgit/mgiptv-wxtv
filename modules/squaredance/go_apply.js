define(['angular','wxshare','size', 'fun'], function(angular, tpl) {
    controller.$inject = ['$scope', '$rootScope', '$http'];

    function controller($scope, $rootScope, $http) {
        $rootScope.htmlname = '';
        $scope.rem = window.rem / 100;
        $scope.code = getUrlParam('code');
        $scope.openid = getCookie('openid');
        $scope.boxId = getCookie('boxId');
        $scope.sc = GetRequest();
        $scope.pinyinCity=$scope.sc.did?$scope.sc.did:getCookie('pinyinCity');
        $scope.bs = new botscroll(100, 85);
        $scope.bs.isc = true;
        

    }
    return {
        controller: controller,
        tpl: tpl
    };
});