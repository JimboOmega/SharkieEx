function save_options() {
  var size = document.getElementById('size').value;
  var site = document.getElementById('site').value;
  chrome.storage.sync.set({
    preferredSize: size,
	preferredSite: site
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    preferredSize: 'M',
	preferredSite: 'us.blackmilkclothing.com',
	storedItemLinks: []
  }, function(items) {
    document.getElementById('size').value = items.preferredSize;
	document.getElementById('site').value = items.preferredSite;
	$.each(items.storedItemLinks, function(index,link){
			$('#item-urls').append('<A HREF="' + link + '">' + link + '<br>')
		})
	});
}
document.addEventListener('DOMContentLoaded', restore_options);
$( function() {document.getElementById('save').addEventListener('click',save_options)});