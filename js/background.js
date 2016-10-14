chrome.runtime.onInstalled.addListener(function(details){
	if(details.reason == "install"){
    	var key="prefSite";
  		var obj = {};
 		obj[key] = 'https://google.com/search?q=site:qualtrics.com/support '; //this searches qualtrics support pages. this is the default search site.
 		chrome.storage.sync.set(obj, function() { //preferred site stored in chrome sync storage
    		console.log('Initialized');
})}});

function resetDefaultSuggestion() {
  chrome.omnibox.setDefaultSuggestion({
    description: 'Search for: %s'
  });
}

resetDefaultSuggestion();

chrome.omnibox.onInputCancelled.addListener(function() {
  resetDefaultSuggestion();
});
//the chrome OmniBox API only supports 1 keyword. to toggle multiple sites
//we can parse the entered text and look for secondary keywords. In the example
//below, 'link ' is a secondary keyword. if we find the string 'link '
//at the beginning of the entered text (immediately after ;q)
//then we can search a different site
chrome.omnibox.onInputEntered.addListener(function(text) {
    chrome.storage.sync.get('prefSite', function (obj) {
      console.log(obj);
      if (text.indexOf('link ')==0){ //this is a secondary keyword, allows you to search other sites. To add more secondary keywords, copy this if statement and add other keywords/site pairs
        var linkURL='https://www.linkedin.com/vsearch/f?type=all&keywords=' + text.substring(5, (text.length)); //typing ';q link search_query searches linkedin for a search query'
        chrome.tabs.create({url: linkURL });
      }
      else { //if no secondary keyword is selected, search whatever prefSite is
          var searchURL = obj.prefSite + text;
          chrome.tabs.create({url: searchURL });   
      }
    }); 
});

