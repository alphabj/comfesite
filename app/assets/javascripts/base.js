// ©2012 Comfe Designs LLC.


$(function(){
 	
	//SMOTHSCROLL
	$('.smooth').smoothScroll({ offset: -100, speed: 1000 });
	
	
	//FAQ REVEAL
	$('span.stacked a').bind("click", function(e){
		e.preventDefault();
		if ( $(this).hasClass('shown') == false ) { $(this).addClass('shown').next().slideDown(); }
	});
	
	
	//video fancybox
	$('.video').fancybox();
	
});
