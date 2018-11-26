define(['angular','size', 'fun'], function(angular, tpl) {
	controller.$inject = ['$scope', '$rootScope', '$http'];

	function controller($scope, $rootScope, $http) {
		$rootScope.htmlname = 'index_my_his bgcfff pt60';
		$scope.loadtext='';
		$scope.token = getCookie('token');

		$scope.orderList = function() {
			$http.post(webset.testapiurl + 'user/history/list.json?token=' + $scope.token + '&behaviorType=history&pageNo=1&pageSize=20&appKey=D176EB3E8B1F044B&appScrect=64', {}).success(function (res) {
				console.log('观看历史', res);
				if (res && res.response.responseHeader.code == 200){
					if(res.response.responseBody.totalrecords =="0"){
						$scope.loadtext = "暂无历史播放"
					}else{
						$scope.loadtext = ""
					}
					$scope.list = res.response.responseBody.list;
					for (i = $scope.list.length - 1; i >= 0; i--){
						var tem = $scope.list[i].addtime.slice(0, 10);
						if (GetDateStr(0) == tem) {
							$scope.today = i;
							continue;
						}
						if (GetDateStr(-1) == tem) {
							$scope.yesterday = i;
							continue;
						}
						if (GetDateStr(-1) > tem) {
							$scope.earlier = i;
							continue;
						}
					}
					if ($scope.yesterday>=0) {
						$scope.list[$scope.yesterday].yesterday = true;
					}
					if ($scope.today>=0) {
						$scope.list[$scope.today].today = true;
					}
					if ($scope.earlier>=0) {
						$scope.list[$scope.earlier].earlier = true;
					}
				}else{
					$scope.loadtext="暂无历史播放";
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
		$scope.deletefcn=function(){
			$("input[type=checkbox]").removeAttr("checked");
//			顶部删除
			$scope.deleteState=!$scope.deleteState;
		}
		$scope.delAllnum='0';
		$scope.checkAll = function() {
			$scope.allSelect=!$scope.allSelect;
			if($scope.allSelect){
				$scope.delAllnum='1';
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
					'msg': '请选择历史记录',
					'type': 'warning'
				});
				return;
			}
			$scope.deleteCommit = true;

		}
		$scope.deleteList=new Array;
		$scope.deleteConfirm = function() {
			var liList = $('input:checkbox:checked');
			var l = liList.length ? liList.length : 0;
			for(var i = 0; i < l; i++) {
				var vodId = $(liList[i]).data('vodid');
				var kankeId = $(liList[i]).data('kankeid');
				if(kankeId||vodId) {
					console.log(vodId);
					if(i == l - 1) {
						$scope.commitdel(vodId, kankeId, true);
					} else {
						$scope.commitdel(vodId, kankeId, false);
					}
				} else {
					continue;
				}
			}
		}
		
		$scope.isedit = false;
		$scope.goedit = function() {
			$scope.isedit = !$scope.isedit;
		};
		$scope.commitdel = function( vodId,kankeId,m) {
			var urldel = webset.testapiurl + 'user/history/delete.json?token=' + $scope.token + '&kankeId=' + kankeId + '&videoId=' + vodId+'&delAll='+$scope.delAllnum;
			$http.post(urldel, {}).success(function(res) {
				console.log('删除历史', res);
				if(m == true) {
					if (res.response.responseHeader.code == 200) {
						$.tipshow({
							'msg': '删除历史成功',
							'type': 'success'
						});
					}else {
						$.tipshow({
							'msg': '删除历史失败',
							'type': 'warning'
						});
					}
				}
				$scope.deleteCommit = false;
				$scope.orderList();
			});
		}
	}
	return {
		controller: controller,
		tpl: tpl
	};
});