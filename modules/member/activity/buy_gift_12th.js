define(['angular','size', 'fun'], function(angular, tpl) {
    controller.$inject = ['$scope', '$rootScope', '$http','$state'];

    function controller($scope, $rootScope, $http,$state) {
        $rootScope.htmlname = '';
        $scope.sc = GetRequest();
        $scope.openid = encodeURIComponent( getUrlParam('rn'));
        $("title").html("双十二·购年卡送好礼");
        $scope.is_choose=true;
        $scope.choose=function (id,index) {
            $http.post(webset.base+'wxpayactive/judgeActive?openId='+$scope.openid, {}).success(function (res) {
               if(res.result=='SUCCESS'){
                   window.location.href="#/user_address_12th?id="+id+"&orderId="+res.orderId+"&gifId="+index;
               }else{
                  $scope.is_choose=false;
               }
            })
        }
    }
    return {
        controller: controller,
        tpl: tpl
    };
});