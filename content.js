let listenerAdded = false;

let listener2 = function(msg, sender, callback) {
  if (msg.event === 'clickInital') {
    console.log('called at ' + Date.now(), msg, sender);
    jQuery('#player-controls--play-toggle').click();

    jQuery('#player-controls--back-button').toggle();
    jQuery('#player-controls--display-details').toggle();
    jQuery('#player-controls--settings-control').toggle();
    jQuery('#player-controls-playback-controls').toggle();
    // jQuery('head').append('<link rel="stylesheet" type="text/css" href="https://raw.githubusercontent.com/7hack-vod-commerce/chrome-plugin/master/css/viewfainder.css">');


    jQuery('#playerManualOverlay').remove();

    // const arr = [1, 2, 3];
    // const divs = arr.map(a => '<div style="z-index: 100000 !important; height: 300px">' + a + '<div>');
    // let div = '<div style="z-index: 100000 !important; height: 300px">called at' + divs + '<div>';
    // jQuery('#playerControls').append(msg.template);

    var e = jQuery(msg.template);
    jQuery('#playerControls')
      .append(e);


    e.attr('id', 'playerManualOverlay');


    callback({ data: 'ok', success: true });
  }
};

if (!listenerAdded) {
  console.log('adding listener');
  chrome.runtime.onMessage.addListener(listener2);
  listenerAdded = true;
}


