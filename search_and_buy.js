switch_tab = function(url){
		chrome.tabs.getSelected(null, function(tab){
		chrome.tabs.update(tab.id, {url: url});	  
	})
}

$("#search-and-buy-button").click(function() {
  event.preventDefault();
  searchString = $("#search-input").val()
  chrome.storage.sync.get({
	preferredSite: 'us.blackmilkclothing.com'}, 		
    function(items) {
		searchURL = "http://" + items.preferredSite + "/search?type=product&q=" + searchString 
		console.log(searchURL)
		chrome.storage.sync.set({
			goingCrazy: true
			
		})
		switch_tab(search_url)
	})
  
})

$("#stop-button").click(function() {
	event.preventDefault()
  	chrome.storage.sync.set({
		goingCrazy: false
	})  
	$('#buying-mode').text("Off")
})

$("#add-to-list-button").click(function() {
	event.preventDefault()
	chrome.storage.sync.get({
		storedItemLinks: []}, 		
		function(items) {
			chrome.tabs.getSelected(null, function(tab){
				newArray = items.storedItemLinks
				newArray.push(tab.url)
				chrome.storage.sync.set({
					storedItemLinks: newArray
				})  
			})
		})
})

$("#buy-list-items").click(function() {
	event.preventDefault()
	chrome.storage.sync.get({
		storedItemLinks: []},
		function(items) {
			if(items.storedItemLinks.length > 0) {
				chrome.storage.sync.set({
					storedItemBuying: true,
					storedItemActive: 0,
					goingCrazy: true},
					function(){
						switch_tab(items.storedItemLinks[0])
					}
				)  
				
			}
		})
})

function jump_to_next_page(){
  chrome.storage.sync.get({
	  storedItemBuying: false,
	  storedItemActive: 0,
	  storedItemLinks: []
  },
  function(storage_results){
	console.log(storage_results.storedItemActive+1)
	chrome.storage.sync.set({
		storedItemBuying: true,
		storedItemActive: storage_results.storedItemActive+1,
		goingCrazy: true},
		function(){
			switch_tab(storage_results.storedItemLinks[storage_results.storedItemActive+1])
		}
	)}
  )
}
	

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.next_item == "nom")
	{
	  jump_to_next_page()
      sendResponse({nom: "omnomnom"});
	}
  });
	
