$(function(){
	$("html").scyuns(720,0);
	//返回顶部
	var returntop=$('.returntop');
	$(window).scroll(function(){
		if ($(window).scrollTop()>$(window).height()){
			returntop.fadeIn(1000);
		}
		else
		{returntop.fadeOut(1000);}
	});
	returntop.click(function(){
		$('body,html').animate({scrollTop:0},1000);
	})

})