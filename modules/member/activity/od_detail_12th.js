define(['angular','size', 'fun'], function(angular, tpl) {
    controller.$inject = ['$scope', '$rootScope', '$http','$state'];

    function controller($scope, $rootScope, $http,$state) {
        $rootScope.htmlname = '';
        $scope.sc = GetRequest();
        $scope.openid = encodeURIComponent( getUrlParam('rn'));
        $("title").html("双十二·购年卡送好礼");
        $scope.list={
            'vip_b':{
                'id':'9750',
                // 'title':'钻石会员',
                'name':'钻石会员年包',
                'price':'399',
                'original_price':'550',
                'list':[
                    {
                        'info':'1.购买成功后可在湖南IPTV+首页“VIP专区”页面进行激活使用。'
                    },
                    {
                        'info':'2.激活成功后可享受电影频道、电视剧频道、少儿频道、记录片频道、王牌综艺、PPV及所有付费直播频道免费观看权益。'
                    },
                    {
                        'info':'3.从激活日起，权益有效使用期为365天。'
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
                'price':'259',
                'original_price':'518',
                'list':[
                    {
                        'info':'1.购买成功后可在湖南IPTV+首页“VIP专区”页面进行激活使用。'
                    },
                    {
                        'info':'2.激活成功后可享受电影频道、高清影院、好莱坞、电视剧会员、高清剧场、鼎级美剧、亚洲剧场免费观看权益。'
                    },
                    {
                        'info':'3.从激活日起，权益有效使用期为365天。'
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
        // //互斥提示
        // $scope.tips=false;
        // //绑定提示
        // $scope.ifbind=true;
        // $scope.bd_choose=false;

        // //获取当前绑定设备码
        // $scope.get_device=function () {
        //     var devicelistUrl = webset.deviceapiurl + "user/getDevice.json?openId=" + $scope.openid + "&pageNo=1&pageSize=5";
        //     $http.post(devicelistUrl, {}).success(function (res) {
        //         if(res.responseBody.currentBindBoxId!=''&&res.responseHeader.code=='200'){
        //             // if(res.responseHeader.code=='200'){
        //             $scope.currentDevice=res.responseBody.currentBindBoxId;
        //             // $scope.currentDevice=6830016;
        //         }else{
        //             $scope.ifbind=false;
        //         }
        //         console.log('当前绑定设备', res.responseBody.currentBindBoxId);
        //     }).error(function(){
        //         $scope.ifbind=false;
        //     });
        // };
        // $scope.get_device();

        // http://wxiptv.zt.mgtv.com/mgiptv-wxtv/wxpay/qrcodePay?productId=11111&openId=22222

        //支付获取二维码
        // $scope.erma=false;
        $scope.buy=function () {
            $http.post(webset.base+'wxpay/qrCodePayToActivtionCode?&openId='+$scope.openid+'&type=vip12_b', {}).success(function (res) {
                console.log('支付二维码',res);
                $scope.erma=res.qrcodeUrl;
            }).error(function(){
                $.tipshow({
                    'msg': 'Server Error',
                    'type': 'black'
                });
            });
        };
        $scope.buy();
        // //解除绑定
        // $scope.unbind=function (data) {
        //     $http.post(webset.base+'wxtv/unBindBox?openId='+$scope.openid+'&userId='+data, {}).success(function (res) {
        //         console.log('解除绑定',res);
        //         if(res.result=='SUCCESS'){
        //             $scope.ifbind=false;
        //             $scope.bd_success=true;
        //         }else{
        //             $scope.bd_err=true;
        //         }
        //         $scope.bd_choose=false;
        //     }).error(function(){
        //         $.tipshow({
        //             'msg': 'Server Error',
        //             'type': 'black'
        //         });
        //     });
        //     $scope.bd_choose=false;
        // };
        // //取消绑定提示
        // $scope.bd_tip=function(e){
        //     $scope.bd_choose=e;
        // };
        // //取消互斥关系提示
        // $scope.resetstate = function() {
        //     $scope.tips=false;
        // };
        // //确定提示
        // $scope.yes=function(){
        //     $scope.ifbind=false;
        //     $scope.bd_success=false;
        //     // $state.go('/wx_memb_bind');
        // };
        // $scope.no=function(){
        //     $scope.bd_err=false;
        // }

    }
    return {
        controller: controller,
        tpl: tpl
    };
});