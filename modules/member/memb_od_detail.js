define(['angular','wxshare','size', 'fun'], function(angular, tpl) {
    controller.$inject = ['$scope', '$rootScope', '$http'];
    function controller($scope, $rootScope, $http) {
        $rootScope.htmlname = '';
        $scope.rem = window.rem / 100;
        $scope.sc = GetRequest();
        // $scope.openid = getUrlParam('rn');
        $scope.openid = encodeURIComponent( getUrlParam('rn'));

        /*  //二维码失效
          $scope.qr_expired=false;
          //二维码父集块
          $scope.payoff=true;
          //支付icon
          $scope.pay_icon='paycheck';
          $scope.pay_text='支付验证中...';
          //倒计时tip
          $scope.djstips=false;
          $scope.s = 59;
          $scope.m = 9;
          $scope.date = $scope.m +'分'+$scope.s+'秒';
          var interval = setInterval(function() {
              if ($scope.m >= 0) {
                  $scope.s--;
                  if($scope.s<0){
                      $scope.m--;
                      $scope.s=59;
                  }
                  $scope.date = $scope.m +'分'+$scope.s+'秒';
              } else {
                  $scope.qr_expired=true;
                  clearInterval(interval);
              }
              $scope.$digest();
          }, 1000);*/

        $scope.paysuccess=false;
        //支付结果
        $scope.order_result = function () {
            $http.get(webset.base + 'wxpay/payResult?openId='+$scope.openid+'&order='+$scope.sc.order, {}).success(function(res) {
                if(res.order_status==0){
                    $.tipshow({
                        'msg': '当前状态:'+'['+res.infor+']',
                        'type': 'black'
                    });
                    // clearInterval(interval);
                }else {
                    if(res.order_status==1){
                        // $scope.payoff=false;
                        // $scope.pay_icon='paysucess';
                        // $scope.pay_text='支付完成';
                        $scope.paysuccess=true;
                    }else if(res.order_status==-1){
                        $scope.paysuccess=false;
                        $.tipshow({
                            'msg': '交易关闭',
                            'type': 'black'
                        });
                        // $scope.payoff=false;
                        // $scope.pay_icon='payclose';
                        // $scope.pay_text='支付关闭'
                    }
                    // $scope.djs = 3;
                    // $scope.djstips=true;
                    /*var interval = setInterval(function() {
                        if ($scope.djs > 0) {
                            $scope.djs --;
                        } else {
                            clearInterval(interval);
                            window.location.href = '#index';
                        }
                        $scope.$digest();
                    }, 1000);*/
                }
            }).error(function () {
                $.tipshow({
                    'msg': 'Server Error',
                    'type': 'black'
                });
            });
        };
        /*//设备
        $http.post(webset.device + '?key=' + $scope.openid + '&type=1', {}).success(function (rest) {
            if (rest && rest.response.responseHeader.code == "200") {
                $scope.boxId=rest.response.responseBody
            }
        });*/
        // var payres = setInterval(function(){
        //   $scope.order_result();
        // }, 5000);


    }
    return {
        controller: controller,
        tpl: tpl
    };
});