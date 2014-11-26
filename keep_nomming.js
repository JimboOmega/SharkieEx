function click_on_preferred_size(preferredSize)
{
  var size_regex = new RegExp("[ \t\r\n]"+preferredSize+ "[ \t\r\n]")
  size_divs = $(".prodop").filter(function () {
    return size_regex.test($(this).text()); 
  })
  size_divs.find('input').click();
}


function complete_purchase_and_stop_nomming(){
  chrome.storage.sync.set({
    goingCrazy: false
  })
  jQuery("#paypal-payments").find('input').click()
  jQuery("#complete-purchase").click()

}

function go_forth_and_buy(checkout){
  //pick first search result (if the search page)
  $('.productfirst img').click()
  //if this is the size selection page, pick the user's size and add to cart
  size_inputs = $('.prodop input')
  if(size_inputs.length > 0)
  {
    chrome.storage.sync.get({
      preferredSize: 'M'
    }, 
	function(items){
      click_on_preferred_size(items.preferredSize)
      $('#add-to-cart').click()
	})
  }
  if(checkout){
	  //click checkout
	  $('#checkout').click()
	  //clicks "continue to next step"
	  $('#commit-button').click()	  
	  
	  //clicks continue (in shopify)
	  if($(".current-step-contact_information").length > 0)
	  {
		$(".btn[type=submit][value=Continue]").click()	  	  
	   }
	  //for the new form; clicks paypal button
	  if($(".current-step-shipping_and_payment_method").length > 0)
      {
		shutdown_id = setInterval(function(){
			if(!($(".icon.icon--spinner").length > 0))
			{
				$("label:contains('PayPal')").click()
				$("input[value='Place my order']")[0].click()
				clearInterval(shutdown_id)
				complete_purchase_and_stop_nomming()
			}		
		}, 500)	
	  }
	}
}

$(function(){
  chrome.storage.sync.get({
      goingCrazy: false,
	  storedItemBuying: false,
	  storedItemActive: 0,
	  storedItemLinks: []
  },
  function(storage_results){
    if(storage_results.goingCrazy)
	{
		if(storage_results.storedItemBuying)
		{			
			if(storage_results.storedItemActive == storage_results.storedItemLinks.length - 1)
			{			
				go_forth_and_buy(true)
			}
			else
			{					
				is_cart = window.location.href.indexOf("blackmilkclothing.com/cart") > -1
				console.log(is_cart)
				
				if(!is_cart)
				{					
					go_forth_and_buy(false)
				}
				else
				{					
					chrome.runtime.sendMessage({next_item: "nom"}, function(response) {
						console.log("nomming next item...")
					});
					
				}  						
				
			}
		}
		else{
			go_forth_and_buy(true)
		}
	}
	
	
  })
})