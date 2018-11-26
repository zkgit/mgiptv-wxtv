define(['angular', 'size', 'fun'], function(angular, tpl) {
	controller.$inject = ['$scope', '$rootScope', '$http'];

	function controller($scope, $rootScope, $http) {
		$scope.token=getCookie('token');
		$scope.openid = getCookie('openid');
		$scope.feedback1=0;
		$scope.feedback2=0
		$scope.telPhone='';
		$scope.email='';
		$scope.contact='';
		$scope.opinion=''
		$scope.recommend=function(v){
			$scope.feedback1=v;
		}
		$scope.design=function(v){
			$scope.feedback2=v;
		}
		$scope.llevel=function(i){
			if(i==1)return '喜欢'
			if(i==2)return '还行'
			if(i==3)return '不喜欢'
		}
		$scope.verify=function(){
			if($scope.feedback1==0){
				$.tipshow({
					'msg': '是否喜欢推荐内容',
					'type': 'warning'
				});
				return false;
			}
			if($scope.feedback2==0){
				$.tipshow({
					'msg': '是否喜欢我们的设计',
					'type': 'warning'
				});
				return false;
			}
			if($scope.opinion.length==0){
				$.tipshow({
					'msg': '请填写反馈意见',
					'type': 'warning'
				});
				return false;
			}
			if($scope.contact.length==0){
				$.tipshow({
					'msg': '请输入联系方式',
					'type': 'warning'
				});
				return false;
			}
			return true;
		}
		//清除多次点击计时器多次记时
		$scope._content = 0;
		$scope.feedbackfcn = function() {
			if(!$scope.verify()) {
				return;
			}
			conment='推荐内容：'+$scope.llevel($scope.feedback1);
			conment+='设计：'+$scope.llevel($scope.feedback2);
			conment+='意见：'+$scope.opinion;
			if($scope.contact.indexOf('@')>-1){
				$scope.email=$scope.contact;
			}else{
				$scope.telPhone=$scope.contact;
			}
			// var feedbackJson={
			// 	userId:getCookie('token'),
			// 	username:getCookie('nickname'),
			// 	conment:conment,
			// 	type:'改善建议',
			// 	telPhone:$scope.telPhone,
			// 	email:$scope.email
			// }
			var feedbackJson={
				"appKey":"D176EB3E8B1F044B",
				"appScrect":"64",
				"openId":getCookie('openid'),
				"token":$scope.token,
				"username":getCookie('nickname'),
				"conment":conment,
				"type":'改善建议',
				"telPhone":$scope.telPhone,
				"email":$scope.email
			},
			urlscy = webset.testapiurl + 'user/savefk.json?appKey=D176EB3E8B1F044B&appScrect=64&type=改善建议&openId='+getCookie('openid')+'&token='+$scope.token+'&username='+getCookie('nickname')+'&conment='+conment+'&telPhone='+$scope.telPhone+'&email='+$scope.email;
			console.info(feedbackJson);
			$http.get(urlscy, {}).success(function(e) {
				console.log('问题反馈', e);
				//清除多次点击计时器多次记时
				$scope._content++;
				if($scope._content==1){
					if(e&&e.responseHeader&&e.responseHeader.code=="200"){
						console.info($scope._content);
						$scope.num =3 ;
						var t = setInterval(function setNum(){
							if($scope.num ==-1){
								clearInterval(t)
								goBack();
							}else {
								$.tipshow({
									'msg': '感谢您的反馈'+$scope.num+'s后返回',
									'type': 'warning'
								});
								$scope.num--;
							}
						},1000);
						console.log('问题反馈成功', e);
					}
				}
			});
		}
	}
	return {
		controller: controller,
		tpl: tpl
	};
});