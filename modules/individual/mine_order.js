define(['angular','size', 'fun'], function(angular, tpl) {
	controller.$inject = ['$scope', '$rootScope', '$http'];

	function controller($scope, $rootScope, $http) {
		$rootScope.htmlname = 'index_my_his bgcfff pt60';
		$scope.openId = getCookie('openid');
		$scope.loadtext='';
		$scope.orderList = function() {
			var orderlistUrl = webset.testapiurl + "user/userReserveInfo.json?openId=" + $scope.openId;
			$http.post(orderlistUrl, {}).success(function(e) {
				if(e && e.response.responseHeader.code == 200) {
					$scope.list = e.response.responseBody;
					console.info("预约列表",$scope.list)
					if(e.response.responseBody==null){
						$scope.loadtext="暂无预约";
					}else{
						$scope.loadtext="";
					}
				}else{
					$scope.list=[];
					$scope.loadtext="暂无预约";
				}
			});
		}
		$scope.orderList();

		//初始化
		$scope.resetstate = function() {
			$scope.deleteState = false;
			$scope.deleteCommit = false;
		}

		$scope.resetstate();
		$scope.stopBubble = function($event) {
			$event.stopPropagation();
		}
		$scope.deletefcn = function() {
			$("input[type=checkbox]").removeAttr("checked");
			//			顶部删除
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
					'msg': '请选择节目',
					'type': 'warning'
				});
				return;
			}
			$scope.deleteCommit = true;
		}
		$scope.deleteList=[];
		$scope.deleteConfirm = function() {
			$scope.deleteList=[];
			var liList = $('input:checkbox:checked');
			var len = liList.length ? liList.length : 0;
			for(var i = 0; i < len; i++) {
					$scope.deleteList.push($(liList[i]).data('list'));
			}
			$scope.reserve_arr= JSON.stringify($scope.deleteList);
			if($scope.deleteList) {
				$scope.commitdel(true,$scope.reserve_arr);
			} else {
				$scope.commitdel(false,$scope.reserve_arr);
			}

		}
		$scope.commitdel = function(m,reserve) {
			var data = {
				"openId": $scope.openId,
				"isReserve":'0',
				"reserve":$scope.reserve_arr,
				"methodType":'POST'
			};
			var transform = function(data) {
				return $.param(data);
			};
			var orderUrl = webset.base + "tran?DEEPURL=";
			orderUrl += testapiServerBase + 'api/v1/user/myReserve.json';
			$http.post(orderUrl, data, {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
				},
				transformRequest: transform
			}).success(function(e) {
				console.log('取消预约节目', e);
				if(m == true) {
					$scope.resetstate();
					if(e.response.responseHeader.code == 200) {
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
				}
				$scope.orderList();
			});
		}
	}
	return {
		controller: controller,
		tpl: tpl
	};
});