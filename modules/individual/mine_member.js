define(['angular','size', 'fun'], function(angular, tpl) {
	controller.$inject = ['$scope', '$rootScope', '$http'];

	function controller($scope, $rootScope, $http) {

		$rootScope.htmlname = 'index_my_his bgcfff pt60';
		var orderlistUrl = webset.apiurl+"user/userReserveInfo.json?openId=" + getCookie('openid');
		$http.post(orderlistUrl, {}).success(function(res) {
			console.log('预约列表', res.response);
			if (res.response.responseHeader.code == 200) {
				$scope.list=res.response.responseBody;
			}
		});

		$scope.isedit = false;
		$scope.goedit = function() {
			$scope.isedit = !$scope.isedit;
		};
		$scope.openid = getCookie('openid');
		$scope.del = function(data) {
			var orderUrl = webset.base + "tran?DEEPURL=";
				orderUrl += encodeURI(apiServerBase+"hbiptv-api/api/v1/user/reserveLive.json?liveStartTime="+data.liveStartTime+"&liveEndTime="+data.liveEndTime+"&openId="+data.openId+"&channelId="+data.channelId+"&channelCode="+data.channelCode+"&channelNameZh="+encodeURI(data.channelNameZh)+"&channelNameEn="+data.channelNameEn+"&programName="+encodeURI(data.programName)+"&isReserve=0&channelPicUrl="+data.channelPicUrl+"&kankeId="+data.kankeId+"&vodId="+data.vodId);
				$http.get(orderUrl, {}).success(function(e) {
				console.log('预约节目', e.response);
				if (e.response.responseHeader.code == 200) {
					$scope.dellist(data);
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
		}
		$scope.dellist = function(v) {
			var len = $scope.list.length,
				data = $scope.list;
			for (var i = len - 1; i >= 0; i--) {
				if (data[i].channelId == v.channelId && data[i].programName == v.programName && data[i].liveStartTime == v.liveStartTime) {
					$scope.list.splice(i, 1);
				}
			}
		}
	}
	return {
		controller: controller,
		tpl: tpl
	};
});