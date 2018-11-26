define(['angular',  'wxshare','size', 'fun'], function(angular, tpl) {
    controller.$inject = ['$scope', '$rootScope', '$http'];

    function controller($scope, $rootScope, $http) {
        $scope.rem = window.rem / 100;
        $("title").html("我的卡券");
        $scope.openid = encodeURIComponent( getUrlParam('rn'));
        $scope.list=[];
        $scope.isDefault=false;
        // $scope.openid = 'AyU3yoOw%2fGrP5YfRF6vAHh8H5b%2bRPDexB%2fV3OweINTg%3d';
        $http.post(webset.base+'wxpay/findOrderDetail?openId='+$scope.openid, {}).success(function (res) {
            console.log('购买记录',res);
            if(res.length){
                $scope.list=res;
                if(!$scope.list.length){
                    $scope.isDefault=true;
                }
            }else{
                $scope.isDefault=true;
            }
        }).error(function () {
            $scope.isDefault=true;
        });
        
    }
    return {
        controller: controller,
        tpl: tpl
    };
});