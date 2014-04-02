function save_options() {
  var size = document.getElementById('size').value;
  chrome.storage.sync.set({
    preferredSize: size
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
    preferredSize: 'M'
  }, function(items) {
    document.getElementById('size').value = items.preferredSize;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
$( function() {document.getElementById('save').addEventListener('click',save_options)});