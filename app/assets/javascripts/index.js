// ©2012 Comfe Designs LLC.


$(function(){
 	
	/* Switching Main Images & Dots */
	function curtainCall(position){
		var lastOne = $('#headline img.nowShowing');
		var nextOne = $('img.carousel').eq(position);
		lastOne.removeClass('nowShowing').fadeOut(400, function(){
			nextOne.addClass('nowShowing').fadeIn(400);	
		});
		return 0;
	}
	function changeDots(position){
		var before = $('#slideshow li.selected');
		var after = $('#slideshow li').eq(position);
		before.removeClass('selected');
		after.addClass('selected');
		return 0;
	}
	function startupSeq() {
		$('img.carousel:first').addClass('nowShowing').fadeIn(500);
		$('#slideshow li:first').addClass('selected');
		return 0;
	}
	function autoChange(){
		intvlSet = true;
		autoChangeIntvl = setInterval(function(){
			if ( $('#slideshow li:last').hasClass('selected') ){ 
				changeDots(0);
				curtainCall(0);
			} else {
				var nextOne = $('#slideshow li.selected').index() + 1;
				changeDots(nextOne);//find the position and do the next item in the list
				curtainCall(nextOne);
			}
		}, 9000);	
	}
	
	startupSeq();
	var isOperating = false;
	var previous;
	var intvlSet = false;
	var timer = setTimeout(autoChange, 4000);
	var autoChangeIntvl;
	
	$('#slideshow li').click(function(){
		var current = $(this).index();
		if(isOperating == false) {
			isOperating = true;
			clearTimeout(timer);
			if(intvlSet == true) { clearInterval(autoChangeIntvl); intvlSet = false; }
			
			if( previous != current ){	//ignore same clicks	
				changeDots(current);
				curtainCall(current);
				//headline(current);
				previous = current;
			}
			isOperating = false;
		}
		timer = setTimeout(autoChange, 4000);
	});
	
	
	
});
