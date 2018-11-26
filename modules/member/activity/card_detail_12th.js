define(['angular',  'wxshare','size', 'fun'], function(angular, tpl) {
    controller.$inject = ['$scope', '$rootScope', '$http'];

    function controller($scope, $rootScope, $http) {
        $scope.rem = window.rem / 100;
        $("title").html("卡券详情");
        $scope.sc = GetRequest();
        $scope.openid = encodeURIComponent( getUrlParam('rn'));
        $scope.unchose=false;
        $scope.chosed=false;
         $http.post(webset.base+'wxpay/findOrderDetailByOrderId?orderId='+$scope.sc.orderId, {}).success(function (res) {
                console.log('卡券详情',res);
                    $scope.detail=res;
            });
        $scope.findGif=function(){
            $http.post(webset.base+'wxpayactive/findActiveOrder?orderId='+$scope.sc.orderId+'&openId='+$scope.openid, {}).success(function (res) {
                if(res.result=='SUCCESS'&&res.data){
                   $scope.orderDetail=res.data;
                   $scope.chosed=true;
               }else{
                   $scope.unchose=true;
               }
            });

        }
        $scope.list={
            'shop1':{
                'name':'美国西屋慢速原汁机WSJ-SP1101',
                'price':'1280.00'
            },
            'shop2':{
                'name':'suissewin万向轮登机箱拉杆箱20寸',
                'price':'1188.00'
            },
            'shop3':{
                'name':'德国（STONE)司顿锅具五件套STH065',
                'price':'788.00'
            }
        };
        
    }
    return {
        controller: controller,
        tpl: tpl
    };
});