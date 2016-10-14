// Saves options to chrome.storage
function save_options() {
  var url = document.getElementById('url').value;
  var key="prefSite";
  var obj = {};
  obj[key] = url;
  //this looks like
  //Object {
  //  'prefSite': url
  //}
  // var key = prefSite;
  chrome.storage.sync.set(obj, function() {
    console.log('Saved ', key, url);
  });
}

document.getElementById('url').addEventListener('change',
    save_options);