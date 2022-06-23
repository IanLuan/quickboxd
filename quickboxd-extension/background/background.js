chrome.webNavigation.onHistoryStateUpdated.addListener(details => {
  tabId = details.tabId;
  currentUrl = details.url;

  const parsedUrl = new URL(details.url);
  
  if(details.url && details.url.indexOf("/watch/") > -1) {
    chrome.tabs.sendMessage(tabId, { type: 'watch-page'});
  }

}, {url: [{urlMatches : 'https://www.netflix.com/'}]});