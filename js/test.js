window.remotebtn=function(options){
    var _this = this;
    _this.elm = options.elm;
    _this.html = $('.html');
    var stx = options.maxleft;
    var sty = parseInt(_this.elm.css('top'));
    var nstx = 0, nsty = 0;
    _this.elm.css('left',options.maxleft);
    _this.ismove = false;
    _this.elm.on('touchstart',function(event){
        nstx = event.originalEvent.touches[0].pageX;
        nsty = event.originalEvent.touches[0].pageY;
        $.noscroll();
    }).on('touchmove',function(event){
        var cx = event.originalEvent.touches[0].pageX - nstx;
        var cy = event.originalEvent.touches[0].pageY - nsty;
        _this.elm.attr('style','left:'+(cx+stx)+'px;top:'+(sty+cy)+'px;');
        _this.ismove = true;
    }).on('touchend',function(){
        if(_this.ismove){
            $.backscroll();
        }
        _this.ismove = false;
        stx = parseInt(_this.elm.css('left'));
        sty = parseInt(_this.elm.css('top'));
        if(stx>=options.midleft){
            stx = options.maxleft;
        }else{
            stx = 0;
        }
        if(sty<=options.mintop){
            sty = options.mintop;
        }else if(sty>=options.maxtop){
            sty = options.maxtop;
        }
        _this.elm.attr('style',"top:"+sty+"px; left:"+stx+"px; transition: top 0.2s,left 0.2s;-webkit-transition: top 0.2s,left 0.2s;-moz-transition: top 0.2s,left 0.2s;");
    }).on('click',function(){
        $.noscroll();
    })

    _this.targ = options.targ;

    _this.bd = _this.targ.find('.remotebd');
    
    $('.JJ_code').click(function(){
        var v = $(this).data('v');
        console.log(v)
        sentcode(v);
    });

    $('#rmlink').click(function(){
        window.location.href = $(this).attr('href');
    });
    _this.targ.click(function(){
        $.backscroll();
        $('#J_remote').toggle();
    })
    _this.bd.click(function(){
        return false;
    });

    _this.sentCode = function(v){
        console.log(v)
		// sentmsgfn(v,'action');

    }

    // 兼容ios的active
    document.body.addEventListener('touchstart', function () {}); 
    return _this;
}
;(function($, window, document, undefined){
	$(function(){
		$('#J_showrt').click(function(){
			$('#J_remote').toggle();
		});
		var $winw = window.innerWidth;
        var $winh = window.innerHeight;
        var rem = window.rem;
		var rmtebtn = new remotebtn({
	            elm:$('#J_showrt'),
	            minleft:0,
	            maxleft:$winw-0.4*rem,
	            mintop:0.44*rem,
	            maxtop:$winh-0.44*rem,
	            midleft:($winw-0.4*rem)/2,
	            targ:$('#J_remote')
	        });
	})
})(jQuery, window, document);