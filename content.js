let listenerAdded = false;

let listener2 = function(msg, sender, callback) {
  if (msg.event === 'getState') {
    const isPaused = jQuery('#player-controls--play-toggle').attr('class') === 'play-pause-toggle player-control play';
    return callback({ paused: isPaused });
  }

  if (msg.event === 'continueVideo') {
    jQuery('#playerManualOverlay').remove();
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

    const minutes = parseInt(time[0]);
    const secondsRelative = parseInt(time[1]);

    const secondsTotal = minutes * 60 + secondsRelative;

    console.log(`Relative time is ${secondsTotal}`);

    jQuery.post('http://10.100.126.230:3000/products', {
      assetId: 1337,
      vendor: 'maxdome',
      keyframe: 2848,
      image: msg.base64Image
    }, (results) => {
      console.log(results);
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


