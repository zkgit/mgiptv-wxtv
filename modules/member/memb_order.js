define(['angular', 'wxshare', 'size', 'fun'], function (angular, tpl) {
    controller.$inject = ['$scope', '$rootScope', '$http'];

    function controller($scope, $rootScope, $http) {
        $rootScope.htmlname = '';
        $scope.rem = window.rem / 100;
        $scope.sc = GetRequest();
        // $scope.openid = getUrlParam('rn');
        $scope.openid = encodeURIComponent( getUrlParam('rn'));
        $scope.switch = false;
        $scope.toggleSwitch = function () {
            $scope.switch = !$scope.switch;
        };
        $scope.submission='提交订单';
        //提交订单
        $scope.sub_order = function () {
            $scope.submission='提交中...';
            $http.get(webset.base + 'wxpay/qrcodePay?openId='+$scope.openid, {}).success(function(res) {
                 $scope.order_res=res.response.responseBody;
            });
        }
    }

    return {
        controller: controller,
        tpl: tpl
    };
});