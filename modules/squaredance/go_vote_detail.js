define(['angular','wxshare','size', 'fun'], function(angular, tpl) {
    controller.$inject = ['$scope', '$rootScope', '$http'];

    function controller($scope, $rootScope, $http) {
        $rootScope.htmlname = '';
        $scope.rem = window.rem / 100;
        // $scope.code = getUrlParam('code');
        // $scope.openid = getCookie('openid');
        // $scope.boxId = getCookie('boxId');
        // $scope.sc = GetRequest();
        // $scope.pinyinCity=$scope.sc.did?$scope.sc.did:getCookie('pinyinCity');
        // $scope.bs = new botscroll(100, 85);
        // $scope.bs.isc = true;
        $scope.isselect=false;
        $scope.showselect=function(){
            $scope.isselect=true;
        }
        $scope.hideselect=function(){
            $scope.isselect=false;
        }
        $scope.seting = {
            "pageindex": 1,
            "pagesize": 15,
        };
        $scope.list = [];
        $scope.bs = new botscroll(100, 85); // 滚动事件


        $scope.lazy = new lazyload({
            'class': '.lazy',
            'elm': '#list',
            'outbot': 100
        })
        $scope.getAjax = function() {
            var senturl = webset.base + 'wxActive/getListData.json',
                data = {
                    "pagesize": 4,
                    "pageindex": $scope.seting.pageindex
                };

            var transform = function(data) {
                return $.param(data);
            };
            $http.post(senturl, data, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                transformRequest: transform
            }).success(function(res) {
                console.log('结果', res);
                $scope.list = $scope.list.concat(res);
                $scope.bs.fisrt = true;
                $scope.bs.isc = true
                if (res.length == 4) {
                    $scope.bs.isc = true;
                } else {
                    $scope.bs.isc = false;
                    $scope.loadtext = '已加载全部数据';
                }
            });
        }
        $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
            $scope.bs.setmax($('.html').height());
            $scope.lazy.setlazy($('.lazy'));
        });

        $scope.getAjax();
        $scope.bs.getbot = function() {
            $scope.bs.isc = false;
            $scope.seting.pageindex++;
            $scope.getAjax();
        }


    }
    return {
        controller: controller,
        tpl: tpl
    };
});