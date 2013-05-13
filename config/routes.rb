Comfesite::Application.routes.draw do
  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  #front-facing pages
  match 'about' => 'pages#about'
  match 'news' => 'pages#news'
  match 'contact' => 'pages#contact'
  match 'sitemap' => 'pages#sitemap'
  match 'legal' => 'pages#legal'
  match 'faq' => 'pages#faq'

  #Comfe Hands pages
  match 'hands' => 'pages#hands'

  #Comfe Arms pages
  match 'arms' => 'pages#arms'
  match 'armsdesign' => 'pages#armsdesign'
  match 'armsfeats' => 'pages#armsfeats'
  match 'armsspecs' => 'pages#armsspecs'
  
  #cart and customer content pages
  match 'armsbuy' => 'pages#armsbuy'
  match 'pmttest' => 'pages#armsbuytest'

  match 'pmttest/charge' => 'pages#charge_customer'



  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

resources :pages
 
  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  # root :to => 'welcome#index'

  root :to => 'pages#index'


  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id))(.:format)'
end
