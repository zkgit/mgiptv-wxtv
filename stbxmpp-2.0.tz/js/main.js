'use strict';

(function(win) {
	//配置baseUrl
//	var baseUrl = document.getElementById('main').getAttribute('data-baseurl');
	/*
	 * 文件依赖
	 */
	var config = {
//		baseUrl: baseUrl, //依赖相对路径
		map:{
			'*':{
				'css': 'conponents/common/css.min'
			}
		},
		paths: { //如果某个前缀的依赖不是按照baseUrl拼接这么简单，就需要在这里指出
			underscore: 'conponents/common/underscore',
			angular: 'conponents/common/angular.min',
			'angular-route': 'conponents/common/angular-route.min',
			text: 'conponents/common/text', //用于requirejs导入html类型的依赖
			iconfig: 'config/config',
			fun: 'js/fun',
			filter:'conponents/filters/filter',
			size:'js/size',
			jquery: 'conponents/common/jquery-2.1.4.min',
			wxshare:'modules/wxshare/wxshare',
			jweixin:'modules/wxshare/jweixin-1.0.0',
			cookie:'modules/wxshare/jquery.cookie',
			swipe:'modules/swipe/swipe',
			html5media:'modules/wxshare/html5media.min',
			websocket:'config/websocket',
			wxshake:'modules/wxshake/wxshake'
		},
		shim: { //引入没有使用requirejs模块写法的类库。例如underscore这个类库，本来会有一个全局变量'_'。这里shim等于快速定义一个模块，把原来的全局变量'_'封装在局部，并导出为一个exports，变成跟普通requirejs模块一样
			underscore: {
				exports: '_'
			},
			angular: {
				deps: ['css!style/base','css!style/widget','css!style/mainv2','css!style/devicelist','css!style/weui.min','css!style/font/iconfont','fun'],
				exports: 'angular'
			},
			'angular-route': {
				deps: ['angular'], //依赖什么模块
				exports: 'ngRouteModule'
			},
			iconfig: {
				exports: 'iconfig'
			},
			size: {
				exports: 'size'
			},
			fun: {
				deps: ['jquery'],
				exports: 'fun'
			},
			jweixin:{
				exports:'jweixin'
			},
			websocket:{
				exports:'websocket'
			},
			wxshake: {
				deps: ['iconfig','jweixin','cookie'],
				exports: 'wxshake'
			},
			wxshare: {
				deps: ['iconfig','jweixin','cookie','websocket','wxshake'],
				exports: 'wxshare'
			},
			filter:{
				exports:'filter'
			},


		}
	};


	

	require.config(config);

	require(['angular','iconfig','js/router'], function(angular) {
		angular.bootstrap(document, ['webapp']);
	});
	
})(window);