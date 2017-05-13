chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    console.log(tabs[0].id, '!!!');
    chrome.tabs.sendMessage(tabs[0].id, { data: 'test' }, function(response) {
      console.log('success', response);
    });
  });
});