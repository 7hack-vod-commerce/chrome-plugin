let listenerAdded = false;

let listener2 = function(msg, sender, callback) {
  if (msg.event === 'getState') {
    const isPaused = jQuery('#player-controls--play-toggle').attr('class') === 'play-pause-toggle player-control play';
    return callback({ paused: isPaused });
  }

  if (msg.event === 'continueVideo') {
    jQuery('#playerManualOverlay').remove();
    jQuery('#playerLoader').remove();
    jQuery('#player-controls--back-button').show();
    jQuery('#player-controls--display-details').show();
    jQuery('#player-controls--settings-control').show();
    jQuery('#player-controls-playback-controls').show();
    jQuery('#player-controls--play-toggle').click();
    return callback({ status: 'ok' });
  }

  if (msg.event === 'clearView') {
    jQuery('#playerManualOverlay').remove();
    jQuery('#player-controls--back-button').hide();
    jQuery('#player-controls--display-details').hide();
    jQuery('#player-controls--settings-control').hide();
    jQuery('#player-controls-playback-controls').hide();
    jQuery('#player-controls--play-toggle').click();
    return callback({ status: 'ok' });
  }

  if (msg.event === 'showViewFainderOverlay') {
    jQuery('#player-controls--back-button').hide();
    jQuery('#player-controls--display-details').hide();
    jQuery('#player-controls--settings-control').hide();
    jQuery('#player-controls-playback-controls').hide();

    const time = jQuery('.progress-timer-current').first().html().split(':');

    let hoursRelative = 0;

    const minutes = time.length === 2 ? parseInt(time[0]) : parseInt(time[1]);
    const secondsRelative = time.length === 2 ? parseInt(time[1]) : parseInt(time[2]);

    if (time.length === 3) {
      hoursRelative = parseInt(time[0])
    }

    const secondsTotal = hoursRelative * 3600 + minutes * 60 + secondsRelative;

    console.log(`Relative time is ${secondsTotal}`);
    console.log(msg.loader);

    const loaderTemplate = jQuery(msg.loader);
    jQuery('#playerControls').append(loaderTemplate);
    loaderTemplate.attr('id', 'playerLoader');

    let postBody = {
      assetId: 1337,
      vendor: 'maxdome',
      keyframe: secondsTotal,
      image: msg.base64Image
    };

    console.log(postBody);

    // setTimeout(() => {
    //   jQuery('#playerLoader').remove();
    //   const template = jQuery(msg.template);
    //   jQuery('#playerControls').append(template);
    //   template.attr('id', 'playerManualOverlay');
    //   return callback({ status: 'ok' });
    // }, 2000);

    // let productAPI = 'http://viewfainder.herokuapp.com/products';
    // let productAPI = 'http://10.100.126.230:3000/productsmock';
    let productAPI = 'http://localhost:3000/products';

    jQuery.post(productAPI, postBody, (results) => {
        console.log('retrieved post result');
        console.log(results);
        jQuery('#playerLoader').remove();
        const template = jQuery(msg.template);

        results.forEach((result, idx) => {

          const domId = idx + 1;
          if (result && domId < 5) {
            template.find(`#prod${domId}category`).text(result.category);
            template.find(`#prod${domId}title`).text(result.detail);
            template.find(`#prod${domId}company`).text(result.brand);
            template.find(`#prod${domId}img`).attr('src', result.image);
            template.find(`#prodbox${domId}`).wrap(`<a href="${result.url}" target="_blank"></a>`);
          }
        });

        jQuery('#playerControls').append(template);
        template.attr('id', 'playerManualOverlay');
        return callback({ status: 'ok' });
      });

  }
};

if (!listenerAdded) {
  console.log('adding listener');
  chrome.runtime.onMessage.addListener(listener2);
  listenerAdded = true;
}


