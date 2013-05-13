class PagesController < ApplicationController
	
	def charge_customer
		# get the credit card details submitted by the form
		@token = params[:stripe_card_token]

		# create a Customer
		customer = Stripe::Customer.create({
		  :card => @token,
		  :description => "payinguser@example.com"
			}, Stripe.api_key
		)

		# charge the Customer instead of the card
		charge = Stripe::Charge.create({
      :amount => 1000,
      :currency => 'usd', 
      :customer => customer.id
    }, Stripe.api_key)

		# # save the customer ID in your database so you can use it later
		# save_stripe_customer_id(user, customer.id)

		# # later
		# customer_id = get_stripe_customer_id(user)

	# TODO: Stripe exception handling
	rescue Stripe::InvalidRequestError => e
    logger.error "Stripe error while charging card: #{e.message}"
	end

end


