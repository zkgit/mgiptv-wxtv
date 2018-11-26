/*
 * 彻底解耦，按需加载，router的配置可以放到服务器直出，更便于团队合作
 */
define(['angular', 'require', 'angular-ui-router', 'wxshare', 'wxshake', 'fun'], function (angular, require) {
    if (_wxshare_on) {
        var data = {
            title: "湖南IPTV微信电视",
            logourl: "http://wxiptv.zt.mgtv.com/mgiptv-wxtv/img/hunan.png",
            info: "【微信电视，让微信成为电视遥控器】",
            url: serverBase,                                          //主页分享链接    默认为webset.base，可不传
            debug: false                                               //是否开启调试    true/false  默认为false，可不传
        }
        wxshare.init(data);
    }
    setCookie('pinyinCity', 'changshashi');
    var app = angular.module('webapp', ['ui.router']);

    app.config(['$stateProvider', '$urlRouterProvider', '$controllerProvider',
        function ($stateProvider, $urlRouterProvider, $controllerProvider) {
            var routeMap = {
                '/slide_entry': {
                    path: 'modules/slide_entry/slide_entry',
                    controller: 'slide_entry_Ctrl'//首页滑动效果入口
                },
                '/TVlive': {
                    path: 'modules/TVlive/TVlive',
                    controller: 'TVliveCtrl'//直播首页跳二级页面
                },
                '/TVlive_list': {
                    path: 'modules/TVlive/TVlive_list',
                    controller: 'TVlive_listCtrl'
                },
                '/profile': {
                    path: 'modules/profile/profile',
                    controller: 'profileCtrl'
                },
                '/classify': {
                    path: 'modules/classify/classify',
                    controller: 'classifyCtrl'
                },
                '/mine': {
                    path: 'modules/individual/mine',
                    controller: 'mineCtrl'
                },
                '/search': {
                    path: 'modules/search/search',
                    controller: 'searchCtrl'
                },
                '/hotlist': {
                    path: 'modules/hotlist/hotlist',
                    controller: 'hotlistCtrl'
                },
                '/mine_history': {
                    path: 'modules/individual/mine_history',
                    controller: 'mhistoryCtrl'
                },
                '/mine_collect': {
                    path: 'modules/individual/mine_collect',
                    controller: 'collectCtrl'
                },
                '/mine_order': {
                    path: 'modules/individual/mine_order',
                    controller: 'collectCtrl'
                },
                '/mine_detail': {
                    path: 'modules/individual/mine_detail',
                    controller: 'mdetailCtrl'
                },
                '/mine_channel': {
                    path: 'modules/individual/mine_channel',
                    controller: 'mine_channelCtrl'
                },
                '/mine_device': {
                    path: 'modules/individual/mine_device',
                    controller: 'mine_deviceCtrl'
                },
                '/mine_member': {
                    path: 'modules/individual/mine_member',
                    controller: 'mine_memberCtrl'
                },
                '/mine_feedback': {
                    path: 'modules/individual/mine_feedback',
                    controller: 'mine_feedbackCtrl'
                },
                '/list': {
                    path: 'modules/list/list',
                    controller: 'listCtrl'
                },
                '/detail': {
                    path: 'modules/detail/detail',
                    controller: 'detialCtrl'
                },
                '/iti_detail': {
                    path: 'modules/detail/detail',
                    controller: 'itidetialCtrl'
                },
                '/device': {
                    path: 'modules/device/device',
                    controller: 'deviceCtrl'
                },
                '/remote': {
                    path: 'modules/remote/remote',
                    controller: 'remoteCtrl'
                },
                '/shake': {
                    path: 'modules/shake/shake',
                    controller: 'shakeCtrl'
                },
                '/shakeSet': {
                    path: 'modules/shake/shakeSet',
                    controller: 'shakeSetCtrl'
                },
                '/shakeResult': {
                    path: 'modules/shake/shakeResult',
                    controller: 'shakeResultCtrl'
                },
                '/list_db': {
                    path: 'modules/index_db/list_db',
                    controller: 'list_dbCtrl'
                },
                //新增筛选页面
                '/choose_db': {
                    path: 'modules/index_db/choose',
                    controller: 'choose_dbCtrl'
                },
//				'/detail_db': {
//					path: 'modules/index_db/detail.js',
//					controller: 'detail_dbCtrl'
//				},
                '/recommend': {
                    path: 'modules/recommend/recommend',
                    controller: 'recommendCtrl'
                },
                '/recommend_zb': {
                    path: 'modules/recommend/recommend_zb',
                    controller: 'recommend_zbCtrl'
                },
                '/recommend_you': {
                    path: 'modules/recommend/recommend_you',
                    controller: 'recommend_youCtrl'
                },
                '/recommend_tags': {
                    path: 'modules/recommend/recommend_tags',
                    controller: 'recommend_tagsCtrl'
                },
                '/iti': {
                    path: 'modules/iti/iti',
                    controller: 'itiCtrl'
                },
                '/activitydetail': {//广场舞首页
                    path: 'modules/squaredance/activitydetail',
                    controller: 'activitydetailCtrl'
                },
                '/go_vote': {//我要投票
                    path: 'modules/squaredance/go_vote',
                    controller: 'goVoteCtrl'
                },
                '/go_vote_detail': {//我要投票详情
                    path: 'modules/squaredance/go_vote_detail',
                    controller: 'goVoteDetailCtrl'
                },
                '/format_instructions': {//赛制说明
                    path: 'modules/squaredance/format_instructions',
                    controller: 'formatInstructionsCtrl'
                },
                '/awards_show': {//奖项设置
                    path: 'modules/squaredance/awards_show',
                    controller: 'awardShowCtrl'
                },
                '/go_apply': {//我要报名
                    path: 'modules/squaredance/go_apply',
                    controller: 'goApplyCtrl'
                },
                '/memb_detail': {//会员卡详情
                    path: 'modules/member/memb_detail',
                    controller: 'membDetailCtrl'
                },
                '/memb_order': {//提交订单
                    path: 'modules/member/memb_order',
                    controller: 'membOrderCtrl'
                },
                '/memb_od_detail': {//订单详情
                    path: 'modules/member/memb_od_detail',
                    controller: 'membodDetailCtrl'
                },
                '/memb_buylist': {//购买记录
                    path: 'modules/member/memb_buylist',
                    controller: 'membBuylistCtrl'
                },
                //双十一公众号会员卡页面
                '/wx_memb_bind': {//账号绑定
                    path: 'modules/member/wx_memb_bind',
                    controller: 'wxmembBindCtrl'
                },
                '/wx_memb_od_detail': {//提交订单二维码
                    path: 'modules/member/wx_memb_od_detail',
                    controller: 'wxmembOdDetailCtrl'
                },
                '/wx_memb_buylist': {//卡券列表-购买记录
                    path: 'modules/member/wx_memb_buylist',
                    controller: 'wxmembBuylistCtrl'
                },
                //2.0版本
                '/wx_od_detail': {//2.0版本二维码页面
                    path: 'modules/member/wx_od_detail',
                    controller: 'wxodDetailCtrl'
                },
                '/wx_card_list': {//2.0版本我的卡券
                    path: 'modules/member/wx_card_list',
                    controller: 'wxcardListCtrl'
                },
                '/wx_card_detail': {//2.0版本卡券详情
                    path: 'modules/member/wx_card_detail',
                    controller: 'wxcardDetailCtrl'
                },
                //双十二活动页面配置
                '/od_detail_12th': {//二维码页面-购年卡
                    path: 'modules/member/activity/od_detail_12th',
                    controller: 'odDetail12thCtrl'
                },
                '/buy_gift_12th': {//购好礼
                    path: 'modules/member/activity/buy_gift_12th',
                    controller: 'wxcardListCtrl'
                },
                '/user_address_12th': {//用户收货信息填写
                    path: 'modules/member/activity/user_address_12th',
                    controller: 'userAddress12thCtrl'
                },
                '/card_list_12th': {//卡券列表
                    path: 'modules/member/activity/card_list_12th',
                    controller: 'cardList12thCtrl'
                },
                '/card_detail_12th': {//卡券详情
                    path: 'modules/member/activity/card_detail_12th',
                    controller: 'wxcardDetailCtrl'
                }
            };


            //1.滑动slide_entry——TVlive_guide页面注入
            $stateProvider.state('/slide_entry.TVlive_guide', {
                url: '/TVlive_guide',
                views: {
                    "TVlive_guide@/slide_entry": {
                        templateUrl: 'modules/TVlive/TVlive_guide.html',
                        controller: 'TVlive_guideCtrl'
                    }
                },
                resolve: {
                    keyName: requireModule('modules/TVlive/TVlive_guide.js', 'TVlive_guideCtrl')
                }
            });
            //2.滑动slide_entry——index页面注入
            $stateProvider.state('/slide_entry.index', {
                url: '/index',
                views: {
                    "index@/slide_entry": {
                        templateUrl: 'modules/index/index.html',
                            controller: 'IndexCtrl'
                    }
                },
                resolve: {
                    keyName: requireModule('modules/index/index.js', 'IndexCtrl')
                }
            });

            // 3.滑动slide_entry——index_db页面注入
            //电视剧
            $stateProvider.state('/slide_entry.index_db_tv', {
                url: '/index_db_tv?t&coltype',
                views: {
                    "index_db_tv@/slide_entry": {
                        templateUrl: 'modules/index_db/index_db.html',
                        controller: 'index_dbCtrl'
                    }
                },
                resolve: {
                    keyName: requireModule('modules/index_db/index_db.js', 'index_dbCtrl')
                }
            });
            //电影
            $stateProvider.state('/slide_entry.index_db_film', {
                url: '/index_db_film?t&coltype',
                views: {
                    "index_db_film@/slide_entry": {
                        templateUrl: 'modules/index_db/index_db.html',
                        controller: 'index_dbCtrl'
                    }
                },
                resolve: {
                    keyName: requireModule('modules/index_db/index_db.js', 'index_dbCtrl')
                }
            });
            //综艺
            $stateProvider.state('/slide_entry.index_db_arts', {
                url: '/index_db_arts?t&coltype',
                views: {
                    "index_db_arts@/slide_entry": {
                        templateUrl: 'modules/index_db/index_db.html',
                        controller: 'index_dbCtrl'
                    }
                },
                resolve: {
                    keyName: requireModule('modules/index_db/index_db.js', 'index_dbCtrl')
                }
            });
            //动漫
            $stateProvider.state('/slide_entry.index_db_anime', {
                url: '/index_db_anime?t&coltype',
                views: {
                    "index_db_anime@/slide_entry": {
                        templateUrl: 'modules/index_db/index_db.html',
                        controller: 'index_dbCtrl'
                    }
                },
                resolve: {
                    keyName: requireModule('modules/index_db/index_db.js', 'index_dbCtrl')
                }
            });
            //纪录片
            $stateProvider.state('/slide_entry.index_db_documentary', {
                url: '/index_db_documentary?t&coltype',
                views: {
                    "index_db_documentary@/slide_entry": {
                        templateUrl: 'modules/index_db/index_db.html',
                        controller: 'index_dbCtrl'
                    }
                },
                resolve: {
                    keyName: requireModule('modules/index_db/index_db.js', 'index_dbCtrl')
                }
            });

            //ui-view入口注入
            for (var key in routeMap) {
                $stateProvider.state(key, {
                    url: key,
                    templateUrl: routeMap[key].path + '.html',
                    controller: routeMap[key].controller,
                    resolve: {
                        keyName: requireModule(routeMap[key].path + '.js', routeMap[key].controller)
                    }
                });
            }

            function requireModule(path, controller) {
                return function ($q) {
                    var deferred = $q.defer();
                    require([path], function (ret) {
                        $controllerProvider.register(controller, ret.controller);
                        deferred.resolve();
                    });
                    return deferred.promise;
                }
            }

            $urlRouterProvider.otherwise("/slide_entry");  //默认跳转到某个路由
        }
    ]);
    app.run(['$rootScope', '$location', '$state', function ($rootScope, $location, $state) {
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (toState && toState.url) {
                if (_wxshare_on) {
                    //微信分享
                    wxshare.check_(toState.url);
                }
                $rootScope.sc = GetRequest();
                //底部菜单切换样式
                if (toState.url == '/index') {
                    $rootScope.showTopBar = true;
                    $rootScope.showBottomBar = true;
                    $rootScope.current_menu = 1;
                } else if (toState.url == '/slide_entry') {
                    $rootScope.showTopBar = true;
                    $rootScope.showBottomBar = true;
                    $rootScope.current_menu = 1;
                } else if (toState.url == '/TVlive_guide') {
                    $rootScope.showTopBar = true;
                    $rootScope.showBottomBar = true;
                    $rootScope.current_menu = 2;
                } else if ($state.params.coltype == 'tv' && $state.params.t == '2') {//电视剧
                    $rootScope.showTopBar = true;
                    $rootScope.showBottomBar = true;
                    $rootScope.current_menu = 3;
                    $rootScope.choose_class = '#/choose_db?coltype=tv&title=2'
                } else if ($state.params.coltype == 'film' && $state.params.t == '1') {//电影
                    $rootScope.showTopBar = true;
                    $rootScope.showBottomBar = true;
                    $rootScope.current_menu = 4;
                    $rootScope.choose_class = '#/choose_db?coltype=film&title=1'
                } else if ($state.params.coltype == 'arts' && $state.params.t == '3') {
                    $rootScope.showTopBar = true;
                    $rootScope.showBottomBar = true;
                    $rootScope.current_menu = 5;
                    $rootScope.choose_class = '#/choose_db?coltype=arts&title=3'
                } else if ($state.params.coltype == 'anime' && $state.params.t == '4') {
                    $rootScope.showTopBar = true;
                    $rootScope.showBottomBar = true;
                    $rootScope.current_menu = 6;
                    $rootScope.choose_class = '#/choose_db?coltype=anime&title=4'
                } else if ($state.params.coltype == 'documentary' && $state.params.t == '5') {
                    $rootScope.showTopBar = true;
                    $rootScope.showBottomBar = true;
                    $rootScope.current_menu = 7;
                    $rootScope.choose_class = '#/choose_db?coltype=documentary&title=5'
                } else if (toState.url == '/activitydetail') {
                    $rootScope.showTopBar = false;
                    $rootScope.showBottomBar = false;
                    $rootScope.current_menu = 8;
                } else {
                    $rootScope.showTopBar = false;
                    $rootScope.showBottomBar = false;
                }
            }

            $.backscroll();
            $rootScope.title = '湖南IPTV';
            $rootScope.showremote = true;
            $rootScope.htmlname = '';
            $rootScope.navSelect = true;
            $rootScope.check = function () {
                $rootScope.navSelect = !$rootScope.navSelect
            }
            $rootScope.headimg = decodeURIComponent(getCookie('headimgurl'));
            $rootScope.add_d = function () {
                // 扫一扫添加设备
                wx.scanQRCode({
                    needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                    scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                    success: function (res) {
                        var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                    }
                });
            }

        });
    }])
    app.filter(
        'to_trusted', ['$sce', function ($sce) {
            return function (text) {
                return $sce.trustAsHtml(text);
            }
        }]
    )
    app.filter(
        'to_wan', ['$sce', function ($sce) {
            return function (num) {
                if (num >= 100000000) {
                    return (num / 100000000).toFixed(3) + '亿';
                } else if (num >= 10000) {
                    return (num / 10000).toFixed(1) + '万';
                } else {
                    return num;
                }
            }
        }]
    )
    app.filter(
        'idstrtwo', ['$sce', function ($sce) {
            return function (str) {
                return str.toString().substr(2);
            }
        }]
    )
    app.filter(
        "kankeid", [function () {
            return function (str) {
                var t = str.split('_');
                return t[1] ? str.split('_')[1] : undefined;
            }
        }]
    )
    app.filter(
        "time_one", [function () {
            return function (str) {
                var pi = str.indexOf('.');
                if (pi >= 0) {
                    str = str.substr(0, pi);
                }
                var dt = new Date(str.replace(/-/ig, '/'));
                var dtHours;
                var dtMimutes;
                if (dt.getHours() < 10) {
                    dtHours = "0" + dt.getHours();
                } else {
                    dtHours = dt.getHours();
                }
                if (dt.getMinutes() < 10) {
                    dtMimutes = "0" + dt.getMinutes();
                } else {
                    dtMimutes = dt.getMinutes();
                }
                return dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate() + ' ' + dtHours + ':' + dtMimutes;
            }
        }]
    )
    app.filter(
        "euc", [function () {
            return function (str) {
                return encodeURIComponent(str);
            }
        }]
    )
    app.filter(
        "vtype", [function () {
            return function (str) {
                if (str == "M" || str == "F") {
                    return 'film';
                } else if (str == "T") {
                    return 'tv';
                } else if (str == "E" || str == "A") {
                    return 'arts';
                } else if (str == "C") {
                    return 'anime';
                } else if (str == "D") {
                    return 'documentary';
                } else {
                    return str;
                }
            }
        }]
    )
    app.filter(
        "mytime", [function () {
            return function (str) {
                //取日期
                var tem = str.slice(0, 10);
                //时间
                var tem2 = str.slice(10, 16)
                var now = GetDateStr(0);
                var tomorrow = GetDateStr(1);
                if (tem == now) {
                    return '今天' + ':' + tem2;
                } else if (tem == tomorrow) {
                    return '明天' + ':' + tem2;
                } else {
                    var a = tem.slice(5, 10);
                    return a + ':' + tem2;
                }
            }
        }]
    )
    app.filter(
        "typecss", [function () {
            return function (str) {
                if (str == "F") {
                    return "tlc";
                } else if (str == "E") {
                    return "tld";
                } else if (str == "C") {
                    return "tle";
                } else if (str == "T") {
                    return "tlf";
                } else if (str == "D") {
                    return "tlg";
                } else {
                    return 'tli';
                }
            }
        }]
    );
    app.filter(
        "trancode", ['$sce', function ($sce) {
            return function (text) {
                return $sce.trustAsHtml(text);
            }
        }]
    );
    app.filter(
        "typepng", [function () {
            return function (str) {
                if (str == "F") {
                    return "img/ico_index03fr.png";
                } else if (str == "E") {
                    return "img/ico_index04fr.png";
                } else if (str == "C") {
                    return "img/ico_index05fr.png";
                } else if (str == "T") {
                    return "img/ico_index06fr.png";
                } else if (str == "D") {
                    return "img/ico_index07fr.png";
                } else {
                    return 'img/ico_index08fr.png';
                }
            }
        }]
    );

    app.directive('back', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.on('click', function () {
                    if (window.location.href.indexOf("shake=shake") > -1) {
                        window.location.href = webset.base;
                    } else {
                        if (window.history.length > 1) {
                            window.history.go(-1);
                        } else {
                            window.location.href = webset.base + '?code=' + getUrlParam('code');
                        }
                    }
                })
            }
        }
    }).directive('onFinishRenderFilters', function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                if (scope.$last === true) {
                    $timeout(function () {
                        //这里element, 就是ng-repeat渲染的最后一个元素
                        scope.$emit('ngRepeatFinished', element);
                    });
                }
            }
        };
    }).directive('errSrc', function () {
        return {
            link: function (scope, element, attrs) {
                element.bind('error', function () {
                    if (attrs.src != attrs.errSrc) {
                        attrs.$set('src', attrs.errSrc);
                    }
                });
            }
        }
    }).directive('midTimeBtn', function () {
        return {
            link: function (scope, element, attrs) {
                var strattime = attrs.startt,
                    endtime = attrs.endt;
                var st = new Date(strattime.replace(/-/ig, '/')).getTime(),
                    nt = new Date().getTime(),
                    et = new Date(endtime.replace(/-/ig, '/')).getTime();
                if (st <= nt && nt < et) {
                    element.attr('class', 'gobtn').html('直播');
                } else {
                    element.remove()
                }
            }
        }
    })
    return app;
});



