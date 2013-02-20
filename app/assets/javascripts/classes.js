/* CLASS AND METHODS FOR IMAGE CHANGING DOTS */

//class for sitewide use of image-changing dots
function dotImageCycle() {
	this.isOperating = false;
	this.previous;
	this.intvlSet = false;
}
dotImageCycle.prototype.startupSeq = function() {
	$('img.carousel :first').addClass('nowShowing').fadeIn(500);
	$('.slideshow li:first').addClass('selected');
}
dotImageCycle.prototype.curtainCall = function(position) {
	var lastOne = $('img.nowShowing');
	var nextOne = $('img.carousel').eq(position);
	lastOne.removeClass('nowShowing').fadeOut(400, function() {
		nextOne.addClass('nowShowing').fadeIn(400);	
	});
}
dotImageCycle.prototype.changeDots = function(position) {
	var before = $('.slideshow li.selected');
	var after = $('.slideshow li').eq(position);
	before.removeClass('selected');
	after.addClass('selected');
}
// dotImageCycle.prototype.autoChange = function (){
// 	intvlSet = true;
// 	setInterval(function(){
// 		if ( $('.slideshow li:last').hasClass('selected') ){ 
// 			changeDots(0);
// 			curtainCall(0);
// 		} else {
// 			var nextOne = $('.slideshow li.selected').index() + 1;
// 			changeDots(nextOne);//find the position and do the next item in the list
// 			curtainCall(nextOne);
// 		}
// 	}, 9000);
// }

// dotImageCycle.prototype.headlineStart = function() {
// 	alert(true);
// 	$('.headine h1:first').addClass('nowShowing').fadeIn(500);
// }
// dotImageCycle.prototype.headlineSwitch = function(position) {
// 	var lastOne = $('.headline h1.nowShowing');
// 	var nextOne = $('.headline h1').eq(position);
// 	lastOne.removeClass('nowShowing').fadeOut(400, function(){
// 		nextOne.addClass('nowShowing').fadeIn(400);	
// 	});
// 	return 0;
// }

/* END CLASS AND METHODS FOR IMAGE CHANGING DOTS */




