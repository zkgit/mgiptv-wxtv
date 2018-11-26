define(['angular',  'wxshare','size', 'fun'], function(angular, tpl) {
    controller.$inject = ['$scope', '$rootScope', '$http'];

    function controller($scope, $rootScope, $http) {
        $scope.rem = window.rem / 100;
        $("title").html("购买记录");
        $scope.sc = GetRequest();
        $scope.openid = encodeURIComponent( getUrlParam('rn'));
        // $scope.openid = 'AyU3yoOw%2fGrP5YfRF6vAHh8H5b%2bRPDexB%2fV3OweINTg%3d';
        $http.post(webset.base+'wxpay/findOrderDetail?productId='+$scope.sc.id+'&openId='+$scope.openid, {}).success(function (res) {
            console.log('购买记录',res);
                $scope.list=res;
        });
        
    }
    return {
        controller: controller,
        tpl: tpl
    };
});