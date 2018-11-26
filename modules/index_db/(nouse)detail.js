define(['angular', 'text!modules/index_db/detail.html', 'size', 'fun'], function(angular, tpl) {
	controller.$inject = ['$scope', '$rootScope', '$http'];

	function controller($scope, $rootScope, $http) {
		$rootScope.htmlname = 'db-detail detial bgcfff pb10';

		$scope.rem = window.rem / 100;
		$scope.sc = GetRequest();
		$scope.code = getUrlParam('code');
		//add by huanghua 搜索推荐进入详情初始化微信用户 
		if($scope.code != null && $scope.code != "null" && $scope.code != undefined) {
			$http.post(webset.initurl + '?code=' + $scope.code, {}).success(function(e) {
				$scope.openid = getCookie('openid');
				$http.post(webset.device + '?key=' + $scope.openid + '&type=1', {}).success(function(e) {
					if(e && e.response.responseHeader.code == "200") {
						setCookie("boxId", e.response.responseBody);
					}
				});
			});
		}
		$scope.headimg = decodeURIComponent(getCookie('headimgurl'));
		$scope.userId = getCookie('userId');
		$scope.token = getCookie('token');
		$scope.nickname = getCookie('nickname');

		$scope.fold1 = true;
		$scope.fold2 = true;
		$scope.fold3 = true;
		$scope.unfold = function(i) {
			if(i == 1) {
				$scope.fold1 = !$scope.fold1;
			} else if(i == 2) {
				$scope.fold2 = !$scope.fold2;
			} else if(i == 3) {
				$scope.fold3 = !$scope.fold3;
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

		$scope.f = $scope.sc.type == "documentary" ? false : true;
		$scope.activejson = {};

		if($scope.sc.from == 'search') {
			$rootScope.fromsearch = true;
		}

		$scope.getdetail = function() {
			if($scope.sc.columnType == "film") {
				$scope.isfilm = true;
			} else {
				$scope.isfilm = false;
			}
			$scope.fadedmt = [];
			$scope.fadedmtnum = 0;
			$http.post(webset.apiurl + 'vod/vodDetail.json?appKey=D176EB3E8B1F044B&appScrect=64&columnType=' + $scope.sc.columnType + '&id=' + $scope.sc.videoId, {}).success(function(res) {
				console.log('节目详情', res);
				$scope.detail = res.response.responseBody.video;
				if($scope.sc.columnType != "film") {
					//手机剧集
					$scope.dm.key_en = $scope.detail.details[0].key_en;
					$scope.dm.key_zh = $scope.detail.details[0].key;
					$scope.getpartdm($scope.dm.key_en, 0, $scope.dm.key_zh);
				}
				$scope.actors(), $scope.zb();
			});
			$scope.tj(), $scope.pl(), $scope.mystate();
		}

		$scope.dindex = -1;

		$scope.showfullintro = function() {

		}

		$scope.closepop = function(tar) {
			$(tar).removeClass('active');
			$scope.elm.J_dtpop.removeClass('active');
			setTimeout(function() {
				$scope.elm.J_dtpop.addClass('out')
			}, 300);
			$.backscroll();
		}

		$scope.dm = {
			"key_en": "",
			"id": "",
			"totalrecords": 0,
			"key_zh": ""
		};
		$scope.tvlist = function(m) {
			if(m == true) {
				$scope.nottv = false;
			} else {
				$scope.nottv = true;
			}
		};
		$scope.getpartdm = function(v, eq, keyz) {
			if($scope.sc.columnType == "film") {
				//				$scope.showremove = true;
				$scope.activejson = $scope.detial.details[eq];
				$scope.playmb();
			} else {
				$scope.dm.key_en = v;
				$scope.dm.key_zh = keyz;
				$scope.dm.totalrecords = 0;
				$scope.dindex = eq;
				$scope.getdm(1);
			}
		}
		$scope.get_tv_partdm = function(eq) {
			if($scope.sc.columnType == "film") {
				$scope.showremove = true;
				$scope.activejson = $scope.detial.details[eq];
			} else {
				$scope.dm.totalrecords = 0;
				$scope.tv_getdm(1);
			}
		}
		$scope.getdm = function(pg) {
			$scope.fadedmtnum = pg;
			$scope.fdindex = pg - 1;
			var dmurl = webset.apiurl + 'vod/drama.json?appKey=D176EB3E8B1F044B&appScrect=64&pageSize=10&pageNo=' + pg + '&columnType=' + $scope.sc.columnType + '&id=' + $scope.sc.videoId + '&key_en=' + $scope.dm.key_en;
			$http.post(dmurl, {}).success(function(e) {
				console.log('剧集信息', e);
				if($scope.dm.totalrecords == 0) {
					$scope.dm.totalrecords = e.page.totalrecords;
					$scope.fadedmt = $scope.newarr(e.page.totalrecords);
				}
				$scope.nottv_darma = e.page.list;
			});
		}
		$scope.newarr = function(num) {
			var len = Math.ceil(num / 10),
				arr = [];
			for(var i = 0; i < len; i++) {
				arr.push(i);
			}
			return arr;
		}
		$scope.fdindex = 0; // 剧集的1-20集激活
		$scope.tv_index = 0; //电视剧集1-20集激活
		$scope.tj = function() {
			//			var urltj = webset.apiurl + 'vod/iti_vod.json?kanke_id=' + $scope.sc.kankeId + '&vodId=' + $scope.sc.vodId;
			var urltj = webset.apiurl + 'recommend/iti.json?appKey=D176EB3E8B1F044B&appScrect=64&pageSize=6&pageNo=1&columnType=' + $scope.sc.columnType + '&videoId=' + $scope.sc.videoId;
			$scope.tjshow = true;
			$http.post(urltj, {}).success(function(e) {
				console.log('相关推荐', e.response)
				if(e.response.responseHeader.code == "SCC_002") {
					$scope.tjlist = e.response.responseBody.list;
				} else {
					$scope.tjshow = false;
				}
			});
		}
		$scope.pl = function() {
			var plurl = webset.apiurl + 'vod/comment.json?appKey=D176EB3E8B1F044B&appScrect=64&pageNo=1&pageSize=20&commentType=kanke&timeStr=&videoId=' + $scope.sc.videoId + '&columnType=' + $scope.sc.columnType;
			$http.post(plurl, {}).success(function(e) {
				console.log('评论列表', e.response);
//				if(e.response.responseHeader.code == 200) {
					$scope.pllist = e.response.responseBody.list;
					$scope.commons = e.response.responseBody.totalrecords;
//				}
			});
		}
		$scope.actors = function() {
			var dmurl = webset.apiurl + 'vod/star/profiles.json?appKey=D176EB3E8B1F044B&appScrect=64&name=' + $scope.detail.actor.replace(/\|/g, ',');
			$http.post(dmurl, {}).success(function(e) {
				console.log('明星列表', e);
				$scope.actorlist = e.response.responseBody.starProFile;
			});
		}
		$scope.zb = function() {
				var dmurl = webset.apiurl + 'vod/sameProgram.json?appKey=D176EB3E8B1F044B&appScrect=64&title=' + $scope.detail.title + '&classId=' + ttypes($scope.sc.columnType);
				$http.post(dmurl, {}).success(function(e) {
					console.log('点播关联直播-节目预告', e);
					$scope.zblist = e.page.list;
				});
			}
			//点赞 点踩 收藏状态  
		$scope.mystate = function() {
			var stateurl = webset.apiurl + 'user/pacStatus.json?appKey=D176EB3E8B1F044B&appScrect=64&columnType=' + $scope.sc.columnType + '&videoId=' + $scope.sc.videoId + '&token=' + $scope.token;
			$http.post(stateurl, {}).success(function(e) {
				console.log('节目状态', e.response);
				if(e && e.response.responseHeader.code == 200) {
					$scope.states = e.response.responseBody[0];
					$scope.is_collect = $scope.states.collection_status == '1' ? true : false; //是否收藏
					$scope.likenum = $scope.states.belike_count; //点赞数量
					$scope.is_like = $scope.states.belike_status == '1' ? true : false; //是否点赞
				}
			});
		}

		$scope.senttext = function() {
			if($scope.sc.vodId == 0 && $scope.sc.kankeId == '') {
				$.tipshow({
					'msg': '无法评论',
					'type': 'warning'
				});
				return false;
			}
			if($scope.commenttext == undefined) {
				$.tipshow({
					'msg': '评论内容不可为空',
					'type': 'warning'
				});
				return false;
			}

			var senturl = webset.apiurl + 'user/comment/save.json?',
				data = {
					"kankeId": $scope.sc.kankeId,
					"vodId": $scope.sc.vodId,
					"context": $scope.commenttext,
					"token": $scope.token
				};

			var transform = function(data) {
				return $.param(data);
			};

			$http.post(senturl, data, {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
				},
				transformRequest: transform
			}).success(function(e) {
				console.log('发表评论', e.response)
				if(e && e.response.responseHeader.code == 200) {
					$.tipshow({
						'msg': '评论成功',
						'type': 'success'
					});
					$scope.pllist = [{
						addtime: new Date().toString(),
						context: $scope.commenttext,
						nickname: $scope.nickname
					}].concat($scope.pllist)
					$scope.commenttext = undefined;
				}
			});
		}

		$scope.istab = 2;

		$scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
			var elms = $scope.elm.J_scroll_go;
			elms.scrollTop(0);
			var eq = parseInt(elms.find('.active').parent().find('.gobtn').eq(0).attr('eq'));
			elms.scrollTop((eq - 2) * 29 * $scope.rem)
		});
		$scope.collect = function() {
			//			$scope.pac($scope.is_collect, 'collection', '收藏');
			if(!$scope.detail) {
				$.tipshow({
					'msg': '无法添加收藏',
					'type': 'warning'
				});
				return false;
			}
			var behaviorJson = {
				videoId: $scope.sc.videoId,
				classId: ttypes($scope.sc.columnType),
				subTitle: '',
				source: '',
				breakPoint: ''
			}
			var urlscy
			if(!$scope.is_collect) { //收藏
				urlscy = webset.apiurl + 'user/addBehavioral.json?appKey=D176EB3E8B1F044B&appScrect=64&behaviorType=collect&token=' + $scope.token + '&behaviorJson=' + JSON.stringify(behaviorJson);
			} else { //取消收藏
				urlscy = webset.apiurl + 'user/delBehavioral.json?appKey=D176EB3E8B1F044B&appScrect=64&behaviorType=collect&token=' + $scope.token + '&videoId=' + $scope.sc.videoId + '&classId=' + ttypes($scope.sc.columnType);
			}
			$http.post(urlscy, {}).success(function(e) {
				console.log('收藏', e);
				if(e && e.responseStatus.code == "SCC_002") {
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
			var pacurl = webset.apiurl + 'user/pac.json?appKey=D176EB3E8B1F044B&appScrect=64&type=' + type + '&value=' + value + '&token=' + $scope.token + '&videoId=' + $scope.sc.videoId + '&columnType=' + $scope.sc.columnType;
			$http.post(pacurl, {}).success(function(e) {
				console.log(type, e.response);
				if(e && e.response.responseHeader.code == "SCC_002") {
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

		$scope.addhistory = function() {
			if(!$scope.detail) {
				return false;
			}
			var behaviorJson = {
				videoId: $scope.sc.videoId,
				classId: ttypes($scope.sc.columnType),
				subTitle: '',
				source: $scope.dm ? $scope.dm.key_zh : '',
				breakPoint: ''
			}
			urlscy = webset.apiurl + 'user/addBehavioral.json?appKey=D176EB3E8B1F044B&appScrect=64&behaviorType=history&token=' + $scope.token + '&behaviorJson=' + JSON.stringify(behaviorJson);
			$http.post(urlscy, {}).success(function(e) {
				console.log('添加历史', e);
			});
		}

		$scope.playjson = function(i) {
			$scope.activejson = $scope.tv_darma[i];
			$scope.activejson.vp = i + 1 + $scope.fdindex * 20;
			$scope.playtv(true);
			//			$scope.showremove = true;
		}

		$scope.gotoplay = function($index, link) {
			$scope.addhistory();
			window.location.href = link;
		}

		//       $scope.showremove = false;
		$scope.playtv = function(cvp, channelNumber, startTime) {
				if(!getCookie('boxId')) {
					$.tipshow({
						'msg': '未绑定设备',
						'type': 'warning'
					});
					return false;
				}
				if($scope.sc.zb && cvp == undefined) {
					var senturl = webset.ctrl + 'playLive.json',
						data = {
							"boxId": getCookie('boxId'),
							"channelId": $scope.sc.channelId
						};
					var transform = function(data) {
						return $.param(data);
					};
					$http.post(senturl, data, {
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
						},
						transformRequest: transform
					}).success(function(res) {
						console.log('直播电视播放:', res);
						if(res && res.result == "SUCCESS") {
							$.tipshow({
								'msg': '推送成功',
								'type': 'success'
							});
						} else {
							$.tipshow({
								'msg': '推送失败',
								'type': 'warning'
							});
						}
					});
				} else if($scope.sc.zb && cvp != undefined) {
					var StartDate = $scope.dates.replace('-', '').replace('-', '');
					var StartTime = startTime + ':00';
					var back_url = webset.ctrl + 'playBack.json?StartDate=' + StartDate + '&StartTime=' + StartTime + '&boxId=' + getCookie("boxId") + '&channelNumber=' + channelNumber + '&code=' + cvp + '&title=' + ($scope.detial ? $scope.detial.title : '');
					$http.post(back_url, {}).success(function(res) {
						console.log('回看电视播放:', res);
						if(res && res.result == "SUCCESS") {
							$.tipshow({
								'msg': '推送成功',
								'type': 'success'
							});
						} else {
							$.tipshow({
								'msg': '推送失败',
								'type': 'warning'
							});
						}
					});
				} else {
					var urlpv = webset.ctrl;
					if(!$scope.activejson.code && !$scope.activejson.programCode) {
						$scope.activejson = $scope.sc.columnType == "film" ? $scope.detial.vod_details : $scope.tv_darma[0];
					}
					if($scope.sc.columnType == "film") {
						urlpv += 'playVideo.json?boxId=' + getCookie("boxId") + '&mediaType=' + $scope.activejson.mediaType + '&code=' + $scope.activejson.code + '&title=' + $scope.detial.title;
					} else {
						urlpv += 'playVideo.json?boxId=' + getCookie("boxId") + '&code=' + $scope.activejson.code + '&mediaType=' + $scope.activejson.mediaType + '&seriesCode=' + $scope.activejson.programCode + '&title=' + $scope.detial.title;
					}
					console.log('推送播放串：', $scope.activejson);
					$http.post(urlpv, {}).success(function(res) {
						console.log('电视播放:', res);
						if(res && res.result == "SUCCESS") {
							$.tipshow({
								'msg': '推送成功',
								'type': 'success'
							});
						} else {
							$.tipshow({
								'msg': '推送失败',
								'type': 'warning'
							});
						}
					});
				}
				$scope.addhistory();
			}
			//手机播放
		$scope.playmb = function() {
			if(!$scope.detial) {
				return false;
			}
			$.going();
			if($scope.sc.columnType == "film") {
				$scope.playvideo($scope.activejson.link ? $scope.activejson.link : $scope.detial.details[0].link);
			} else {
				$scope.playvideo($scope.activejson.link ? $scope.activejson.link : $scope.nottv_darma[0].link);
			}
		}
		$scope.init_zb = function() {
			$scope.getjmlist();
			$scope.getjmlistback();
		}
		$scope.openid = getCookie('openid');

		$scope.sc.zb ? $scope.init_zb() : '';
		$scope.getdetail();

		//		if(!getCookie("boxId")){
		//			$http.post(webset.device+'?key='+$scope.openid+'&type=1',{}).success(function(res){
		//				console.log(res)
		//	            if(res.code=="success"){
		//	                setCookie("boxId",res.info);
		//	            }
		//	        });
		//		}

		$scope.isshowvideo = false;
		$scope.closevideo = function() {
			$scope.isshowvideo = false;
			$scope.elm.J_video[0].setAttribute('src', '')
		}
		$scope.playvideo = function(url) {
			$scope.addhistory();
			$.stopgo();
			window.location.href = url;
			//			$http.post(webset.play + url, {}).success(function(res) {			
			//				$scope.isshowvideo = true;
			//				$scope.elm.J_video[0].setAttribute('src', backvurl(res));
			//			});
		}

		$scope.closeend = function() {
			$scope.showremove = false;
		}
	}
	return {
		controller: controller,
		tpl: tpl
	};
});