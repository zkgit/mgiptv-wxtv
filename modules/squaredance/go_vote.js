define(['angular','wxshare','size', 'fun'], function(angular, tpl) {
    controller.$inject = ['$scope', '$rootScope', '$http'];

    function controller($scope, $rootScope, $http) {
        $rootScope.htmlname = 'sd-vote';
        $scope.rem = window.rem / 100;
        // $scope.openid = getUrlParam('rn');
        $scope.openid = encodeURIComponent( getUrlParam('rn'));

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

        $http.get(webset.base+'wxActive/getUserVoteNum' + '?openId=' + $scope.openid, {}).success(function (res) {
          console.log('投票次数',res)
            $scope.votnum=parseInt(res.count);
        });


        $scope.seting = {
            "pageindex": 1,
            "pagesize": 10
        };
        $scope.list = [];
        $scope.loadtext = '正在加载···';
        $scope.bs = new botscroll(100, 85); // 滚动事件
      

        $scope.lazy = new lazyload({
            'class': '.lazy',
            'elm': '#list',
            'outbot': 100
        })
        $scope.getAjax = function() {
            var senturl = webset.base + 'wxActive/getListData.json';
            var data;
            if($scope.seting.itemname){
                data = {
                    "pagesize": $scope.seting.pagesize,
                    "pageindex": $scope.seting.pageindex,
                    "itemname":$scope.seting.itemname
                };
            }else{
               data = {
                    "pagesize": $scope.seting.pagesize,
                    "pageindex": $scope.seting.pageindex
                };
            }


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
                if (res.length == 10) {
                    $scope.bs.isc = true;
                } else {
                    $scope.bs.isc = false;
                    $scope.loadtext = '已加载全部数据';
                }
            });
        }

        $scope.search=function () {
            if(!$scope.itemname){
                $.tipshow({
                    'msg': '队伍名称不能为空',
                    'type': 'warning'
                })
            }else{
                $scope.seting.pageindex=1;
                $scope.seting.itemname=$scope.itemname;
                $scope.loadtext = '正在加载···';
                $scope.list=[];
                $scope.getAjax();
            }
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
        
       //绑定提示框
        $scope.tips=false;
        $scope.stopBubble = function($event) {
            $event.stopPropagation();
            $event.preventDefault();
        }
        $scope.resetstate = function() {
            $scope.tips=false;
        }
        
        $scope.goto=function(){
            window.location.href='#/mine_device'
        }
        $scope.govote=function (v) {
            $http.get(webset.base+'wxActive/userVote?openId=' + getCookie('openid')+'&itemId='+v.id+'&score=1', {}).success(function (res) {
                console.log(res);

                if(res.result=='SUCCESS'){
                    $.tipshow({
                        'msg': '投票成功',
                        'type': 'success'
                    });
                    v.votenums++;
                    if($scope.votnum>0){
                       $scope.votnum= $scope.votnum-1;
                    }else{
                        $scope.votnum=0;
                    }
                  
                }else if(res.result=='FAIL'){
                    $.tipshow({
                        'msg': '投票失败，系统异常',
                        'type': 'warning'
                    })
                }else if(res.result=='UNBIND'){
                        $scope.tips=true;
                }else if(res.result=='VOTEEND'){
                    $.tipshow({
                        'msg': '当天该队已投过票了，针对于一个队一天只能投一次票',
                        'type': 'warning'
                    })
                }else if(res.result=='UNVOTENUM'){
                    $.tipshow({
                        'msg': '票数不够',
                        'type': 'warning'
                    })
                }
            });
        }

      
        if(_wxshare_on){
            var urltem = window.location.href;
            wxshare.weixinshare_('湖南IPTV微信电视',"http://wxiptv.zt.mgtv.com/mgiptv-wxtv/img/hunan.png", "【微信电视，让微信成为电视遥控器】", urltem,'govote');
        }
        //分享

    }
    return {
        controller: controller,
        tpl: tpl
    };
});