'use strict';

(function(win) {
	//配置baseUrl
	var baseUrl = document.getElementById('main').getAttribute('data-baseurl');
	/*
	 * 文件依赖
	 */
	var config = {
		baseUrl: baseUrl, //依赖相对路径
		map:{
			'*':{
				'css': 'conponents/common/css.min',
				'router':'js/router.js?v=61e0be79'
			}
		},
		paths: { //如果某个前缀的依赖不是按照baseUrl拼接这么简单，就需要在这里指出
			underscore: 'conponents/common/underscore',
			angular: 'conponents/common/angular.min',
			'angular-route': 'conponents/common/angular-route',
			'angular-ui-router': 'conponents/common/angular-ui-router.min',
			text: 'conponents/common/text', //用于requirejs导入html类型的依赖
			iconfig: 'config/config',
			fun: 'js/fun',
			filter:'conponents/filters/filter',
			size:'js/size',
			jquery: 'conponents/common/jquery-2.1.4.min',
			wxshare:'modules/wxshare/wxshare.min',
			jweixin:'modules/wxshare/jweixin-1.0.0',
			cookie:'modules/wxshare/jquery.cookie',
			swipe:'modules/swipe/swipe',
			imageflow:'modules/imageflow/imageflow',
			slide:'modules/slide/swiper.min',
			wxshake:'modules/wxshake/wxshake'
		},
		shim: { //引入没有使用requirejs模块写法的类库。例如underscore这个类库，本来会有一个全局变量'_'。这里shim等于快速定义一个模块，把原来的全局变量'_'封装在局部，并导出为一个exports，变成跟普通requirejs模块一样
			underscore: {
				exports: '_'
			},
			angular: {
				deps: ['css!style/base','css!style/basic','css!style/widget','css!style/main','css!style/sprite','css!style/font/iconfont','fun'],
				exports: 'angular'
			},
			'angular-ui-router': {
				deps: ['angular']//依赖什么模块
			},
			iconfig: {
				deps: ['css!style/weui','css!style/mui.min'],
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
			wxshare: {
				deps: ['iconfig','jweixin','cookie'],
				exports: 'wxshare'
			},
			wxshake: {
				deps: ['iconfig','jweixin','cookie'],
				exports: 'wxshake'
			},
			filter:{
				exports:'filter'
			},
			slide:{
				deps:['jquery','css!modules/slide/swiper'],
				exports:'slide'
			}
		}
	};

	require.config(config);

	require(['angular','iconfig','router'], function(angular) {
		angular.bootstrap(document, ['webapp']);
	});

})(window);