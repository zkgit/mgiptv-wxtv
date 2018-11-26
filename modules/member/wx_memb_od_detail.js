define(['angular','size', 'fun'], function(angular, tpl) {
    controller.$inject = ['$scope', '$rootScope', '$http','$state'];

    function controller($scope, $rootScope, $http,$state) {
        $rootScope.htmlname = '';
        $scope.sc = GetRequest();
        $scope.openid = encodeURIComponent( getUrlParam('rn'));
        $("title").html("开通年卡");
        $scope.list={
            'vip_b':{
                'id':'9750',
                // 'title':'钻石会员',
                'name':'钻石会员年包',
                'price':'440',
                'list':[
                    {
                        'info':'1.可观看高清影院、好莱坞、3D影院、4K影院、高清剧场、日韩剧、欧美剧、高清动画、迪斯尼、成长乐园、热血动漫、经典纪录、广场舞、音乐以及所有付费直播频道'
                     },
                    {
                        'info':'2.可参与会员中心免费抢票、免费观影、免费抽奖、成长值兑换等会员福利活动'
                    },
                    {
                        'info':'3.参与平台互动活动，可享受投票加倍及报名优先特权'
                    },
                    {
                        'info':'4.从购买日起，产品有效使用期为365天'
                    }
                ]
            },
            'child_b':{
                'id':'9753',
                // 'title':'少儿',
                'name':'少儿会员年包',
                'price':'111.1',
                'list':[
                    {
                        'info':'1.少儿频道内高清动画／迪士尼／成长乐园付费影片随意看'
                    },
                    {
                        'info':'2.从购买日起，产品有效使用期为365天'
                    }
                ]
            },
            'film_b':{
                'id':'9752',
                // 'title':'电影',
                'name':'电影会员年包',
                'price':'111.1',
                'list':[
                    {
                        'info':'1.电影频道内高清影院／首映／好莱坞付费影片随意看'
                    },
                    {
                        'info':'2.从购买日起，产品有效使用期为365天'
                    }
                ]
            },
            'tv_b':{
                'id':'9751',
                // 'title':'电视剧',
                'name':'电视剧会员年包',
                'price':'111.1',
                'list':[
                    {
                        'info':'1.电视剧频道内高清剧场／亚洲剧场／鼎级美剧付费影片随意看'
                    },
                    {
                        'info':'2.从购买日起，产品有效使用期为365天'
                    }
                ]
            }
        };
        $scope.res_info=$scope.list[$scope.sc.type];
        console.info($scope.res_info);
        //互斥提示
        $scope.tips=false;
        //绑定提示
        $scope.ifbind=true;
        $scope.bd_choose=false;

        //获取当前绑定设备码
        $scope.get_device=function () {
            var devicelistUrl = webset.deviceapiurl + "user/getDevice.json?openId=" + $scope.openid + "&pageNo=1&pageSize=5";
            $http.post(devicelistUrl, {}).success(function (res) {
                if(res.responseBody.currentBindBoxId!=''&&res.responseHeader.code=='200'){
                    // if(res.responseHeader.code=='200'){
                    $scope.currentDevice=res.responseBody.currentBindBoxId;
                    // $scope.currentDevice=6830016;
                }else{
                    $scope.ifbind=false;
                }
                console.log('当前绑定设备', res.responseBody.currentBindBoxId);
            }).error(function(){
                $scope.ifbind=false;
            });
        };
        $scope.get_device();

        // http://wxiptv.zt.mgtv.com/mgiptv-wxtv/wxpay/qrcodePay?productId=11111&openId=22222

        //支付获取二维码
        $scope.erma=false;
        $scope.buy=function () {
            $http.post(webset.base+'wxpay/qrcodePay?productId='+$scope.res_info.id+'&openId='+$scope.openid+'&name='+$scope.res_info.name+'&price='+$scope.res_info.price, {}).success(function (res) {
                console.log('支付二维码',res);
                $scope.msg={
                    'tl':'',
                    'content':''
                };
                if(res.result=='SUCCESS'){
                    $scope.erma=res.qrcodeUrl;
                }else if(res.result=='VAILFAIL'){
                    $scope.tips=true;
                    $scope.msg.tl='购买失败';
                    $scope.msg.content=res.msg;
                }else if(res.result=='UNBIND'){
                    $state.go('/wx_memb_bind');
                }else{
                    $.tipshow({
                        'msg': 'ERROR',
                        'type': 'black'
                    });
                }
            }).error(function(){
                $.tipshow({
                    'msg': 'Server Error',
                    'type': 'black'
                });
            });
        };

        //解除绑定
        $scope.unbind=function (data) {
            $http.post(webset.base+'wxtv/unBindBox?openId='+$scope.openid+'&userId='+data, {}).success(function (res) {
                console.log('解除绑定',res);
                if(res.result=='SUCCESS'){
                    $scope.ifbind=false;
                    $scope.bd_success=true;
                }else{
                    $scope.bd_err=true;
                }
                $scope.bd_choose=false;
            }).error(function(){
                $.tipshow({
                    'msg': 'Server Error',
                    'type': 'black'
                });
            });
            $scope.bd_choose=false;
        };
        //取消绑定提示
        $scope.bd_tip=function(e){
            $scope.bd_choose=e;
        };
        //取消互斥关系提示
        $scope.resetstate = function() {
            $scope.tips=false;
        };
        //确定提示
        $scope.yes=function(){
            $scope.ifbind=false;
            $scope.bd_success=false;
            // $state.go('/wx_memb_bind');
        }
        $scope.no=function(){
            $scope.bd_err=false;
        }

    }
    return {
        controller: controller,
        tpl: tpl
    };
});