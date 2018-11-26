define(['angular',  'wxshare','size', 'fun'], function(angular, tpl) {
    controller.$inject = ['$scope', '$rootScope', '$http'];

    function controller($scope, $rootScope, $http) {
        $scope.rem = window.rem / 100;
        $("title").html("卡券详情");
        $scope.sc = GetRequest();
     $http.post(webset.base+'wxpay/findOrderDetailByOrderId?orderId='+$scope.sc.orderId, {}).success(function (res) {
            console.log('卡券详情',res);
                $scope.detail=res;
        });
        
    }
    return {
        controller: controller,
        tpl: tpl
    };
});