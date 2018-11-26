define(['angular', 'size', 'fun'], function(angular, tpl) {
	controller.$inject = ['$scope', '$rootScope', '$http'];

	function controller($scope, $rootScope, $http) {
		$rootScope.htmlname = 'index_my_his bgcfff pt60';
		$scope.resetstate = function() {
			$scope.deleteState = false;
		}
		$scope.resetstate();
		$scope.pinyinCity=getCookie("pinyinCity")
		$scope.deletefcn = function() {
			$("input[type=checkbox]").removeAttr("checked");
			//			顶部删除
			$scope.deleteState = !$scope.deleteState;
		}

		$scope.loadtext='';
		$scope.token = getCookie('token');
		$scope.getCollectList = function() {
			$http.post(webset.testapiurl + 'user/collect/list.json?token=' + $scope.token + '&pageNo=1&pageSize=20', {}).success(function(res) {
				if(res && res.response.responseHeader.code == 200) {
					console.log('我的收藏', res);
					$scope.list = res.response.responseBody.list;
					if(res.response.responseBody.totalrecords =="0"){
						$scope.loadtext = "暂无收藏"
					}else{
						$scope.loadtext = ""
					}
				}else{
					$scope.loadtext="暂无收藏";
				}

			});
		}
		$scope.getCollectList();
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
			//底部删除
			if($('input:checkbox:checked').length == 0) {
				$.tipshow({
					'msg': '请选择节目',
					'type': 'warning'
				});
				return;
			}
			$scope.deleteConfirm();
						// $scope.deleteCommit = true;
		}
		$scope.deleteConfirm = function() {
			var liList = $('input:checkbox:checked').parent();
			var l = liList.length ? liList.length : 0;
			var content={
				'kankeId':''
			};
			for(var  i = 0; i < l; i++) {
				content.kankeId += $(liList[i]).data('kankeid')+',';
			}
			$scope.commitdel(content.kankeId)
		}
		$scope.commitdel = function(kankeId) {
			$http.post(webset.testapiurl + 'user/collect/delete.json?appKey=D176EB3E8B1F044B&appScrect=64&token=' + $scope.token +'&kankeId=' + kankeId, {}).success(function(res) {
					$scope.resetstate();
					if(res.response.responseHeader.code != "200") {
						$.tipshow({
							'msg': '收藏删除失败',
							'type': 'warning'
						});
					} else {
						$.tipshow({
							'msg': '收藏删除成功',
							'type': 'success'
						});
					}
					$scope.getCollectList();
			});
		}
	}
	return {
		controller: controller,
		tpl: tpl
	};
});