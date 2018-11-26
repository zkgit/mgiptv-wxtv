define(['angular', 'wxshare','size', 'fun'], function(angular, tpl) {
    controller.$inject = ['$scope', '$rootScope', '$http'];

    function controller($scope, $rootScope, $http) {
        $rootScope.htmlname = '';
        $scope.rem = window.rem / 100;
        $scope.sc = GetRequest();
        // $scope.openid = getUrlParam('rn');
        $scope.openid = encodeURIComponent( getUrlParam('rn'));

        $scope.isshowinfo=false;
        $scope.closeinfo=function () {
            $scope.isshowinfo=false;
        }
        $scope.showinfo=function () {
            $scope.isshowinfo=true;
        }
        $scope.submission=true;
        //提交订单
        $scope.sub_order = function () {
            $scope.submission=false;
            $http.get(webset.base + 'wxpay/qrcodePay?openid='+$scope.openid, {}).success(function(res) {
                if(res.result=='SUCCESS'){
                    //跳转支付详情
                    window.location.href = '#memb_od_detail?order='+res.order+'&qrcodeUrl='+res.qrcodeUrl;
                }else if(res.result=='ERROR'){
                    $.tipshow({
                        'msg': '系统错误['+res.result+']',
                        'type': 'black'
                    });
                    $scope.submission=true;
                }else if(res.result=='PAID'){
                    $.tipshow({
                        'msg': '已经购买过此商品['+res.result+']',
                        'type': 'black'
                    });
                    $scope.submission=true;
                }else if(res.result=='UNBIND'){
                    $.tipshow({
                        'msg': '未绑定:['+res.result+']',
                        'type': 'black'
                    });
                    $scope.submission=true;
                }
            });
        }

    }
    return {
        controller: controller,
        tpl: tpl
    };
});