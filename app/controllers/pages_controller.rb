class PagesController < ApplicationController
	
	def charge_customer
		# get the credit card details submitted by the form
		token = params[:stripeToken]

		# create a Customer
		customer = Stripe::Customer.create(
		  :card => token,
		  :description => "payinguser@example.com"
		)

		# charge the Customer instead of the card
		Stripe::Charge.create(
		    :amount => 1000, # in cents
		    :currency => "usd",
		    :customer => customer.id
		)

		# # save the customer ID in your database so you can use it later
		# save_stripe_customer_id(user, customer.id)

		# # later
		# customer_id = get_stripe_customer_id(user)
	
	end

end


