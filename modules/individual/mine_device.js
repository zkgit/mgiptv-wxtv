define(['angular','size', 'fun'], function(angular, tpl) {
	controller.$inject = ['$scope', '$rootScope', '$http'];

	function controller($scope, $rootScope, $http) {
		$rootScope.htmlname = 'index_my_his bgcfff pt60';
		$scope.openid = getCookie('openid');


		//初始化
		$scope.resetstate = function() {
			$scope.isedit = false;
			$scope.addState = false;
			$scope.deleteState = false;
			$scope.exchangeState = false;
			$scope.deleteCommit = false;
			$scope.goback=false;
		}

		$scope.resetstate();
		$scope.getDeviceList = function(place) {
			var devicelistUrl = webset.deviceapiurl + "user/getDevice.json?openId=" + $scope.openid+"&pageNo=1&pageSize=5";
			$http.post(devicelistUrl, {}).success(function(res) {
				setCookie("boxId", res.responseBody.currentBindBoxId) ;
				console.log('设备列表', res);
				$scope.list = res.responseBody.boxList;
			});
			if(place==true){
				delCookie('pinyinCity');
				$scope.goback=true;
				console.info('删除地理位置缓存')
			}
		}
		$scope.getDeviceList();

		$scope.bindDevice = function() {
			$scope.addState = true;
		}
		$scope.boxId = "";
		$scope.stopBubble = function($event) {
			$event.stopPropagation()
		}
		$scope.bind_commit = function(e) {
			if($scope.boxId.replace(/(^\s*)|(\s*$)/g, "").length == 0) {
				$.tipshow({
					'msg': '请输入绑定码',
					'type': 'warning'
				});
				return;
			}
			$http.post(webset.base + "wxtv/bind.json?type=0&key=" + $scope.openid + "&value=" + $scope.boxId, {}).success(function(res) {
				console.log('绑定设备', res);
				$scope.addState = false;
				$scope.boxId = "";
				if(res.responseHeader.code=='200') {
					$.tipshow({
						'msg': res.responseHeader.msg,
						'type': 'success'
					});
					$scope.getDeviceList(true);
				} else {
					$.tipshow({
						'msg': res.responseHeader.msg,
						'type': 'warning'
					});
				}
			});
		}
		$scope.goedit = function(v) {
			//修改别名
			$scope.isedit = !$scope.isedit;
			$scope.data=v;
		};
		$scope.boxName='';
		$scope.editConfirm=function(){
			if($scope.boxName.replace(/(^\s*)|(\s*$)/g, "").length == 0) {
				$.tipshow({
					'msg': '请输入别名',
					'type': 'warning'
				});
				return;
			}
			$http.post(webset.deviceapiurl + "user/device/update.json?boxId="+$scope.data.boxId+"&openId=" + $scope.openid + "&boxName=" + $scope.boxName, {}).success(function(res) {
				console.log('修改设备别名', res);
				$scope.boxName='';
				$scope.isedit = false;
				if(res.responseHeader.code == 200) {
					$.tipshow({
						'msg': '修改设备别名成功',
						'type': 'success'
					});
					$scope.getDeviceList();
				} else {
					$.tipshow({
						'msg': '修改设备别名失败',
						'type': 'warning'
					});
				}
			});
		}
		$scope.deletefcn = function() {
			$("input:radio:checked").removeAttr("checked", 'checked');
			$("input[type=checkbox]").removeAttr("checked");
			//			顶部删除
			$scope.exchangeState = false;
			$scope.deleteState = !$scope.deleteState;

		}
		$scope.checkAll = function() {
			$scope.allSelect=!$scope.allSelect;
			if($scope.allSelect){
				$("input[type='checkbox']").each(function () {
					$(this)[0].checked = true;
				})
			}else{
				$("input[type='checkbox']").each(function () {
					$(this)[0].checked = false;
				})
			}
		}
		$scope.deleteButton = function() {
			//			底部删除
			if($('input:checkbox:checked').length == 0) {
				$.tipshow({
					'msg': '请选择设备',
					'type': 'warning'
				});
				return;
			}
			$scope.deleteCommit = true;
		}
		$scope.deleteConfirm = function() {
			var liList=$('input:checkbox:checked').parent().find('li');
			var l = liList.length ? liList.length : 0;
			for(i = 0; i < l; i++) {
				var boxId = $($('input:checkbox:checked').parent().find('li')[i]).data('boxid');
				if(boxId) {
					console.log(boxId);
					if(i == l - 1) {
						$scope.commitdel(boxId, true);
					} else {
						$scope.commitdel(boxId, false);
					}
				} else {
					continue;
				}
			}
		}
		$scope.commitdel = function(boxid, m) {
			$http.post(webset.deviceapiurl + "user/device/delete.json?openId=" + $scope.openid + "&boxId=" + boxid, {}).success(function(res) {
				console.log('删除设备', res);
				if(m == true) {
					$scope.resetstate();
					if(res.responseHeader.code != 200) {
						$.tipshow({
							'msg': '设备删除失败',
							'type': 'warning'
						});
					} else {
						$.tipshow({
							'msg': '设备删除成功',
							'type': 'success'
						});
					}
					$scope.getDeviceList(true);
				}
			});
		}
		$scope.exchangefcn = function() {
			$("input:radio:checked").removeAttr("checked", 'checked');
			$("input[type=checkbox]").removeAttr("checked");
			//			顶部切换设备
			$scope.deleteState = false;
			$scope.exchangeState = !$scope.exchangeState;
		}
		$scope.changeButton=function(){
			var boxid=$('input:radio:checked').parent().find('li').data('boxid');
			if(boxid==undefined){$.tipshow({'msg':'请选择设备','type':'warning'});return;}
			$http.post(webset.deviceapiurl + "user/bind.json?type=0&key=" + $scope.openid + "&value=" + boxid, {}).success(function(res) {
				console.log('切换设备', res);
				$scope.exchangeState = false;
				if(res.response.responseHeader.code == 200) {
					$.tipshow({
						'msg': '切换设备成功',
						'type': 'success'
					});
					$scope.getDeviceList(true);
				} else {
					$.tipshow({
						'msg': '切换设备失败',
						'type': 'warning'
					});
				}
			});
		}
		$scope.dellist = function(v) {
			var len = $scope.list.length,
				data = $scope.list;
			for(var i = len - 1; i >= 0; i--) {
				if(data[i].channelId == v.channelId && data[i].programName == v.programName && data[i].liveStartTime == v.liveStartTime) {
					$scope.list.splice(i, 1);
				}
			}
		}
		$scope.add_d=function () {
			// 扫一扫添加设备
			wx.scanQRCode({
				needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
				scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
				success: function (res) {
					var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
				}
			});
		}
	}
	return {
		controller: controller,
		tpl: tpl
	};
});