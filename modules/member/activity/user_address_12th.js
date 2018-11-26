define(['angular', 'wxshare', 'size', 'fun'], function (angular, tpl) {
    controller.$inject = ['$scope', '$rootScope', '$http'];

    function controller($scope, $rootScope, $http) {
        $("title").html("填写收货信息");
        // $rootScope.htmlname = 'ptf wp100';
        $scope.rem = window.rem / 100;
        $scope.sc = GetRequest();
        $scope.openid = encodeURIComponent(getUrlParam('rn'));
        $scope.list = {
            'shop1': {
                'name': '美国西屋慢速原汁机WSJ-SP1101',
                'price': '1280.00'
            },
            'shop2': {
                'name': 'suissewin万向轮登机箱拉杆箱20寸',
                'price': '1188.00'
            },
            'shop3': {
                'name': '德国（STONE)司顿锅具五件套STH065',
                'price': '788.00'
            }
        };
        $scope.seting = {
            "sheng": '',
            "shi": '',
            "qu": ''
        };
        $scope.changesheng = function (res) {
            $scope.seting.sheng = res;
            console.info($scope.seting.sheng, $scope.seting.shi, $scope.seting.qu)
        };
        $scope.changeshi = function (res) {
            $scope.seting.shi = res;
            console.info($scope.seting.sheng, $scope.seting.shi, $scope.seting.qu)

        };
        $scope.changequ = function (res) {
            $scope.seting.qu = res;
            console.info($scope.seting.sheng, $scope.seting.shi, $scope.seting.qu)
        };
        $scope.tipshow = false;
        $scope.tipshow_1 = false;
        $http.get('txt/city.js', {}).success(function (res) {
            $scope.division = res
        });
        $scope.keyname = '';
        $scope.keytel = '';
        $scope.keyadr = '';
        $scope.btn_user_info = function () {
            if($scope.keytel&&$scope.keyname&&$scope.keyadr&&$scope.seting.sheng&&$scope.seting.shi&&$scope.seting.qu){
                console.info($scope.seting.sheng, $scope.seting.shi, $scope.seting.qu, $scope.keyname, $scope.keytel, $scope.keyadr);
                if ($scope.keyname.length >= 2 && $scope.keytel.toString().length == 11 && $scope.keyadr.length >= 5 && $scope.keyadr.length < 60 && $scope.keyname.length < 60&&$scope.seting.sheng.length >0&&$scope.seting.shi.length >0&&$scope.seting.qu.length >0) {
                    $scope.adr = $scope.seting.sheng + $scope.seting.shi + $scope.seting.qu + $scope.keyadr;
                    $http.post(webset.base + 'wxpayactive/activeOrder?&openId=' + $scope.openid + '&orderId=' + $scope.sc.orderId + '&gifId=' + $scope.sc.gifId + '&name=' + $scope.keyname + '&phone=' + $scope.keytel + '&address=' + $scope.adr, {}).success(function (res) {
                        if (res.result == 'SUCCESS') {
                            $scope.tipshow_1 = true;
                        }
                    }).error(function () {
                        $.tipshow({
                            'msg': 'Server Error',
                            'type': 'black'
                        });
                    });
                } else {
                    $scope.tipshow = true;
                    // $scope.tipshow_1=true;
                }
            } else {
                $scope.tipshow = true;
                // $scope.tipshow_1=true;
            }

        };
        $scope.close = function () {
            $scope.tipshow = false
        };
        // $scope.close_1 = function () {
        //     $scope.tipshow_1 = false
        // }
    }

    return {
        controller: controller,
        tpl: tpl
    };
});