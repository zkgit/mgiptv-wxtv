define(['angular', 'wxshare','size', 'fun'], function(angular) {
	controller.$inject = ['$scope', '$rootScope','$stateParams', '$http'];

	function controller($scope, $rootScope, $stateParams,$http) {
		$rootScope.htmlname = 'db-detail detial bgcfff pb10';
		$scope.rem = window.rem / 100;
		$scope.openid = encodeURIComponent( getUrlParam('rn'))  ;
		$scope.boxId = getCookie('boxId');
		$scope.sc = GetRequest();
		$scope.pinyinCity=getCookie('pinyinCity');
		setCookie('openid',$scope.openid);
		$scope.headimg = decodeURIComponent(getCookie('headimgurl'));

		$scope.bs = new botscroll(100, 85);
		$scope.bs.isc = true;
		//做加载提示
		$scope.loadtextshow = true;
		$scope.wholeshow=false;
		//相关推荐
		$scope.tjshow = false;

		if(getCookie('token')=='undefined'||getCookie('token')==null) {
			//openid等存储cookie
			$http.post(webset.initurl + '?openid=' + $scope.openid, {}).success(function (res) {
				setCookie('token', res.token);
				setCookie('nickname', encodeURIComponent(res.nickname));
				setCookie('headimgurl', res.headimgurl);
				$scope.token = res.token;
			});
		}else{
			$scope.token = getCookie('token');
		}
		//设备
		$http.post(webset.device + '?key=' + $scope.openid + '&type=1', {}).success(function (rest) {
			if (rest && rest.response.responseHeader.code == "200") {
				setCookie("boxId", rest.response.responseBody);
			}
		});

		$scope.fold1 = true;
		$scope.fold2 = true;
		$scope.fold3 = true;
		$scope.fold4 = true;
		$scope.unfold = function(i) {
			if(i == 1) {
				$scope.fold1 = !$scope.fold1;
			} else if(i == 2) {
				$scope.fold2 = !$scope.fold2;
			} else if(i == 3) {
				$scope.fold3 = !$scope.fold3;
			}else if(i == 4) {
				$scope.fold4 = !$scope.fold4;
			}
		}
		$scope.elm = {
			"J_dtpop": $('#J_dtpop'),
			"J_fullintro": $('#J_fullintro'),
			"J_dm_show": $('#J_dm_show'),
			"J_details_b": $('#J_details_b'),
			"J_scroll_go": $('#J_scroll_go'),
			"J_video": $('#J_video')
		};
		$scope.$on("$destroy", function() {
			$(window).unbind('scroll');
		});
		$scope.f = $scope.sc.columnType == "tv"||$scope.sc.columnType== 'anime'? true :false;
		$scope.activejson = {};

		if($scope.sc.from == 'search') {
			$rootScope.fromsearch = true;
		}

		if($scope.sc.zb){
			//加载视频播放源
			$http.post(webset.testapiurl + 'epg/vodPlayUrl.json?channelId='+$scope.sc.channelID+'&channelCp='+$scope.pinyinCity, {}).success(function(res) {
				$scope.videoplayURL=res.response.responseBody;
				console.info('视屏播放源：',$scope.videoplayURL);
				// document.getElementById('J_video').setAttribute('src',$scope.videoplayURL);
			});
		}

		$scope.getdetail = function(vodId,kankeId) {
			if($scope.sc.columnType == "film") {
				$scope.isfilm = true;
			} else {
				$scope.isfilm = false;
			}
			$scope.fadedmt = [];
			$scope.fadedmtnum = 0;
			$http.post(webset.testapiurl + 'vod/detail.json?appKey=D176EB3E8B1F044B&appScrect=64&vodId=' + $scope.sc.vodId + '&kankeId=' + $scope.sc.kankeId+'&did='+$scope.pinyinCity, {}).success(function(res) {
				if(res.response.responseHeader.code=="200"){
					//做加载提示
					$scope.loadtextshow = false;
					$scope.wholeshow=true;
					$scope.detail = res.response.responseBody;
					//详情页面的海报
					$scope.bpicitems = [
						{bpic: res.response.responseBody.bpic,class:'poster-rotate-left'},
						{bpic: res.response.responseBody.bpic,class:'poster-rotate-center'},
						{bpic: res.response.responseBody.bpic,class:'poster-rotate-right'}
					];
					console.log('节目详情', $scope.detail);
					$scope.details=$scope.detail.details?$scope.detail.details:'';
					if($scope.details){
						for(var i =0,len=$scope.details.length;i<len;i++){
							$scope.details[i].image="img/gif/"+$scope.details[i].key_en+".gif";
						}
					}
                    //分享
					if(_wxshare_on) {
						//微信分享
						var urltem = window.location.href;
						wxshare.weixinshare_($scope.detail.title, $scope.detail.lpic + '!m180x180.jpg', $scope.detail.description.substr(0, 26) + '···', urltem);
					}
					if($scope.sc.columnType != "film" && !$scope.sc.zb) {
						$scope.getdm(1);
					}
					$scope.actors();
					// if(!$scope.sc.zb) {
					// 	$scope.zb(); //点播关联直播预告
					// }
					$scope.mystate();
					// 评论
					$scope.pl();
					$scope.tj();
					if($scope.details.length>0){
						$scope.dm.key_en=$scope.details[0].key_en;
						$scope.dm.key_zh=$scope.details[0].key;
						if(!$scope.sc.zb){
							// $scope.getMobiledm(1);
						}
					}
				}else{
					if(!$scope.sc.zb){
						$scope.loadtextshow = false;
						$scope.wholeshow=true;
						$.going('vodId未查到对应数据');
						setTimeout(function () {
							$.stopgo();
							goBack();
						},1500)
					}
				}
			});
		};
		//暂时屏蔽分割线------
		//点播的直接加载详情页面，为解决常看频道进入详情页面后当前节目对应的无详情页面
		// if(!$scope.sc.zb){
		// 	$scope.getdetail($scope.sc.vodId,$scope.sc.kankeId);
		// }
		//------
		$scope.getdetail();

		$scope.addhistory = function() {
			if(!$scope.detail) {
				return false;
			}
			//增加首页推荐添加历史的标识---&recommend=1；
			if($scope.sc.recommend){
				if($scope.sc.zb){
					urlscy = webset.testapiurl + 'user/history/save.json?vodId=' + $scope.sc.vodId+'&kankeId='+$scope.sc.kankeId+'&appKey=D176EB3E8B1F044B&appScrect=64&behaviorType=history&token=' + $scope.token+'&distict='+$scope.pinyinCity+'&recommend=1'+'&englishName='+$scope.sc.englishName;
				}else{
					urlscy = webset.testapiurl + 'user/history/save.json?vodId=' + $scope.sc.vodId+'&kankeId='+$scope.sc.kankeId+'&appKey=D176EB3E8B1F044B&appScrect=64&behaviorType=history&token=' + $scope.token+'&distict='+$scope.pinyinCity+'&recommend=1'
				}
			}else {
				urlscy = webset.testapiurl + 'user/history/save.json?vodId=' + $scope.sc.vodId+'&kankeId='+$scope.sc.kankeId+'&appKey=D176EB3E8B1F044B&appScrect=64&behaviorType=history&token=' + $scope.token+'&distict='+$scope.pinyinCity+'&recommend=0' ;
			}
			$http.post(urlscy, {}).success(function(e) {
				console.log('添加历史', e);
			});
		};
		$scope.dindex = -1;
		$scope.dm = {
			"key_en": "",
			"totalrecords": 0,
			"key_zh": "",
			"dindex":0
		};

		if($scope.sc.zb) {
			//直播页面
			$scope.getjmlist = function() {
				$scope.sc.vid = '';
				$scope.sc.type = '';
				var jmurl = webset.testapiurl + 'epg/liveEpg.json?appKey=D176EB3E8B1F044B&appScrect=64&channelId=' + $scope.sc.channelID + '&date=' + $scope.dates+'&cp='+$scope.pinyinCity;
				$http.post(jmurl, {}).success(function(e) {
					//做加载提示
					$scope.loadtextshow = false;
					$scope.wholeshow=true;
					console.log('节目单', e.response);
					$scope.jmlist = e.response.responseBody;
					var data = $scope.jmlist,
						gt = 0,
						len = $scope.jmlist.length,
						t = new Date(),
						tm = t.getTime(),
						tstr = $scope.dates.replace(/-/ig, '/');
					for(var i = 0; i < len; i++) {
						var nt = new Date(tstr + ' ' + data[i].startTime).getTime();
						if(t < nt) {
							gt = i - 1;
							$scope.activejson = data[gt];
							break;
						}
					}
					//暂时屏蔽分割线------
					//调整逻辑定位epg节目加载详情，为解决常看频道进入详情页面后当前节目对应的无详情页面
					// $scope.getdetail('',$scope.activejson.kankeId);
					//------
					//新增start
					for(var i = 0; i < len; i++) {
						var nt = new Date(tstr + ' ' + data[i].startTime).getTime();
						if(t < nt) {
							data[i].order_active = true;
						}
					}
					//已经预约状态
					var orderlistUrl = webset.testapiurl + "user/userReserveInfo.json?openId=" + $scope.openid;
					$http.post(orderlistUrl, {}).success(function(e) {
						if(e && e.response.responseHeader.code == 200) {
							$scope.list = e.response.responseBody;
							var list = $scope.list;
							for(var i = 0; i < len; i++) {
								var liveStartTime_i = $scope.dates + " " + data[i].startTime;
								var liveEndTime_i = $scope.dates + " " + data[i].endTime;
								var nt = new Date(tstr + ' ' + data[i].startTime).getTime();
								if(t < nt) {
									if(list != undefined && list != '' && list != null) {
										var orderInfo = 'liveStartTime=' + liveStartTime_i + '&liveEndTime=' + liveEndTime_i + '&channelId='+data[i].channelId;
										for(j = 0; j < list.length; j++) {
											var orderInfo_j = 'liveStartTime=' + list[j].liveStartTime + '&liveEndTime=' + list[j].liveEndTime + '&channelId='+list[j].channelId;
											if(orderInfo_j == orderInfo) {
												console.log('已预约节目', orderInfo);
												data[i].isorder = 1;
												data[i].isorder = 1;
											}
										}
									}
								}
							}
						}
					});
					//新增end
					if($scope.jmtimeeq == 3) {
						data[gt].active = true;
						$scope.sc.vid = data[gt].videoId;
						$scope.sc.type = getvtype(data[gt].classId);
					}
				});
			}
			// $scope.tabs = function(v) {
			// 	$scope.istab = v;
			// 	var elms = $scope.elm.J_scroll_go;
			// 	var eq = parseInt(elms.find('.active').attr('eq'));
			// 	elms.scrollTop((eq - 2) * 50 * $scope.rem)
			// };

			$scope.jmtime = [];
			$scope.jmbacktime = [];
			$scope.jmtimeeq = 3;
			$scope.jmbacktimeeq = 6;
			var data = new Date(),
				str = '',
				wkarr = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
				day = data.getDay();
			data.setDate(data.getDate() - 4);
			for(var i = 0; i < 7; i++) {
				data.setDate(data.getDate() + 1);
				var obj = {};
				obj.class = data.getDay() == day ? "active" : '';
				var ts = data.getFullYear() + '-' + (data.getMonth() + 1 < 10 ? ('0' + (data.getMonth() + 1)) : (data.getMonth() + 1)) + '-' + (data.getDate() >= 10 ? data.getDate() : ('0' + data.getDate()));
				obj.timestr = ts;
				obj.day = wkarr[data.getDay()];
				$scope.jmtime.push(obj);
				if(data.getDay() == day) {
					$scope.dates = ts;
				}
			}
			var databack = new Date(),
				strback = '';
			databack.setDate(databack.getDate() - 7);
			for(var i = 0; i < 7; i++) {
				databack.setDate(databack.getDate() + 1);
				var obj = {};
				obj.class = databack.getDay() == day ? "active" : '';
				var ts = databack.getFullYear() + '-' + (databack.getMonth() + 1 < 10 ? ('0' + (databack.getMonth() + 1)) : (databack.getMonth() + 1)) + '-' + (databack.getDate() >= 10 ? databack.getDate() : ('0' + databack.getDate()));
				obj.timestr = ts;
				obj.day = (databack.getMonth() + 1 < 10 ? ('0' + (databack.getMonth() + 1)) : (databack.getMonth() + 1)) + '-' + (databack.getDate() >= 10 ? databack.getDate() : ('0' + databack.getDate()));
				$scope.jmbacktime.push(obj);
				if(databack.getDay() == day) {
					$scope.dates = ts;
				}
			}

			$scope.elm.J_scroll_go.css('height', window.innerHeight - 2.9 * window.rem);

			$scope.changeday = function(eq, timestr) {
				$scope.dates = timestr;
				$scope.jmtimeeq = parseInt(eq);
				$scope.getjmlist();
			}
			$scope.changedayback = function(eq, timestr) {
				$scope.dates = timestr;
				$scope.jmbacktimeeq = parseInt(eq);
				$scope.getjmlistback();
			}
			$scope.getjmlist(); //直播节目单初始化
			$scope.addChannel = function() {
				var channel_data =$scope.jmlist;
				if(!$scope.detail) {
					return false;
				}
				if($scope.sc.recommend){
					urlscy = webset.testapiurl + 'user/oftenReadChannel/'+channel_data[0].channelId+'/'+channel_data[0].channelKEn+'/'+$scope.openid+'/'+channel_data[0].startTime+'/tv/'+channel_data[0].kankeId+'/'+$scope.pinyinCity+'.json'+'?token='+$scope.token+'&channelName='+channel_data[0].channelName+'&recommend=1';
				}else {
					urlscy = webset.testapiurl + 'user/oftenReadChannel/'+channel_data[0].channelId+'/'+channel_data[0].channelKEn+'/'+$scope.openid+'/'+channel_data[0].startTime+'/tv/'+channel_data[0].kankeId+'/'+$scope.pinyinCity+'.json'+'?token='+$scope.token+'&channelName='+channel_data[0].channelName+'&recommend=0';
				}
				$http.post(urlscy, {}).success(function(e) {
					console.log('添加常看频道', e);
				});
			}

		} else {
			$scope.getPlaySource=function(v, eq, keyz){
					$scope.dm.key_en = v;
					$scope.dm.key_zh = keyz;
					$scope.dm.totalrecords = 0;
					$scope.dm.dindex = eq;
					$scope.fdindex=0;
					// $scope.getMobiledm(1);
			}
			$scope.getdm = function(pg) {
				$scope.fadedmtnum = pg;
				$scope.fdindex = pg - 1;
				//电视推送剧集
				var dmurl = webset.testapiurl + 'vod/tvdrama.json?'+'code='+$scope.detail.code.split(',')[0] +'&id='+$scope.detail.combineid+'&pageSize=10&pageNo='+pg;
				$http.post(dmurl, {}).success(function(e) {
					if(e&&e.response.responseHeader.code=='SCC_002'){
						console.log('剧集信息', e);
						if($scope.dm.totalrecords == 0) {
							$scope.dm.totalrecords = e.response.responseBody.totalrecords;
							$scope.fadedmt = $scope.newarr(e.response.responseBody.totalrecords);
						}
						//剧集集数
						$scope.nottv_darma = e.response.responseBody.list;
						$scope.nottv_darma_total=e.response.responseBody.totalrecords;
					}else{
						$scope.nottv_darma=false;
					}
				});
			};

			$scope.newarr = function(num) {
				var len = Math.ceil(num / 10),
					arr = [];
				for(var i = 0; i < len; i++) {
					arr.push(i);
				}
				return arr;
			}
			//手机剧集观看
			$scope.fdindexM = 0;
			// $scope.addhistory();
			$scope.getMobiledm=function(pg){
				$scope.fadedmtnum = pg;
				$scope.fdindexM = pg - 1;
				var id = $scope.detail.kanke_id.split('_')[1];
				var videoType =$scope.detail.kanke_id.split('_')[0];
				$http.post(webset.testapiurl + 'vod/mobileDrama.json?id='+id+'&videoType='+videoType+'&keyEn='+$scope.dm.key_en+'&pageSize=10&pageNo=' + pg , {}).success(function(e) {
					if(e&&e.response.responseHeader.code=='200'){
						console.log('手机观看剧集信息', e);
						$scope.phone_darma=e.response.responseBody.list;
						$scope.phone_total=e.response.responseBody.totalrecords
						$scope.phone_total_daram=$scope.newarr(e.response.responseBody.totalrecords);
					}
				})
			};
		}
		$scope.tj = function() {
			var urltj = webset.testapiurl + 'iti/iti_vod.json?vodId=' + $scope.detail.videoId+'&kanke_id='+$scope.detail.kanke_id+'&districtId='+$scope.pinyinCity;
			$http.post(urltj, {}).success(function(e) {
				if(e.response.responseBody.list.length > 0) {
					$scope.tjshow = true;
				}
				$scope.tjlist = e.response.responseBody.list;
				console.log('相关推荐', $scope.tjlist);
			});
		}
		//评论
		$scope.pl = function() {
			var plurl = webset.testapiurl + 'user/reply/list.json?appKey=D176EB3E8B1F044B&appScrect=64&pageNo=1&pageSize=30&vodId=' + $scope.sc.vodId+'&kankeId='+$scope.sc.kankeId+'&token=' + $scope.token+'&replyId=0';
			$http.post(plurl, {}).success(function(e) {
				if(e.response.responseHeader.code=='200') {
					console.log('评论列表', e.response);
					$scope.pllist = e.response.responseBody.list;
					$scope.commons = e.response.responseBody.list.length;
				}
			});
		}
		//明星列表
		$scope.actors = function() {
			var dmurl = webset.testapiurl + 'recommend/star/profiles.json?appKey=D176EB3E8B1F044B&appScrect=64&id=' + $scope.detail.actorId.replace(/\;/g, ',');
			$http.post(dmurl, {}).success(function(e) {
				if(e.responseHeader.code=='200') {
					console.log('明星列表', e);
					$scope.actorlist = e.responseBody;
				}
			});
		};
		$scope.sameProgram = false;

		// $scope.zb = function() {
		// 		var dmurl = webset.apiurl + 'vod/sameProgram.json?appKey=D176EB3E8B1F044B&appScrect=64&title=' + $scope.detail.title + '&classId=' + ttypes($scope.sc.columnType);
		// 		$http.post(dmurl, {}).success(function(e) {
		// 			console.log('点播关联直播-节目预告', e);
		// 			if(e && e.page && e.page.list && e.page.list.length > 0) {
		// 				$scope.sameProgram = true;
		// 				$scope.zblist = e.page.list;
		// 			} else {
		// 				$scope.sameProgram = false;
		// 				$scope.zblist = '';
		// 			}
		// 		});
		// 	}

		//点赞 点踩 收藏状态
		$scope.mystate = function() {
			var stateurl = webset.testapiurl + 'user/state/check.json?appKey=D176EB3E8B1F044B&appScrect=64&vodId=' + $scope.sc.vodId + '&kankeId=' + $scope.sc.kankeId+'&token=' + $scope.token;
			$http.post(stateurl, {}).success(function(e) {
				console.log('节目点赞/点踩/收藏状态', e.response);
				if(e && e.response.responseHeader.code == 200) {
					$scope.states = e.response.responseBody;
					$scope.is_collect = $scope.states.isCollectioned == '1' ? true : false; //是否收藏
					$scope.likenum = $scope.states.beLikeCount; //点赞数量
					$scope.is_like = $scope.states.beLike == '1' ? true : false; //是否点赞
				}
			});
		};
		//评论功能屏蔽start

		$scope.type = 1;
		$scope.commentId = '';
		$scope.tip = '我也说句话';
		$scope.commentfocus = function(id, nick, type) {
			$scope.focusJudge=!$scope.focusJudge
			if($scope.focusJudge){
				if(id!= 0) {
					$("#J_text").attr('placeholder', '回复@' + nick);
					$scope.tip = '回复@' + nick;
				}else {
					$scope.tip = '我也说句话';
				}
				$scope.commentId = id;
				$("#J_text").focus();
				$scope.type = type;
				$scope.commenttext = '';
			}
		}
		$scope.commentId="0";
		$("#J_text").on('blur', function() {
			if($scope.commenttext == undefined || $scope.commenttext.length == 0) {
				$("#J_text").attr('placeholder', '我也说句话');
				$scope.tip = '我也说句话';
				$scope.commentId="0";
				console.info("commenId",$scope.commentId)
			}
		})
		$scope.senttext = function() {
			if($scope.sc.vodId == ''&& $scope.sc.kankeId == '') {
				$.tipshow({
					'msg': '无法评论',
					'type': 'warning'
				});
				return false;
			}
			if($scope.commenttext == undefined || $scope.commenttext == '') {
				$.tipshow({
					'msg': '评论内容不可为空',
					'type': 'warning'
				});
				return false;
			}
			var senturl = webset.testapiurl + 'user/reply/save.json?',
				data = {
					"context": $scope.commenttext,
					"vodId": $scope.sc.vodId,
					"kankeId": $scope.sc.kankeId,
					"token": $scope.token,
					"appKey": "D176EB3E8B1F044B",
					"appScrect": "64",
					"replyId":$scope.commentId
				};

			var transform = function(data) {
				return $.param(data);
			};

			$http.post(senturl, data, {
				headers: {
					'Content-Type': 'application/x-www-form-urlenc' +
					'oded; charset=UTF-8'
				},
				transformRequest: transform
			}).success(function(e) {
				console.log('发表评论', e.response)
				if(e && e.response.responseHeader.code == "200") {
					$scope.tip = '我也说句话';
					$scope.commentId="0";
					$.tipshow({
						'msg': '评论成功',
						'type': 'success'
					});
					$scope.pl();
					$scope.commenttext = undefined;
				}
			});
		}

        //end
		$scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
			var elms = $scope.elm.J_scroll_go;
			elms.scrollTop(0);
			var eq = parseInt(elms.find('.active').attr('eq'));
			elms.scrollTop((eq) * 50 * $scope.rem)
		});
		$scope.collect = function() {
			//$scope.pac($scope.is_collect, 'collection', '收藏');
			if(!$scope.detail) {
				$.tipshow({
					'msg': '无法添加收藏',
					'type': 'warning'
				});
				return false;
			}

			var urlscy;
			if(!$scope.is_collect) { //收藏
				urlscy = webset.testapiurl + 'user/collect/save.json?appKey=D176EB3E8B1F044B&appScrect=64&token=' + $scope.token + '&vodId=' + $scope.sc.vodId + '&kankeId=' + $scope.sc.kankeId+'&operation=2'+'&distict='+$scope.pinyinCity;
			} else { //取消收藏
				urlscy = webset.testapiurl + 'user/collect/save.json?appKey=D176EB3E8B1F044B&appScrect=64&token=' + $scope.token + '&vodId=' + $scope.sc.vodId + '&kankeId=' + $scope.sc.kankeId+'&operation=-2'+'&distict='+$scope.pinyinCity;
			}
			$http.post(urlscy, {}).success(function(e) {
				console.log('收藏', e);
				if(e && e.response.responseHeader.code == "200") {
					var msg = $scope.is_collect ? '取消收藏' : '收藏成功';
					$.tipshow({
						'msg': msg,
						'type': 'success'
					});
					$scope.is_collect = !$scope.is_collect;
				} else {
					var msg = $scope.is_collect ? '取消收藏失败' : '收藏失败';
					$.tipshow({
						'msg': msg,
						'type': 'warning'
					});
				}
			});
		}
		$scope.like = function() {
			$scope.pac($scope.is_like, 'belike', '点赞');
		}
		$scope.pac = function(yn, type, text) {
			if(!$scope.detail) {
				$.tipshow({
					'msg': '无法' + text,
					'type': 'warning'
				});
				return false;
			}
			var value;
			if(yn) value = -1
			else value = 1
			var pacurl = webset.testapiurl + 'user/collect/save.json?vodId=' + $scope.sc.vodId + '&kankeId=' + $scope.sc.kankeId+'&operation='+value+'&appKey=D176EB3E8B1F044B&appScrect=64&token=' + $scope.token
			$http.post(pacurl, {}).success(function(e) {
				console.log(type, e.response);
				if(e && e.response.responseHeader.code == "200") {
					var msg = yn ? '取消' + text : text + '成功';
					$.tipshow({
						'msg': msg,
						'type': 'success'
					});
					if(type == "belike") {
						if($scope.is_like == false) {
							$scope.likenum = parseInt($scope.likenum) + 1;
						} else {
							if(parseInt($scope.likenum) == 0 || !$scope.likenum) {
								$scope.likenum = 0;
							} else {
								$scope.likenum = parseInt($scope.likenum) - 1;
							}
						}
						$scope.is_like = !$scope.is_like;
					} else if(type == "collection") {
						$scope.is_collect = !$scope.is_collect;
					}

				} else {
					var msg = $scope.is_like ? '取消' + text + '失败' : text + '失败';
					$.tipshow({
						'msg': msg,
						'type': 'warning'
					});
				}

			});
		}

		$scope.gotoplay = function(index, link,code) {
			$scope.daindex = index-1;
			$scope.tvCode=code;
			console.info("剧集推送码"+$scope.tvCode);
			var urlpv=webset.ctrl;
			urlpv += 'playVideo.json?boxId='+$scope.boxId+'&assetid='+$scope.tvCode+'&title='+encodeURI($scope.detail.title)+'&series_code='+$scope.detail.series_code+'&videoType='+$scope.detail.videoType+'&citycode='+$scope.pinyinCity+'&sourceStatus='+$scope.detail.sourceStatus+'&detailUrl='+$scope.detail.detailUrl;
			//播放数据校验
			// $http.post(webset.testapiurl + 'vod/playflag.json?vodId=' + $scope.detail.videoId+'&kankeId='+$scope.detail.kanke_id+'&did='+$scope.pinyinCity, {}).success(function(res) {
			// 	if(res.response.responseHeader.code=='SCC_002') {
			// 		console.log('播放校验返回标识:1可以播放/0不可以播放:', res.response.responseBody);
			// 		if(res.response.responseBody=='0'){
			// 			$.playCheckTipshow({
			// 				'msg': '提示:抱歉!该影片不支持当前地区播放!',
			// 				'type': 'warning'
			// 			});
			// 		}else{
						//点播电视推送
						$http.post(urlpv, {}).success(function(res) {
							$scope.addhistory();
							if(res && res.response.responseHeader.code == "200") {
								console.log('电视已推送，播放:成功');
								$.tipshow({
									'msg': '推送成功',
									'type': 'success'
								});
							} else {
								console.log('电视已推送，播放:失败');
								$.tipshow({
									'msg': '推送失败',
									'type': 'warning'
								});
							}
						});
			// 		}
			// 	}
			// });
		}
		$scope.gotoMobilePlay=function(link){
				window.location.href = link;
		}
		//新增为了解决冒泡下，href跳转我的设备失败
		$scope.goto=function(){
			window.location.href='#/mine_device'
		}
		//绑定提示框
		$scope.tips=false;
		$scope.diTips=false;
		$rootScope.bodyovh=false;
		//弹出框先隐藏
		$scope.tvPop=false;
		$scope.mbPop=false;
		$scope.stopBubble = function($event) {
			$event.stopPropagation();
			$event.preventDefault();
		}
		$scope.resetstate = function() {
			$scope.tips=false;
		}
		//点播推送手机观看弹出框
			//取消
		$scope.dibble = function() {
			$scope.diTips=false;
			$rootScope.bodyovh=false;
		}
			//显示
		$scope.playmb=function(){
			$scope.diTips=true;
			$rootScope.bodyovh=true;
			$scope.mbPop=true;
			$scope.tvPop=false;
		};
		// 电视推送并添加历史记录
		$scope.playtv = function(cvp, channelNumber, startTime) {
			if(!getCookie('boxId')) {
				$scope.tips=true;
				return false;
			}
			if($scope.sc.zb && cvp == undefined) {
				$scope.addhistory();
				var zb_data =$scope.jmlist;
				var senturl = webset.ctrl + 'playLive.json',
					data = {
						"boxId": $scope.boxId,
						"networkid":"1",
						"tsid":zb_data[0].channelSid,
						"serviceid":zb_data[0].channelId,
						"zh_name":zb_data[0].channelKEn,
						"frequence":zb_data[0].channelTid,
						'citycode':$scope.pinyinCity
					};
				var transform = function(data) {
					return $.param(data);
				};
					//播放数据校验
					// $http.post(webset.testapiurl + 'vod/playflag.json?vodId=' + $scope.detail.videoId+'&kankeId='+$scope.detail.kanke_id+'&did='+$scope.pinyinCity, {}).success(function(res) {
					// 	if(res.response.responseHeader.code=='SCC_002') {
					// 		console.log('播放校验返回标识:', res.response.responseBody);
					// 		if(res.response.responseBody=='0'){
					// 			$.playCheckTipshow({
					// 				'msg': '提示:抱歉!该影片不支持当前地区播放!',
					// 				'type': 'warning'
					// 			});
					// 		}else{
								//直播电视推送
								$http.post(senturl, data, {
									headers: {
										"Accept":"text/html;charset=UTF-8",
										'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
									},
									transformRequest: transform
								}).success(function(res) {
									console.log('直播电视播放:', res);
									if(res && res.response.responseHeader.code == "200") {
										$.tipshow({
											'msg': '推送成功',
											'type': 'success'
										});
										$scope.addChannel();
									} else {
										$.tipshow({
											'msg': '推送失败',
											'type': 'warning'
										});
									}
								});
					// 		}
					// 	}
					// });
				} else if($scope.sc.zb) {
                    //回看播放
					// var StartDate = $scope.dates.replace('-', '').replace('-', '');
					// var StartTime = startTime + ':00';
					// var back_url = webset.ctrl + 'playBack.json?StartDate=' + StartDate + '&StartTime=' + StartTime + '&boxId=' + getCookie("boxId") + '&channelNumber=' + channelNumber + '&code=' + cvp + '&title=' + ($scope.detial ? $scope.detial.title : '');
					// $http.post(back_url, {}).success(function(res) {
					// 	console.log('回看电视播放:', res);
					// 	if(res && res.result == "SUCCESS") {
					// 		$.tipshow({
					// 			'msg': '推送成功',
					// 			'type': 'success'
					// 		});
					// 	} else {
					// 		$.tipshow({
					// 			'msg': '推送失败',
					// 			'type': 'warning'
					// 		});
					// 	}
					// });
				} else {
					var urlpv = webset.ctrl;
					if($scope.detail.videoType =="film") {
						urlpv += 'playVideo.json?boxId='+$scope.boxId+'&assetid='+$scope.detail.play_code+'&title='+encodeURI($scope.detail.title)+'&series_code='+$scope.detail.series_code+'&videoType='+$scope.detail.videoType+'&citycode='+$scope.pinyinCity+'&sourceStatus='+$scope.detail.sourceStatus+'&detailUrl='+$scope.detail.detailUrl;
						//播放数据校验
						// $http.post(webset.testapiurl + 'vod/playflag.json?vodId=' + $scope.detail.videoId+'&kankeId='+$scope.detail.kanke_id+'&did='+$scope.pinyinCity, {}).success(function(res) {
						// 	if(res.response.responseHeader.code=='SCC_002'){
						// 		console.log('播放校验返回标识:1可以播放/0不可以播放:', res.response.responseBody);
						// 		if(res.response.responseBody=='0'){
						// 			$.playCheckTipshow({
						// 				'msg': '提示:抱歉!该影片不支持当前地区播放!',
						// 				'type': 'warning'
						// 			});
						// 		}else{
									//点播电视推送
									$http.post(urlpv, {}).success(function(res){
										$scope.addhistory();
										if(res && res.response.responseHeader.code == "200") {
											console.log('电视已推送，播放:成功');
											$.tipshow({
												'msg': '推送成功',
												'type': 'success'
											});
										} else {
											console.log('电视已推送，播放:失败');
											$.tipshow({
												'msg': '推送失败',
												'type': 'warning'
											});
										}
									});
						// 		}
						// 	}
						// });
					}else{
						$scope.diTips=true;
						$rootScope.bodyovh=true;
						$scope.tvPop=true;
						$scope.mbPop=false;
					}
				}
			}
		$scope.ordertv = function(data, index, zblist) {
			var liveStartTime;
			var liveEndTime;
			if(zblist) {
				liveStartTime = data.startTime.length>5?data.startTime:(GetDateStr(0) + " " + data.startTime);
				liveEndTime = data.startTime.length>5?data.startTime:(GetDaeStr(0) + " " + data.endTime);
			} else {
				liveStartTime = $scope.dates + " " + data.startTime;
				liveEndTime = $scope.dates + " " + data.endTime;
			}
			var orderUrl = webset.base + "tran?DEEPURL=";
			if(data.isorder){
				orderUrl += testapiServerBase + "api/v1/user/reserveLive.json?liveStartTime=" + liveStartTime + "&liveEndTime=" + liveEndTime + "&openId=" + $scope.openid + "&channelId="+data.channelId+"&channelNameZh=" + encodeURI(data.channelName) + "&channelNameEn=" + data.channelKEn + "&programName=" + encodeURI(data.videoTitle?data.videoTitle:data.title) +"&isReserve=0&channelPicUrl=" + data.icon2+ '&vodId=' + '' +'&videoId='+''+'&kankeId='+ data.kankeId+'&tsid='+'&SERVICEID='+data.channelId+'&frequence='+data.channelTid+'&columnType='+data.videoType;
				$http.get(orderUrl, {}).success(function(e) {
					console.log('取消预约节目', e);
						if(e.response.responseHeader.code == 200) {
							data.isorder=false;
							$.tipshow({
								'msg': '取消预约成功',
								'type': 'success'
							});
						} else {
							$.tipshow({
								'msg': '取消预约失败',
								'type': 'warning'
							});
						}
				});
			}else{
				orderUrl += testapiServerBase + 'api/v1/user/reserveLive.json?liveStartTime=' + liveStartTime + '&liveEndTime='+ liveEndTime + '&openId=' + $scope.openid + '&channelId='+data.channelId+'&channelNameZh=' + encodeURI(data.channelName) + '&channelNameEn=' + data.channelKEn + '&programName=' + encodeURI(data.videoTitle?data.videoTitle:data.title) +'&isReserve=1&channelPicUrl=' + data.icon2+ '&vodId=' + '' +'&videoId='+''+'&kankeId='+ data.kankeId+'&tsid='+'&SERVICEID='+data.channelId+'&frequence='+data.channelTid+'&columnType='+data.videoType;
				$http.get(orderUrl, {}).success(function(e) {
					console.log('预约节目', e);
					if(e && e.response.responseHeader.code == 200) {
						if(zblist) {
							data.isorder = 1;
						} else {
							$scope.jmlist[index].isorder = 1;
						}
						$.tipshow({
							'msg': '预约成功',
							'type': 'success'
						});
					} else {
						$.tipshow({
							'msg': '预约失败',
							'type': 'warning'
						});
					}
				});
			}
		};
		//懒加载
		$scope.bs = new botscroll(100, 85); // 滚动事件
		$scope.lazy = new lazyload({
			'class': '.lazy',
			'outbot': 100
		})
		$scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
			$scope.bs.setmax($('.html').height());
			$scope.lazy.setlazy($('.lazy'));
		});
		$scope.$on("$destroy", function () {
			$(window).off('scroll');
			$scope.lazy=null;
			// $(window).unbind('scroll');
		});
	}
	return {
		controller: controller
	};
});