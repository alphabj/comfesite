// ©2012 Comfe Designs LLC.


//note to self...for any of the animation sections, make sure you check for the "selecting" variable first
//before you allow the code to run. Don't want any random clicks during an animation to screw up the logic.


$(function(){


	/********************* BEGIN GLOBAL VARS *************************************/
	
	//animate left vars
	var selected = 			false;	//
	var selecting = 		false;	//flag to prevent animations from entering stack
	var configured = 		false;	//flag to identify when a product is order ready
	
	//product selection element shorthands
	var prod_selections = 	$('#prod_selections');
	var selection_links = 	$('#prod_selections a');
	var select_bkg = 		$('#prod_bkg_img');		
		
	//configuration element shorthands
	var config = 			$('#prod_config');
	var band_color = 		$('#band_color a');
	var band_reflect = 		$('#band_reflect a');
	
	//cart variables
	var product = 			[]; //product array contains one item with color and highlight. sent to server and reset at completion	
	
	
	/********************* END GLOBAL VARS *************************************/
	
	
	
	/********************* BEGIN DEFINED FUNCTIONS *****************************/
	
	/* PRODUCT SELECTION ANIMATIONS AND LOGIC */
	
	//handles selection of products on front page and slide animation
	function productSelector(element){
		if(selecting == false && selected == false) {
			selecting = true;
			main_anim_speed = 600;
			
			//add selection to product object
			product[0] = element.attr('id');
			
			//make the other product selections disappear faster
			selection_links.not(element).animate({'opacity':'.3'}, 250);
			//animate out the prod_selections
			prod_selections.animate({'margin-left' : '-=45px', 'opacity':'0'}, main_anim_speed, function(){ $(this).css({'display':'none'}); });
			//animate out the background
			select_bkg.animate({'margin-left' : '-=65px', 'opacity':'0'}, main_anim_speed, function(){ $(this).css({'display':'none'}) });
			//animate out the main title below the main image 
			$('#punchline').animate({'opacity':'0', 'margin-left':'-=35px'}, main_anim_speed);
			//set a slight delay for the new window to fade in
			setTimeout(function(){
				config.animate({'opacity':'1', 'margin-left':'0'}, main_anim_speed, function(){
					$('#select_helper').fadeIn(300);
					$('#larrow').fadeIn(300);
					//configureHelper();//add vars for function call if needed
					selecting = false;
					selected = true;
			}).css('display','block'); 
			}, 200);
		} 
		return 0;	
	}
	
	//handles clicked state of color and highlight selections
	function setConfiguration(clickedElem, sibs){
		//if the animation isn't operating and a sibling node has been selected and the clicked elem isn't already selected
		if(selecting == false && sibs.hasClass('selected') == true && clickedElem.hasClass('selected') == false) { 
			selecting = true;
			sibs.not(clickedElem).removeClass('selected').animate({'opacity':'.3'}, 250);
			clickedElem.addClass('selected').animate({'opacity':'1'}, 250, function(){ selecting = false; });
		} 
		//the animation isn't running and no element has been selected
		else if (selecting == false && sibs.hasClass('selected') == false ) {
			selecting = true;
			clickedElem.addClass('selected');
			sibs.not(clickedElem).animate({'opacity':'.3'}, 250, function(){ selecting = false; });
		}
		return 0;
	}
	
	//handles clicks on the color configuration
	function colorConfigure(element) {
		//if it's the first time selected, tell the next step
		if (element.hasClass('selected') == false && element.siblings().hasClass('selected') == false) { 
			setConfiguration(element, band_color);
			$('#larrow').fadeOut(300);
			$('#rarrow').fadeIn(300);
			$('#select_helper p').fadeOut(300, function(){ $(this).text('now highlight').fadeIn(300); });
			setConfigColor('blue');		
		} 
		//already selected
		else { setConfiguration(element, band_color); }
		
		product[1] = element.text();
		
		return 0;
	}
	
	//handles clicks of the highlight configuration
	function highlightConfigure(element){
		//band_color not selected yet
		if(band_color.hasClass('selected') == false){ setConfigColor('red'); }
		//the highlight color hasn't been selected, so hide the configurator
		else if (band_color.hasClass('selected') == true && band_reflect.hasClass('selected') == false) { 
			$('#select_helper').fadeOut(400); 
			setConfiguration(element, band_reflect);
			product[2] = element.text();	
		}
		//keep reselecting and forget about the configurator
		else { 
			setConfiguration(element, band_reflect); 
			product[2] = element.text();	
		}
		
		return 0;
	}
	
	//handles setting of configurator color when steps aren't followed
	function setConfigColor(color){
		if(color == 'blue') {
			$('#select_helper').css({
				'background-color':'#D0DAFF',
				'border-color':'#BCCFF9',
				'color' : '#1D74AE'
			});
		} else if (color == 'red') {
			$('#select_helper').css({
				'background-color':'#FF4343',
				'border-color':'#FF7676',
				'color' : '#F2F2F2'
			});
		}
		return 0;	
	}
	
	//handles clicks of the buy button for error checking
	function buySelection(){
		if(selecting == false){ 
			selecting = true;
					
			//band color doesn't have any selected
			if (band_color.hasClass('selected') == false) {
				//change the configure helper color to red
				setConfigColor('red');
				selecting = false;
			} 
			
			//band reflect doesn't have any selected
			else if (band_reflect.hasClass('selected') == false ) {
				//change the configure helper color to red and set the text
				setConfigColor('red');
				selecting = false;
			}
			
			//good to go: animte up and show buy form
			else { 
				//reset configurator helper colors just in case
				setConfigColor('blue');
				//animate the whole div up
				$('#configuration').animate({'opacity':'0', 'margin-top':'-=65px'}, 600, function(){ 
					$(this).css('display','none');
				});
				//remove visibility on buy and next buttons 
				$('#next').animate({'opacity':'0'}, 600, function(){ $(this).css('display', 'none'); });
				$('#buy').animate({'opacity':'0'}, 600, function(){ 
					$(this).css('display', 'none');
					selecting = false;
					configured = true;
					animateCardDetails();
				});	
			}
		}
		return 0;
	}
	
	
	//handles adding a selection to the cart and then rerouting user view
	function addSelection() {
		
		//check if everything has been formatted properly
		
		//if so
			//add qty to prod object
			product[3] = $('#config_count').attr('value');
		
			//for (i = 0; i<product.length; i++) { alert(product[i]);	}
		
			//send prod object to server for cart
		
			//reset everything on the page
		
			//redirect the user to the starting page
		
		return 0;		
	}	
	
	/* END PRODUCT SELECTION ANIMATIONS AND LOGIC */
	
	
	/* BEGIN PAYMENT FORM ANIMATIONS AND LOGIC */
	
	//handles start up animation of the payment form
	function animateCardDetails() {
		if (selecting == false) {
			selecting = true;
			setTimeout(function(){
				$('#form_instruction').fadeIn(300);
				$('#card_details').css('display','inline-block'); 
				$('#simplepayment-form').fadeIn(300);
				selecting = false;
			}, 200);
		} 
		return 0;
	}
	
	function animatePmtOptions() {
		if (selecting == false) {
			selecting = true;
			var button = $('#simplepayment-form button');
			
			//pmt form isn't initialized 
			if (button.attr('name') == 'shipping') {
				$('#card_details').fadeOut(function(){ 
					setFormInstruction('Please enter your address information.'); 
					$('#customer_details').fadeIn();	
					setPmtBtnName('address');
					setPmtBtnTxt('Finish');
					selecting = false;
				});
			} 
			//ready to enter address details
			else if (button.attr('name') == 'address') {
				$('#form_instruction').fadeOut();
				$('#simplepayment-form').fadeOut(function(){ 
					selecting = false;
					alert('processing payment');
					cancelOrder();
				});
			}
			//the alternate shipping address check box has been checked
			else if (button.attr('name') == 'altship') {
				$('#customer_details').fadeOut(function(){ 
					setFormInstruction('Please enter the alternate shipping information.'); 
					$('#altship').fadeIn();
					setPmtBtnName('finished');
					setPmtBtnTxt('Finish');
					selecting = false;
				});
			}
			
			//else ready to submit
			else if (button.attr('name') == 'finished') {
				$('#form_instruction').fadeOut(300);
				$('#simplepayment-form').fadeOut(300, function(){ 
					selecting = false; 
					alert('processing payment');
					cancelOrder();
		 		});
				//submit pmt detail to stripe with callback for finish
				//play a gif animation		
			}
			
			//otherwise handle the error
			else { alert('an error has occured'); }
		}
		return 0;	
	}
	
	//handles submission of the payment form
	function submitPmtForm(){
		//display the thinking gif
		//handle errors
		//display thanks and next steps upon success
	}
	
	function setFormInstruction(message){
		$('#form_instruction').text(message);
		return 0;	
	}
	
	function setPmtBtnName(name){
		$('#simplepayment-form button').attr('name', name);
		return 0;	
	}
	
	function setPmtBtnTxt(txt){
		$('#simplepayment-form button').text(txt);
		return 0;
	}
	/* END PAYMENT FORM ANIMATIONS AND LOGIC */

	
	/* BEGIN CANCEL ORDER BTN LOGIC */
	
	//handles reset logic of canceling an order. replaces reverseAnim().
	function cancelOrder(){
		if(selecting == false) { 
			selecting = true;
			
			//timers for the animations
			var firststage = 200; 
			var secondstage = 300; 
			
			resetConfigurator(secondstage); 
			resetHomepage(firststage); 
			resetProductSelections(secondstage); 
			resetForm(firststage); 	
			
		} return 0; 
	}
	
	//fade out product config element and fade in the home page
	function resetHomepage(timeCount){	
		//set timeout and fade home display back in
		setTimeout(function(){
			select_bkg.css({'display':'block'}).animate({'margin-left' : '+=65px', 'opacity':'1'}, 600);
			prod_selections.css({'display':'block'}).animate({'margin-left' : '+=45px', 'opacity':'1'}, 600);
			selection_links.css({'opacity':'1'});
			$('#punchline').animate({'opacity':'1', 'margin-left':'+=35px'}, 600, function(){
				selected = selecting = configured = false;
			}); 
		}, timeCount);
		return 0;
	}
	
	//reset the configurator as part of canceling an order
	function resetConfigurator(timeCount){
		//fade prod config
		config.animate({'opacity':'0', 'margin-left':'+=30px'}, 400, function() {
			$(this).css('display','none');
			
			setTimeout(function(){		
				$('#configuration').css({'opacity':'1', 'margin-top':'35px', 'display':'block'}, 600);
				$('#next').css({'display':'inline-block', 'opacity':'1'});
				$('#buy').css({'display':'inline-block', 'opacity':'1'});
		
				//reset configurator		
				setConfigColor('blue');
				$('#rarrow').css('display','none');
				$('#select_helper p').text('pick a color');
				$('#select_helper').css('display','none');
			}, timeCount);
		});
		return 0;
	}
	
	//reset the classes, the opacity, and the cart of the product selections
	function resetProductSelections(timeCount){
		setTimeout(function(){
			//remove 'selected' class from .config and make opacity 1
			band_color.removeClass('selected').css('opacity', '1');
			band_reflect.removeClass('selected').css('opacity','1');	
		}, timeCount);
		return 0;
	}
	
	//resets check box and the associated variable
	function resetCheckBox(){
		altshipboxchecked = false;
		$('input[name=new_shipping]').attr('checked', false);
		return 0;
	}
	
	//handles display animation of form
	function resetForm(timeCount){
		setTimeout(function(){
			//reset form display options
			$('#simplepayment-form').fadeOut(function(){ 
				
				//reset display of the form sections
				$('.form-section').css('display','none');
				
				//reset display of the inputs of all form elements
				$('#simplepayment-form input').attr('value','');
				
				//reset check box for additional shipping and it's variable
				resetCheckBox();
				
				//reset the product count
				$('#config_count').attr('value','1');
				
				//reset the form instruction display
				$('#form_instruction').css('display','none');
				
				//reset the form instruction message
				setFormInstruction('Please enter your card details.')
				
				//reset the button name
				setPmtBtnName('shipping');
				
				//reset the button text
				setPmtBtnTxt('Next');
				
			});
			//reset all vars in the product object
			product = [];
		}, timeCount);
		return 0;
	}
	
	/* END CANCEL ORDER BTN LOGIC */
	
	
	/* BEGIN ERROR CHECKING */
	
	/* END ERROR CHECKING */
	
	/*************** END DEFINED FUNCTIONS **************************/
	
	

	/******** HANDLE CLICKS ON PRODUCT SELECTION AND BUYING *******/
	
	//click the product selection
	selection_links.click(function(e){
		e.preventDefault();
		productSelector($(this));
	});
	
	//choose band color
	band_color.click(function(e){
		e.preventDefault();
		colorConfigure($(this));
	});
	
	//choose band highlight 
	band_reflect.click(function(e){
		e.preventDefault();
		highlightConfigure($(this));
	});	
	
	//click the buy link
	$('#buy').click(function(e){
		e.preventDefault();
		buySelection();
	});
	
	//shipping checkbox is clicked
	var altshipboxchecked = false;
	$("input[name='new_shipping']").live('click', function(){ //may want to check on something different...such as unclick
		if(altshipboxchecked == false) {
			altshipboxchecked = true;
			setPmtBtnTxt('Next');
			setPmtBtnName('altship');
		} else {
			setPmtBtnTxt('Finish');
			setPmtBtnName('address');
			altshipboxchecked = false;
		}
	});
	
	//click the add to cart link
	$('#next').click(function(){
		e.preventDefault();
		addSelection();
	});
	
	//click the cancel button
	$('#cancel_order').click(function(e){
		e.preventDefault();
		cancelOrder();
	});

	//click the next form button
	$('#simplepayment-form button').click(function(e){
		e.preventDefault();
		animatePmtOptions();  
	});
	
	//click the submit form button
	$('#submitPmt').click(function(e){
		e.preventDefault();
		//submitPmtForm();
	});
	/******* END HANDLE CLICKS ON PRODUCT SELECTION AND BUYING *********/
	
	
	//var alternate_shipping
	var customer_details = '<div id="#fatMan"></div>'
	
		// btn type="submit" class="submit-button"
		
		
	/********* FADE IN BANNER IMAGES UPON LOAD **********/
	//fade in the first
	$('.rollin:eq(0)').animate({
			'left':'+=100px',
			'opacity':'1'
	},1100);
	
	//animate left and fade in at same time
	setTimeout(function(){
		$('.rollin:eq(1)').animate({
			'left':'+=100px',
			'opacity':'1'	
		}, 900);
	}, 700);
	
	//fade in the third with a timer
	setTimeout(function(){
		$('.rollin:eq(2)').animate({
			'left':'+=100px',
			'opacity':'1'	
		}, 900);
	}, 1250);
	
	
	
	/*EMAIL FORM CONTROLS*/
	var operating = false;
	$('form').mouseover(function(){
		if (email_clicked == false && operating == false) {
			operating = true;
			$(this).animate({opacity : 1}, 150, function(){operating = false;});
			$('.email').css({  
				'background-image' : 'url(images/top_foot_block.png)',
				'background-position' : '-303px 0',
				'background-repeat' : 'no-repeat'
			});
			$('#submit').css ({ 
				'background-image' : 'url(images/top_foot_block.png)',
				'background-position' : '-992px 0',
				'background-repeat' : 'no-repeat' 
			});
		}
		
	}).mouseout(function(){
		if (email_clicked == false && operating == false) {
			$(this).animate({opacity: .5}, 150, function(){operating = false;});
			$('.email').css({ 
				'background-image' : 'url(images/top_foot_block.png)',
				'background-position' : '0 0',
				'background-repeat' : 'no-repeat'
			});
			$('#submit').css ({ 
				'background-image' : 'url(images/top_foot_block.png)',
				'background-position' : '-906 0',
				'background-repeat' : 'no-repeat' 
			});
		}
	
	});
	
	var email_clicked = false;
	$('.email').click(function(){
		if (email_clicked == false) {
			email_clicked = true;
			$('form').animate({opacity:1}, 200);
			$(this).attr('value', "");
		}		
		$(this).css({ 
			'color' : '#52a7cd',
			'background-image' : 'url(images/top_foot_block.png)',
			'background-position' : '-606px 0',
			'background-repeat' : 'no-repeat'
		});
		$('#submit').css({
			'background-image' : 'url(images/top_foot_block.png)',
			'background-position' : '-1077px 0',
			'background-repeat' : 'no-repeat' 
		})
		//do error checking on submit.
	});
	
	var unClicked = true;
	$('#submit').click(function(){
		if (unClicked == true) {
			unClicked = false;
			if(	$('.email').val() == 'sign up for updates' || $('.email').val() == ' ' || $('.email').val() == ''){
					$('form').attr('action', '');
				}
			$('form').fadeOut(300, function(){
				$('iframe').before('<h3 class="center">Thanks! TTY soon.</h3>').fadeIn(300);
			});
		}
	});

	/*END EMAIL FORM CONTROLS*/

});
