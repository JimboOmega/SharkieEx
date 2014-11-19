
var nomGenerator = {
  
  requestNoms: function(target, preferredSize) {
    var req = new XMLHttpRequest();
    req.open("GET", target + ".xml", true);
    req.onload = this.processStats_.bind(this);
    req.send(null);
  },

  init: function() {
    chrome.tabs.getSelected(null,function(tab) {
		chrome.storage.sync.get({
			preferredSize: 'M',
			goingCrazy: false
		}, function(items) {
			buyingModeText = items.goingCrazy ? "On" : "Off"
			$('#buying-mode').text(buyingModeText)
			this.preferredSize = items.preferredSize
			this.requestNoms(tab.url)			
      }.bind(this))
      
    }.bind(this));
  },
  
  processStats_: function (e) {
	if(e.target.statusText=="Not Found")
	{
	}
	else
	{
		var variants = e.target.responseXML.querySelectorAll('variant');
		for (var i = 0; i < variants.length; i++) {     
		  var size_name = variants[i].querySelectorAll('title')[0].childNodes[0].nodeValue
		  var count = variants[i].querySelectorAll('inventory-quantity')[0].childNodes[0].nodeValue

		  if(size_name == this.preferredSize)
		  {
			$('body').append('<b>'+ size_name + " " + count + '</b>')
		  }
		  else
		  {
			$('body').append('<p>' + size_name + " " + count + '</p>')
		  }

		}
	}
  }
}

document.addEventListener('DOMContentLoaded', function () {
  nomGenerator.init()
});
