$("#search-and-buy-button").click(function() {
  event.preventDefault();
  searchString = $("#search-input").val()
  chrome.storage.sync.get({
	preferredSite: 'us.blackmilkclothing.com'}, 		
    function(items) {
		searchURL = "http://" + items.preferredSite + "/search?type=product&q=" + searchString 
		console.log(searchURL)
		switch_tab = function(){
			chrome.tabs.getSelected(null, function(tab){
				chrome.tabs.update(tab.id, {url: searchURL});	  
			})
		}
	
		chrome.storage.sync.set({
			goingCrazy: true
			
		})
		switch_tab()
	})
  
})

$("#stop-button").click(function() {
	event.preventDefault()
  	chrome.storage.sync.set({
		goingCrazy: false
	})  
})

$("#add-to-list-button").click(function() {
	event.preventDefault()
	chrome.storage.sync.get({
		storedItemLinks: []}, 		
		function(items) {
			chrome.tabs.getSelected(null, function(tab){
				console.log(items.storedItemLinks)
				newArray = items.storedItemLinks
				console.log(newArray)
				console.log("hi")
				newArray.push(tab.url)
				console.log("no")
				console.log(newArray)
				
				chrome.storage.sync.set({
					storedItemLinks: newArray
				})  
			})
		})
	
})