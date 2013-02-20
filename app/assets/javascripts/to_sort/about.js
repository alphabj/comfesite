// ©2012 Comfe Designs LLC.

$(function(){
 
	aboutpageDots = new dotImageCycle();
	aboutpageDots.startupSeq();
	
	$('ul.slideshow.about li').click(function(){
		var current = $(this).index();
		if(aboutpageDots.isOperating == false) {
			aboutpageDots.isOperating = true;
			//clearTimeout(aboutpageDots.timer);
			if(aboutpageDots.intvlSet == true) { 
				//clearInterval(aboutpageDots.autoChange()); 
				//aboutpageDots.intvlSet = false; 
			}
			if( aboutpageDots.previous != current ){	//ignore same clicks	
				aboutpageDots.changeDots(current);
				aboutpageDots.curtainCall(current);
				//headline(current);
				aboutpageDots.previous = current;
			}
			aboutpageDots.isOperating = false;
		}
		//aboutpageDots.timer = setTimeout(aboutpageDots.autoChange(), 4000);
	});

});