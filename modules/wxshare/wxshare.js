var wxshare = {
	options: {
		m: false,
		title: "江苏有线微信电视",
		logourl: "http://jscn.kanketv.com/b2b-jscn/img/jscnShare128.png",
		info: "【微信电视，让微信成为电视遥控器】",
		url: webset.base,
		debug: false
	},
	init: function(data) {
		this.initEvent_();
		if (data.title != "" && data.title != undefined) {
			this.options.title = data.title;
		}
		if (data.logourl != "" && data.logourl != undefined) {
			this.options.logourl = data.logourl;
		}
		if (data.info != "" && data.info != undefined) {
			this.options.info = data.info;
		}
		if (data.url != "" && data.url != undefined) {
			this.options.url = data.url;
		}
		if (data.debug != "" && data.debug != undefined) {
			this.options.debug = data.debug;
		}
	},
	initEvent_: function() {
		jQuery.get = function(url, data, success, error) {
			if (jQuery.isFunction(data)) {
				error = success;
				success = data;
				data = undefined;
			}
			url = encodeURI(url);
			jQuery.ajax({
				url: url,
				type: "get",
				dataType: "json",
				cache: false,
				data: data,
				success: success,
				error: error
			});
		}
		jQuery.query = function() {
			var aQuery = window.location.href.split("?"); //取得Get参数
			var aGET = new Array();
			if (aQuery.length > 1) {
				var aBuf = aQuery[1].split("&");
				for (var i = 0, iLoop = aBuf.length; i < iLoop; i++) {
					var aTmp = aBuf[i].split("="); //分离key与Value
					aGET[aTmp[0]] = aTmp[1];
				}
			}
			return aGET;
		}
		wxshare.config_();
	},
	check_: function(url) {
		if (url.indexOf("detial") == -1) {
			wxshare.weixinshare_(wxshare.options.title, wxshare.options.logourl, wxshare.options.info, wxshare.options.url);
		}
	},
	config_: function() {
		var url = window.location.href.split("#")[0];
		url = encodeURI(url);
		var weixinurl = webset.base + 'wxtv/jsapiTicket';
		var data = {
			url: url
		}
		$.get(weixinurl, data, function(e) {
			var appId = e.appid;
			$.cookie('appId', appId);
			wxshare.check_(url);
			var timestamp = e.timestamp;
			var nonceStr = e.nonceStr;
			var signature = e.signature;
			wx.config({
				debug: wxshare.options.debug,
				appId: appId, // 公众号的唯一标识
				timestamp: timestamp, // 生成签名的时间戳
				nonceStr: nonceStr, // 生成签名的随机串
				signature: signature, // 签名
				jsApiList: ['onMenuShareTimeline',
						'onMenuShareAppMessage',
					] // 需要使用的JS接口列表
			});
		})
	},
	ready_: function() {
		wx.ready(function() {
			wxshare.options.m = "true";
			wx.onMenuShareTimeline({
				title: $.cookie('sharetitle'),
				link: $.cookie('urltem'),
				imgUrl: $.cookie('shareimgurl')
			});
			wx.onMenuShareAppMessage({
				title: $.cookie('sharetitle'),
				desc: $.cookie('sharedesc'),
				link: $.cookie('urltem'),
				imgUrl: $.cookie('shareimgurl')
			});
		});
	},
	error_: function() {
		wx.error(function(res) {
			if (wxshare.options.m == "true") {
				wxshare.options.m = "false";
				wxshare.config_();
			}
		});
	},
	weixinshare_: function(sharetitle, shareimgurl, sharedesc, url) {
		var appId = $.cookie('appId');
		var code = $.query()['code'] ? $.query()['code'] : '';
		if (url.indexOf('?code=' + code) > -1) {
			url = url.replace('?code=' + code, '');
		}
		if (url.indexOf('&code=' + code) > -1) {
			url = url.replace('&code=' + code, '');
		}
		if (url.indexOf('&state=STATE') > -1) {
			url = url.replace('&state=STATE', '');
		}
		if(url.indexOf('&state=123') > -1){
			url = url.replace('&state=123', '');
		}
		url = encodeURIComponent(url);
		/*if (url.indexOf('https://open.weixin.qq.com/connect/oauth2/authorize') == -1 && appId != undefined) {
		 url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appId + '&redirect_uri=' + url + '&response_type=code&scope=snsapi_base&state=123#wechat_redirect';
		 } else {
		 url = decodeURIComponent(url);
		 }*/
		var base='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4ade04b3e5c8f99b&redirect_uri=';
		var redir='http://h5.hunaniptv.com/WeixinSDK/?Action=ValidSns&AppId=wx4ade04b3e5c8f99b&RedirectUrl=';
		var relUrl=base+encodeURI(redir)+encodeURI(url);
		$.cookie('sharedesc', sharedesc);
		$.cookie('sharetitle', sharetitle);
		$.cookie('shareimgurl', shareimgurl);
		$.cookie('urltem', relUrl);
		$.cookie('openid', OpenId);
		wxshare.ready_(str);
		wxshare.error_();
	}
}

//初始化
var data = {
	title: "看客微信电视",
	logourl: "http://tv.kanketv.com/image/home/logo_kanke_200.jpg",
	info: "【微信电视，让微信成为电视遥控器】",
	url: webset.base, //主页分享链接    默认为webset.base，可不传
	debug: false //是否开启调试    true/false  默认为false，可不传
}
wxshare.init(data);