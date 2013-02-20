// ©2012 Comfe Designs LLC.

$(function(){

	//set a new instance of dotImageCycle class and start it up 	
	homepageDots = new dotImageCycle();
	homepageDots.startupSeq();

	$('ul.slideshow.home li').click(function(){
		var current = $(this).index();
		if(homepageDots.isOperating == false) {
			homepageDots.isOperating = true;
			//clearTimeout(homepageDots.timer);
			if(homepageDots.intvlSet == true) { 
				//clearInterval(homepageDots.autoChange()); 
				//homepageDots.intvlSet = false; 
			}
			if( homepageDots.previous != current ){	//ignore same clicks	
				homepageDots.changeDots(current);
				homepageDots.curtainCall(current);
				//headline(current);
				homepageDots.previous = current;
			}
			homepageDots.isOperating = false;
		}
		//setTimeout(homepageDots.autoChange(), 4000);
	});
	
});