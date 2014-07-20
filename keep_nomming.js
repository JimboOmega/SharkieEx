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

function go_forth_and_buy(){
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
  //click checkout
  $('#checkout').click()
  //clicks "continue to next step"
  $('#commit-button').click()
  $('#paypal_express').click()
  jQuery("#paypal-payments").waitUntilExists(complete_purchase_and_stop_nomming)
}

$(function(){
  chrome.storage.sync.get({
      goingCrazy: false
  },
  function(storage_results){
    if(storage_results.goingCrazy)
	{
      go_forth_and_buy()
	}
  })
})