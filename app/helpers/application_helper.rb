module ApplicationHelper

	def stylesheets(*files)
	    content_for(:head) { stylesheet_link_tag(*files) }
	end
	
	def setBodyId(title)
		@bodyID
		case 
		when title == "Comfe Designs"
			@bodyID = "index"

		when title == "Comfe Arms" 
			@bodyID = "arms"

		when title == "Comfe Hands"
			@bodyID = "hands"

		when title == "About Comfe Designs"
			@bodyID = "about"

		when title == "Comfe Designs News"
			@bodyID = "news"

		when title == "Comfe Designs Sitemap"
			@bodyID = "sitemap"

		when title == "Contact Comfe Designs"
			@bodyID = "contact"

		when title == "Comfe Designs Legal"
			@bodyID = "legal"
		
		else
			@bodyID = "error"
		end

		return @bodyID
	end

end
