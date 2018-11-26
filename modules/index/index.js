define(['angular',  'swipe', 'size', 'fun'], function(angular, tpl) {
	controller.$inject = ['$scope','$http','$rootScope','$location'];

	function controller($scope, $http,$rootScope,$location) {
		//父级的导航定位
		$rootScope.mySwiper3.slideTo(1);
		
		$scope._config = _modules_config;
		// $scope.openid = getUrlParam('rn');
		$scope.openid = encodeURIComponent(getUrlParam('rn'))  ;
		//加载提示
		$scope.loadtextLive=true;
		$scope.loadtextIti=true;
		$scope.loadtextTag=true;
		$scope.zbpanduan=false;
		$scope.videopanduan=false;
		//直播标签记录问题处理
		setCookie('zbno',0);
		//默认测试
		setCookie('pinyinCity','changshashi');
		setCookie('openid',$scope.openid);
		$scope.token = getCookie('token');
		$scope.pinyinCity=getCookie("pinyinCity");
		//绑定设备的隐藏
		$scope.tips=false;
		//换一批
		$scope.change_tip={
			"video":'换一批~',
			"film":'换一批~',
			"tv":'换一批~',
			"arts":'换一批~',
			"anime":'换一批~',
			"documentary":'换一批~'
		};
		$scope.scope=0;
		$scope.seting = {
			"pageNo_video": 1,
			"pageNo_F": 1,
			"pageNo_T": 1,
			"pageNo_E": 1,
			"pageNo_C": 1,
			"pageNo_D": 1
		};

		$scope.posters=[
			{bimage:'img/banner_2.png',name:'member'},
			{bimage:'img/banner_1.png',name:'square'}
		]
		//海报
		$http.post(webset.testapiurl + 'vod/poster.json?did='+$scope.pinyinCity+'&poster=index&pageNo=1&pageSize=3&appKey=34DB874AF269B539&appScrect=40', {}).success(function(res) {
			console.log('海报', res);
			if(res.response.responseBody){
				var posters = [];
				posters.push(res.response.responseBody[res.response.responseBody.length-1]);
				posters=posters.concat($scope.posters,res.response.responseBody);
				posters.push($scope.posters[0]);
				$scope.poster=posters;
				console.log($scope.poster)
				// $scope.poster=res.response.responseBody;
			}else{
				$scope.poster=[
					{bimage:'img/banner_1.png',name:'square'},
					{bimage:'img/banner_2.png',name:'member'},
					{bimage:'img/banner_1.png',name:'square'},
					{bimage:'img/banner_2.png',name:'member'}
				]
			}

			/*	$scope.poster.unshift($scope.poster[$scope.poster.length-1]);
			 $scope.poster.push($scope.poster[1]);
			 console.log($scope.poster)*/
		});
		$scope.checklast = function($last) {
			if($last) {
				$scope.swipe = new swipe({
					"elm": document.getElementById('J_swipe'),
					"autoplay": 3000
				})
			}
		};

		$scope.init = function() {
			$scope.recommend_you();
			$scope.recommend_mix_film();
			$scope.recommend_mix_tv();
			$scope.recommend_mix_arts();
			$scope.recommend_mix_anime();
			$scope.recommend_mix_documentary();
			//分类接口
			$http.post(webset.testapiurl + 'vod/tagType.json?dtid='+$scope.pinyinCity+'&type=&pagNo=1&pageSize=25', {}).success(function(res) {
				$scope.res_fl = res.response.responseBody.list;
			});
			//我的直播
			// $http.post(webset.testapiurl + 'vod/mylives.json?dtid='+$scope.pinyinCity+'&pageNo=1&pageSize=6&token=' + $scope.token, {}).success(function(res) {
			// 	$scope.list.zb = res.response.responseBody.list;
			// 	if(res){
			// 		$scope.loadtextLive=false;
			// 	}
			// 	console.log('我的直播', res);
			// });
		};
		//为你推荐
		$scope.recommend_you=function () {
			$http.post(webset.testapiurl + 'vod/myvideo.json?dtid='+$scope.pinyinCity+'&pageNo='+$scope.seting.pageNo_video+'&pageSize=6&token=' + $scope.token+'&scope='+$scope.scope, {}).success(function(res) {
				if(res){
					if(res.response.responseBody&&res.response.responseBody[0].list.length>0){
						$scope.videopanduan=true;
						$scope.list.mix = res.response.responseBody[0].list;
					}

				}

			});
		};
		//混合推荐
		//电影
		$scope.recommend_mix_film=function () {
			$http.post(webset.testapiurl + 'vod/mytag.json?dtid='+$scope.pinyinCity+'&pageNo='+$scope.seting.pageNo_F+'&pageSize=6&token=' + $scope.token+'&scope='+$scope.scope+'&type=film&tag=', {}).success(function(res) {
				$scope.classify_film = res.response.responseBody;
				$scope.change_tip.film='换一批~';
			});
		};
		// 电视剧
		$scope.recommend_mix_tv=function () {
			$http.post(webset.testapiurl + 'vod/mytag.json?dtid='+$scope.pinyinCity+'&pageNo='+$scope.seting.pageNo_T+'&pageSize=6&token=' + $scope.token+'&scope='+$scope.scope+'&type=tv&tag=', {}).success(function(res) {
				$scope.classify_tv = res.response.responseBody;
				$scope.change_tip.tv='换一批~';
			});
		};
		//综艺
		$scope.recommend_mix_arts=function () {
			$http.post(webset.testapiurl + 'vod/mytag.json?dtid='+$scope.pinyinCity+'&pageNo='+$scope.seting.pageNo_E+'&pageSize=6&token=' + $scope.token+'&scope='+$scope.scope+'&type=arts&tag=', {}).success(function(res) {
				$scope.classify_arts = res.response.responseBody;
				$scope.change_tip.arts='换一批~';
			});
		};
		//动漫
		$scope.recommend_mix_anime=function () {
			$http.post(webset.testapiurl + 'vod/mytag.json?dtid='+$scope.pinyinCity+'&pageNo='+$scope.seting.pageNo_C+'&pageSize=6&token=' + $scope.token+'&scope='+$scope.scope+'&type=anime&tag=', {}).success(function(res) {
				$scope.classify_anime = res.response.responseBody;
				$scope.change_tip.anime='换一批~';
			});
		};
		//纪录片
		$scope.recommend_mix_documentary=function () {
			$http.post(webset.testapiurl + 'vod/mytag.json?dtid='+$scope.pinyinCity+'&pageNo='+$scope.seting.pageNo_D+'&pageSize=6&token=' + $scope.token+'&scope='+$scope.scope+'&type=documentary&tag=', {}).success(function(res) {
				$scope.classify_documentary = res.response.responseBody;
				$scope.change_tip.documentary='换一批~';
			});
		};
		$scope.change=function (e) {
			$scope.scope=1;
			switch (e){
				case "video":
					$scope.seting.pageNo_video++;
					$scope.change_tip.video='加载中...';
					$scope.recommend_you();
					break;
				case "F":
					$scope.seting.pageNo_F++;
					$scope.change_tip.film='加载中...';
					$scope.recommend_mix_film();
					break;
				case "T":
					$scope.seting.pageNo_T++;
					$scope.change_tip.tv='加载中...';
					$scope.recommend_mix_tv();
					break;
				case "E":
					$scope.seting.pageNo_E++;
					$scope.change_tip.arts='加载中...';
					$scope.recommend_mix_arts();
					break;
				case "C":
					$scope.seting.pageNo_C++;
					$scope.change_tip.anime='加载中...';
					$scope.recommend_mix_anime();
					break;
				case "D":
					$scope.seting.pageNo_D++;
					$scope.change_tip.documentary='加载中...';
					$scope.recommend_mix_documentary();
					break;
			}

		};
		
		//入口获取用户信息
		if(getCookie('token')=='undefined'||getCookie('token')==null) {
			$http.post(webset.initurl + '?openid='+$scope.openid, {}).success(function(res) {
				$rootScope.headimg = res.headimgurl;
				setCookie('token',res.token)
				setCookie('headimgurl',res.headimgurl);
				setCookie('nickname',encodeURIComponent(res.nickname));
				$scope.token = res.token;
				$scope.init();
			});
		}else{
			$scope.init();
		}
		//设备
		$http.post(webset.device + '?key=' + $scope.openid + '&type=1', {}).success(function(rest) {
			if(rest && rest.response.responseHeader.code == "200") {
				setCookie("boxId", rest.response.responseBody);
			}
		});
		//提交订单
		$scope.sub_order = function () {
			$http.get(webset.base + 'wxpay/qrcodePay?openid='+$scope.openid, {}).success(function(res) {
				if(res.result=='SUCCESS'){
					//跳转支付详情
					// $location.path('/memb_od_detail?order='+res.order+'&qrcodeUrl='+res.qrcodeUrl);
					$location.path('/memb_od_detail').search({order: res.order,qrcodeUrl:res.qrcodeUrl});
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
					$location.path('/mine_device');
					$scope.submission=true;
				}else if(res.result=='UNBIND'){
					$.tipshow({
						'msg': '未绑定:['+res.result+']',
						'type': 'black'
					});
					$location.path('/mine_device');
					// $scope.tips=true;
					// $scope.submission=true;
				}
			});
		};

		$scope.bs = new botscroll(100, 85); // 滚动事件
		$scope.lazy = new lazyload({
			'class': '.lazy',
			'elm': '.J_list',
			'outbot': 100
		});
		$scope.list = {};
		$scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
			$scope.bs.setmax($('.html').height());
			$scope.lazy.setlazy($('.lazy'));
		});
	}
	return {
		controller: controller,
		tpl: tpl
	};
});