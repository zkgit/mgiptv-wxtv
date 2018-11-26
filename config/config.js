// var serverBase="http://wxiptv.zt.mgtv.com/mgiptv-wxtv/";//主域名  ---------上线请更改
var serverBase="http://zzb.kanketv.com/mgiptv-wxtv/";//主域名  ---------上线请更改

var apiServerBase='http://202.91.228.23:81/';//api接口域名----------旧的接口
var testapiServerBase ='http://10.200.10.37/mgiptv-api/';//api接口域名----------2.0测试上线请更改
// var testapiServerBase ='http://wxiptv.api.mgtv.com/mgiptv-api/';//api接口域名----------2.0测试上线请更改

var tempser = "http://zzb.kanketv.com/mgiptv-wxtv/";
// var tempser = "http://wxiptv.zt.mgtv.com/mgiptv-wxtv/";

var webset = {
	base:tempser,
	tran:tempser+'tran?DEEPURL=',
	url:tempser+'tran?DEEPURL=http://api2.kanketv.com/',
	play:tempser+'tran?DEEPURL=http://play.kanketv.com/playerCode2.0/play/api?linkUrl=',
	device:tempser+'tran?DEEPURL='+testapiServerBase+'api/v2/user/bind.json',//3.0设备正在使用
	ctrl:tempser+'ctrl/',
	ak:'34DB874AF269B539',
	as:40,
	testurl:tempser+'tran?DEEPURL='+testapiServerBase+'api/v1/',
	apiurl:tempser+'tran?DEEPURL='+apiServerBase+'wechat-2.0-api/api/v1/',  //部分正在使用
	testapiurl:tempser+'tran?DEEPURL='+testapiServerBase+'api/v1/',  //3.0正在使用
	deviceapiurl:tempser+'tran?DEEPURL='+testapiServerBase+'api/v2/',  //3.0设备正在使用
	initurl:tempser+'wxtv/init' , //微信初始化  获取openid
	sendurl:tempser+'tran?DEEPURL='+apiServerBase+'sendmsg'

};

//微信分享
var _wxshare_on=true;
//微信摇一摇
var _wxshake_on=true;

var _modules_config={
	num:4,
	zb_NotShow:false   //默认为false
}
//example  不显示直播
//var _modules_config={
//	num:3,
//	zb_NotShow:true
//}
