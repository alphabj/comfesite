// ©2012 Comfe Designs LLC.
//Handles Client Side Stripe Setup and Execution


$(function(){
	
	/***********BEGIN STARTUP FUNCTIONS*********************/
	
	Stripe.setPublishableKey('pk_test_An7idgNnx5AHjkX0mHeYi1kK');
	
	
	
	/***********END STARTUP FUNCTIONS*********************/
	
	
	
	/***********BEGIN DEFINED FUNCTIONS*********************/
	
	function stripeResponseHandler(status, response) {
		if (response.error) {
			//...
			// show the errors on the form
			$(".payment-errors").text(response.error.message);
		} else {
			var form$ = $("#payment-form");
			// token contains id, last4, and card type
			var token = response['id'];
			// insert the token into the form so it gets submitted to the server
			form$.append("<input type='hidden' name='stripeToken' value='" + token + "'/>");
			// and submit
			form$.get(0).submit();
		}
	}
	
	/*END DEFINED FUNCTIONS*/
	
	/***************************************************************/
	
	
	
	/****************************************************************/
 	
	
	
	
	$('#simplepayment-form').submit(function(event){ 
	
		var validcard = 	Stripe.validateCardNumber();
		var validexp = 		Stripe.validateExpiry();
		var validate = 		Stripe.validateCVC();   
		
		Stripe.createToken({
			number: $('.card-number').val(),
			cvc: $('.card-cvc').val(),
			exp_month: $('.card-expiry-month').val(),
			exp_year: $('.card-expiry-year').val(),
			name: $('').val(),
			address_line1: $('').val(),
			address_line2: $('').val(),
			address_city: $('').val(),
			address_state: $('').val(),
			address_zip: $('').val()
		}, stripeResponseHandler);

	});
	/****************************************************************/
	
	
});
