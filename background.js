chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    console.log(tabs[0].id, '!!!sdfsfsdf');
    chrome.tabs.executeScript(null, { file: "content.js" }, () => {
      chrome.tabs.executeScript(null, { file: "libs/jquery-3.2.1.min.js" }, () => {

        var xhr = new XMLHttpRequest();
        xhr.open('GET', chrome.extension.getURL('html/overlay01.html'), true);
        xhr.onreadystatechange = function() {
          if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
            const div = xhr.responseText;
            chrome.tabs.sendMessage(tabs[0].id, { data: 'test', event: 'clickInital', template: div }, function(response) {
              chrome.tabs.captureVisibleTab(function(imageBinary) {
              });
              console.log('success', response);
            });
          }
        };
        xhr.send();

      });
    });
  });
});