/**
 * Created by libin on 2016/11/28.
 */
//var serverBase='http://'+document.domain+"/wechat-2.0-wxtv/";//主域名  ---------上线请更改
// var serverBase="http://hbwx.kanke.tv/b2b-jscn/";//主域名  ---------上线请更改
var serverBase="http://zzb.kanketv.com/b2b-jscn/";//主域名  ---------上线请更改
var apiServerBase='http://202.91.228.23:81/';//api接口域名----------上线请更改

var tempser = "http://zzb.kanketv.com/b2b-jscn/";
// var tempser = "http://hbwx.kanke.tv/b2b-jscn/";
var webset = {
    base:tempser,
    tran:tempser+'tran?DEEPURL=',
    url:tempser+'tran?DEEPURL=http://api2.kanketv.com/',
    play:tempser+'tran?DEEPURL=http://play.kanketv.com/playerCode2.0/play/api?linkUrl=',
    device:tempser+'tran?DEEPURL='+apiServerBase+'wechat-2.0-api/api/v1/user/bind.json',//正在使用
    ctrl:tempser+'ctrl/',
    ak:'34DB874AF269B539',
    as:40,
    testurl:tempser+'tran?DEEPURL='+apiServerBase+'api/v1/',
    apiurl:tempser+'tran?DEEPURL='+apiServerBase+'wechat-2.0-api/api/v1/',  //正在使用
    initurl:tempser+'wxtv/init'  //微信初始化  获取openid
};
/*var webset = {
 base:serverBase,
 tran:serverBase+'tran?DEEPURL=',
 url:serverBase+'tran?DEEPURL=http://api2.kanketv.com/',
 play:serverBase+'tran?DEEPURL=http://play.kanketv.com/playerCode2.0/play/api?linkUrl=',
 device:serverBase+'tran?DEEPURL='+apiServerBase+'wechat-2.0-api/api/v1/user/bind.json',//正在使用
 ctrl:serverBase+'ctrl/',
 ak:'34DB874AF269B539',
 as:40,
 testurl:serverBase+'tran?DEEPURL='+apiServerBase+'api/v1/',
 apiurl:serverBase+'tran?DEEPURL='+apiServerBase+'wechat-2.0-api/api/v1/',  //正在使用
 initurl:serverBase+'wxtv/init'  //微信初始化  获取openid
 };*/
//微信分享
// var _wxshare_on=true;
// //微信摇一摇
// var _wxshake_on=true;
//
// var _modules_config={
//     num:4,
//     zb_NotShow:false   //默认为false
// }
//example  不显示直播
//var _modules_config={
//	num:3,
//	zb_NotShow:true
//}
