
var nomGenerator = {
  
  requestNoms: function(target) {
    var req = new XMLHttpRequest();
    req.open("GET", target + ".xml", true);
    req.onload = this.processStats_.bind(this);
    req.send(null);
  },

  init: function() {
    chrome.tabs.getSelected(null,function(tab) {
      this.requestNoms(tab.url)
    }.bind(this));
  },
  
  processStats_: function (e) {

    var variants = e.target.responseXML.querySelectorAll('variant');
    for (var i = 0; i < variants.length; i++) {     
      var newP = document.createElement('p')
      var text = document.createTextNode(variants[i].querySelectorAll('title')[0].childNodes[0].nodeValue + " " + variants[i].querySelectorAll('inventory-quantity')[0].childNodes[0].nodeValue);
      newP.appendChild(text)
      document.body.appendChild(newP);
    }
  }
}

document.addEventListener('DOMContentLoaded', function () {
  nomGenerator.init()
});
