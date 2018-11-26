(function(){
	bodyroute.controller('AdCtrl',function($scope,$rootScope,$http) {
		$rootScope.htmlname = 'ad bgcfff pb10';
		$scope.sc = GetRequest();
        $scope.seting = {
            "pageNo":1,
            "pageSize":15
        };

        $scope.lazy = new lazyload({
            'class':'.lazy',
            'elm':'#J_list',
            'outbot':100
        })

        $scope.bs = new botscroll(100,85); // 滚动事件

        $scope.list = [];
        $scope.loadtext = '正在加载···';
        $scope.getAjax = function(){
        	var url;
        	var adtitle;
        	if($scope.sc.channelId&&$scope.sc.channelId!=""){
        		adtitle="节目广告";
        		url=webset.base+'tran?DEEPURL=http://ad.t2o.kanketv.com/t2o-adsync/ad/weChat/getLiveChannelAds.do?channelId='+$scope.sc.channelId+'&records=5';
        	}else if($scope.sc.videoTitle&&$scope.sc.videoTitle!=""&&$scope.sc.videoTypes&&$scope.sc.videoTypes!=""){
        		adtitle="节目广告";
        		url=webset.base+'tran?DEEPURL=http://ad.t2o.kanketv.com/t2o-adsync/ad/weChat/getDemandAds.do?videoTitle='+$scope.sc.videoTitle+'&videoTypes='+$scope.sc.videoTypes+'&type='+$scope.sc.type+'&records=5';
        	}else{
        		adtitle="热门广告";
        		url=webset.base+'tran?DEEPURL=http://ad.t2o.kanketv.com/t2o-adsync/ad/weChat/getTopPlayerAds.do?records=5';
        	}
//      	alert(url);
//      	webset.url+'api/v1/epg/currentHotEpg.json?appKey=34DB874AF269B539&appScrect=40&pageNo='+$scope.seting.pageNo+'&pageSize=15'
            $http.get(url,{}).success(function(res){
                console.log(res);
                $scope.adtoptil = adtitle;
                $scope.list = $scope.list.concat(res.adDataList);
                $scope.bs.fisrt = true;
                if(res.adDataList.length==5){
                    $scope.bs.isc = false;
                }else{
                    $scope.bs.isc = false;
                    $scope.loadtext = '已加载全部数据';
                }
            });
        }
        $scope.getAjax();
        // $scope.lazy.setlazy($('.lazy'));

        $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
            $scope.bs.setmax($('.html').height());
            $scope.lazy.setlazy($('.lazy'));
        });

        $scope.bs.getbot = function(){
            $scope.bs.isc = false;
            $scope.seting.pageNo++;
            $scope.getAjax();
        }

	})
})()




