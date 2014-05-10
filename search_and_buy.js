$("#buy-button").click(function() {
  searchString = $("#search-input").val()
  searchURL = "http://blackmilkclothing.com/search?type=product&q=" + searchString
  
  chrome.tabs.getSelected(null, function(tab){
    chrome.tabs.update(tab.id, {url: searchURL});
  })
})