var wsUri = "ws://10.102.1.71:8088/rtmsg";
var websocket;

function initws() {
	enterWebSocket();
}

function enterWebSocket() {
	websocket = new WebSocket(wsUri);
	websocket.onopen = function(evt) {
		// 打开连接 发送登录信息
		sendLogin();
	};
	websocket.onclose = function(evt) {
		websocket = new WebSocket(wsUri);
		sendLogin();
	};
	websocket.onmessage = function(evt) {
		// 接收消息进行处理
		onMessage(evt);
	};
	websocket.onerror = function(evt) {

	};
}

function onMessage(evt) {
	if (evt.data == 'ping') {
		websocket.send('pong');
	} else {
		var messageType = "";
		// 去掉转义字符
		var dataJSON = eval('(' + evt.data + ')');
		log(dataJSON);
		// 得到msgText的字符串
		var msgText = dataJSON.msgtext;
		if (msgText) {
			var msgTextJson = eval('(' + msgText + ')');
			messageType = msgTextJson.actiontype;
			log(msgText);
		}

		// 得到消息类型,判断作何种处理
		if (messageType == '10103') {
			// 如果是控制,遥控器,获取按钮信息
			handleControl(msgTextJson.keyvalue);
		} else if (messageType == '10102') {
			// 如果是点播，----处理点播
			handleVOD(msgTextJson.authurl);
		} else if (messageType == 'onlive') {
			// 如果是直播，----处理直播
			handlenlive();
		} else if (messageType == 'play') {
			// 如果是play 非媒资视频播放（如推送录像小视频）
			handlePlay();
		} else if (messageType == 'shake') {
			// 摇一摇互动
			handleShake();
		} else if (messageType == 'share') {
			// 好友分享
			handleShare();
		} else if (messageType == 'recommend') {
			// 推荐
			handleRecommend();
		} else if (messageType == 'remind') {
			// 提醒
			handleRemind();
		}
	}
}

function handleVOD(authurl) {
	// 处理点播
	var smartcid = '';
	if(typeof CAManager == 'undefined'){
		smartcid = "8280204003846641";
	}else{
		smartcid = CAManager.cardSerialNumber;
	}
	var url = authurl.replace("8510010421049904", smartcid);
	
	var requestAjaxObj = new AJAX_OBJ(url,function(__ajaxObj){
			MPlayer.init();
			MPlayer.play(__ajaxObj.data.playurl);
			document.getElementById("body").style.filter = 30;
			document.getElementById("body").style.opacity = 0.1;
		},
		function (__errorCode){
			
		},
		10000
	);
	requestAjaxObj.requestData();
}

function handleControl(keyCode) {
	switch (keyCode) {
	case 'up':
		keyCode = 0x0026;
		break;
	case 'down':
		keyCode = 0x0028;
		break;
	case 'bottom':
		keyCode = 0x0028;
		break;
	case 'left':
		keyCode = 0x0025;
		break;
	case 'right':
		keyCode = 0x0027;
		break;
	case 'ok':
		keyCode = 0x000D;
		break;
	case 'vup':
		keyCode = 0x0447;
		break;
	case 'vdown':
		keyCode = 0x0448;
		break;
	case 'mute':
		keyCode = 0x0449;
		break;
	case 'home':
		keyCode = 0x0024;
		break;
	case 'menu':
		keyCode = 0x0462;
		break;
	case 'back':
		keyCode = 0x0008;
		break;
	case '0':
		keyCode = 0x0030;
		break;
	case '1':
		keyCode = 0x0031;
		break;
	case '2':
		keyCode = 0x0032;
		break;
	case '3':
		keyCode = 0x0033;
		break;
	case '4':
		keyCode = 0x0034;
		break;
	case '5':
		keyCode = 0x0035;
		break;
	case '6':
		keyCode = 0x0036;
		break;
	case '7':
		keyCode = 0x0037;
		break;
	case '8':
		keyCode = 0x0038;
		break;
	case '9':
		keyCode = 0x0039;
		break;
	default:

	}
	//var eve = new EventManager();
	//eve.broadcastEvent('keypress', keyCode, "");
	main.keyEvents(keyCode);
}


function handlenlive() {
	// 处理直播
}

function handlePlay() {
	// 处理非媒资视频播放（如推送录像小视频）
}

function handleShake() {
	// 摇一摇互动
}

function handleShare() {
	// 好友分享
}

function handleRecommend() {
	// 推荐
}

function handleRemind() {
	// 提醒
}

// 发送登录信息
function sendLogin() {
	var smartcid = '';
	if(typeof CAManager == 'undefined'){
		smartcid = "8280204003846641";
	}else{
		smartcid = CAManager.cardSerialNumber;
	}
	var msg = '{"action":0,"devtype":0,"userid":"loginid:loginid","smartcid":"'
			+ smartcid + '","devid":"","appid":"a-0012","token":"123456" }';
	log(msg);
	websocket.send(msg);
}

function log(logger) {
	console.log(logger);
	if(document.getElementById("logger")){
		document.getElementById("logger").innerHTML += '<p>' + JSON.stringify(logger) + '</p>';
	}
}


