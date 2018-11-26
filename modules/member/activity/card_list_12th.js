define(['angular',  'wxshare','size', 'fun'], function(angular, tpl) {
    controller.$inject = ['$scope', '$rootScope', '$http'];

    function controller($scope, $rootScope, $http) {
        $scope.rem = window.rem / 100;
        $rootScope.showremote=false;
        // document.body.scrollTop=0;
        $("title").html("我的卡券");
        $scope.openid = encodeURIComponent(getUrlParam('rn'));
        $scope.list=[];
        $scope.isDefault=false;
        $scope.seting = {
            "pageNo": 1
        };
        $scope.loadtext='';
        // $scope.openid = 'AyU3yoOw%2fGrP5YfRF6vAHh8H5b%2bRPDexB%2fV3OweINTg%3d';
        $scope.bs = new botscroll(100, 85); // 滚动事件
        $scope.list =[];
            $scope.getList=function () {
            $http.post(webset.base+'wxpay/findOrderDetail1?openId='+$scope.openid+'&currPage='+$scope.seting.pageNo, {}).success(function (res) {
                console.log('购买记录',res);
                $scope.list = $scope.list.concat(res);
                $scope.bs.fisrt = true;
                $scope.bs.isc = true
                if (res.length == 5) {
                    $scope.bs.isc = true;
                    $scope.loadtext='正在玩命加载...'
                } else {
                    if($scope.list.length){
                        $scope.bs.isc = false;
                        $scope.loadtext = '';
                    }else{
                        $scope.bs.isc = false;
                        $scope.isDefault=true;
                    }
                }
            }).error(function () {
                $scope.isDefault=true;
            });
        }


        $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
            $scope.bs.setmax($('.html').height());
        });
        $scope.getList();
        $scope.bs.getbot = function() {
            $scope.bs.isc = false;
            $scope.seting.pageNo++;
            $scope.getList();
        }
        $scope.$on("$destroy", function() {
            $scope.bs.isc = false;
        })
    }
    return {
        controller: controller,
        tpl: tpl
    };
});