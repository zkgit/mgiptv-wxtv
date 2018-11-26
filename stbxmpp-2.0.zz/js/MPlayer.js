var $MP="";
var mediaID = 0;
var MPlayer = {
	init:function(){
		if($MP==""||$MP==null) {
			if(typeof(MediaPlayer)!="undefined")$MP = new MediaPlayer();
		}
		//mediaID = $MP.getPlayerInstanceID();
		if(typeof(GlobalVarManager)!= "undefined" && GlobalVarManager.getItemValue("PLAYER_INSTANCE_ID") == null) {
			mediaID = $MP.getPlayerInstanceID();
			GlobalVarManager.setItemValue("PLAYER_INSTANCE_ID",mediaID);
		} else if(typeof(GlobalVarManager)!= "undefined" && GlobalVarManager.getItemValue("PLAYER_INSTANCE_ID") != null) {
			mediaID = GlobalVarManager.getItemValue("PLAYER_INSTANCE_ID");
		} else {
			mediaID = $MP.getPlayerInstanceID();
		}
		var flag = $MP.bindPlayerInstance(mediaID);
	},
	play:function(__url,__type){
		if(__url==null&&__type==null){
			$MP.play();
			return;
		}else if(__url==""||__url==null){
			return;
		}
	    $MP.setMediaSource(__url);
	},
	setPosition:function(__x, __y, __w, __h){
		__x=__x||0; 
		__y=__y||0; 
		__w=__w||480; 
		__h=__h||360;
		$MP.setVideoDisplayMode(0);
        var rec = new Rectangle(__x, __y, __w, __h);
        $MP.setVideoDisplayArea(rec);
        $MP.refresh();
	},
	stop:function(__type){
		$MP.stop();
		$MP.clearVideoOutput();֡
		if(__type == 1)$MP.unbindPlayerInstance($MP.playerInstanceID);	
	},
	pause:function(){
		try{
			$MP.pause();
		}catch(E){}
	},
	resume:function(){
		try{
			$MP.resume();
		}catch(E){}
	},
	setMute:function(){
		try{
			AudioSetting.mute();
		}catch(E){}
	},
	setUnmute:function(){
		try{
			AudioSetting.unMute();
		}catch(E){}
	},
	getMuteStatus:function(){
		try{
			var muteStatus = AudioSetting.isMute();
			return muteStatus;
		}catch(E){}
	},
	setVolume:function(__vol){
		try{
			$MP.setVolume(__vol);
		}catch(E){}
	},
	getVolume:function(){
		try{
			var __vol = $MP.getVolume();
			return __vol;
		}catch(E){}
	},
	getElapsed:function(){
		try{
			var currTime = $MP.getCurrentPlayTime();
			return currTime;
		}catch(E){}
	},
	getDuration:function(){
		try{
			var duration = $MP.getMediaDuration();
			return duration;
		}catch(E){}
	},
	seek:function(__sec){
		
	},
	setEventCallback:function(__eventCallback){
		
	}
};

