define(['angular', 'swipe','size', 'fun','slide'], function(angular, tpl) {
	controller.$inject = ['$scope','$http','$rootScope','$location','$state'];

	function controller($scope, $http,$rootScope,$location,$state) {

		var mySwiper3 = new Swiper('#swiper-container3',{
			observer:true,//修改swiper自己或子元素时，自动初始化swiper
			observeParents:true,//修改swiper的父元素时，自动初始化swiper
			touchRatio : 0.6,//触摸距离与slide滑动距离的比率。
			// longSwipesRatio : 0.7,
			touchAngle : 30,//允许触发拖动的角度值。默认45度，即使触摸方向不是完全水平也能拖动slide。
			// shortSwipes : false,//设置为false时，进行快速短距离的拖动无法触发Swiper。
			iOSEdgeSwipeDetection : true,
			iOSEdgeSwipeThreshold : 50,//设置为true开启IOS的UIWebView环境下的边缘探测。如果拖动是从屏幕边缘开始则不触发swiper。
			// followFinger : false,//如设置为false，拖动slide时它不会动，当你释放时slide才会切换。
			//passiveListeners : false,//用来提升swiper在移动设备的中的scroll表现（Passive Event Listeners），但是会和e.preventDefault冲突，所以有时候你需要关掉它。
			onSlideChangeStart: function(){
				console.info(mySwiper3.activeIndex)
				switch(mySwiper3.activeIndex)
				{
					case 0:
						$state.go('/slide_entry.TVlive_guide');
						break;
					case 1:
						$state.go('/slide_entry.index');
						break;
					case 2:
						$state.go('/slide_entry.index_db_tv',{t:2,coltype:'tv'});
						break;
					case 3:
						$state.go('/slide_entry.index_db_film',{t:1, coltype:'film'});
						break;
					case 4:
						$state.go('/slide_entry.index_db_arts',{t:3, coltype:'arts'});
						break;
					case 5:
						$state.go('/slide_entry.index_db_anime',{t:4, coltype:'anime'});
						break;
					case 6:
						$state.go('/slide_entry.index_db_documentary',{t:5, coltype:'documentary'});
						break;
				}
				//解决滑动
				document.onmousewheel = function(e){
					e = e || event;
					e.preventDefault();
					return false;
				};
			}
		});
		//默认
		// mySwiper3.slideTo(1);
		$state.go('/slide_entry.index');
		$rootScope.mySwiper3=mySwiper3;
	}
	return {
		controller: controller,
		tpl: tpl
	};
});