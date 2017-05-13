chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.executeScript(null, { file: "content.js" }, () => {
      chrome.tabs.executeScript(null, { file: "libs/jquery-3.2.1.min.js" }, () => {
        jQuery.get(chrome.extension.getURL('html/overlay01.html'), (htmlTemplate) => {

          chrome.tabs.sendMessage(tabs[0].id, {
            event: 'getState'
          }, (response) => {
            if (response.paused === true) {
              chrome.tabs.sendMessage(tabs[0].id, {
                event: 'continueVideo'
              }, (response) => {
                console.log(response.status === 'ok' ? 'continued video' : 'error');
              });
            } else {
              chrome.tabs.sendMessage(tabs[0].id, {
                event: 'clearView'
              }, (response) => {
                if (response.status === 'ok') {
                  chrome.tabs.captureVisibleTab(function(imageBinary) {
                    // jQuery.post(
                    //   "http://10.100.126.230:3000/images",
                    //   {
                    //     base64Image: imageBinary
                    //   },
                    //   function(data) {
                    //     // console.log('took screenshot', data.url);
                    //     chrome.tabs.sendMessage(tabs[0].id, {
                    //       event: 'showViewFainderOverlay',
                    //       template: htmlTemplate
                    //     }, (response2) => {
                    //       console.log('fAInder overlay added');
                    //
                    //     });
                    //   });
                    // console.log('took screenshot', data.url);
                    chrome.tabs.sendMessage(tabs[0].id, {
                      event: 'showViewFainderOverlay',
                      template: htmlTemplate
                    }, (response2) => {
                      console.log('fAInder overlay added');

                    });
                  });
                }
              });
            }
          });
        });
      });
    });
  });
});