$("#buy-button").click(function() {
  searchString = $("#search-input").val()
  searchURL = "http://blackmilkclothing.com/search?type=product&q=" + searchString 
  switch_tab = function(){
	  console.log(searchURL)
	  chrome.tabs.getSelected(null, function(tab){
        chrome.tabs.update(tab.id, {url: searchURL});	  
      })
	}
  chrome.storage.sync.set({
    goingCrazy: true
	}
  )
  switch_tab()
  
})