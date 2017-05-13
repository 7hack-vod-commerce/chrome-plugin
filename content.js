let listenerAdded = false;

let listener2 = function(msg, sender, callback) {
  if(msg.event === 'getState') {
    const isPaused = jQuery('#player-controls--play-toggle').attr('class') === 'play-pause-toggle player-control play';
    return callback({ paused: isPaused });
  }

  if(msg.event === 'continueVideo') {
    jQuery('#playerManualOverlay').remove();
    jQuery('#player-controls--back-button').show();
    jQuery('#player-controls--display-details').show();
    jQuery('#player-controls--settings-control').show();
    jQuery('#player-controls-playback-controls').show();
    jQuery('#player-controls--play-toggle').click();
    return callback({ status: 'ok' });
  }

  if(msg.event === 'clearView') {
    jQuery('#playerManualOverlay').remove();
    jQuery('#player-controls--back-button').hide();
    jQuery('#player-controls--display-details').hide();
    jQuery('#player-controls--settings-control').hide();
    jQuery('#player-controls-playback-controls').hide();
    jQuery('#player-controls--play-toggle').click();
    return callback({ status: 'ok' });
  }

  if(msg.event === 'showViewFainderOverlay') {
    jQuery('#player-controls--back-button').hide();
    jQuery('#player-controls--display-details').hide();
    jQuery('#player-controls--settings-control').hide();
    jQuery('#player-controls-playback-controls').hide();

    const e = jQuery(msg.template);
    jQuery('#playerControls').append(e);

    e.attr('id', 'playerManualOverlay');
    return callback({ status: 'ok' });
  }

  if (msg.event === 'clickInitial') {
    console.log('called at ' + Date.now(), msg, sender);
    jQuery('#player-controls--play-toggle').click();

    const isPaused = jQuery('#player-controls--play-toggle').attr('class') === 'play-pause-toggle player-control play';

    if(!isPaused) {
      jQuery('#playerManualOverlay').remove();
      jQuery('#player-controls--back-button').show();
      jQuery('#player-controls--display-details').show();
      jQuery('#player-controls--settings-control').show();
      jQuery('#player-controls-playback-controls').show();
    } else {
      jQuery('#player-controls--back-button').hide();
      jQuery('#player-controls--display-details').hide();
      jQuery('#player-controls--settings-control').hide();
      jQuery('#player-controls-playback-controls').hide();

      const e = jQuery(msg.template);
      jQuery('#playerControls').append(e);

      e.attr('id', 'playerManualOverlay');
    }

    callback({ data: 'ok', success: true });
  }
};

if (!listenerAdded) {
  console.log('adding listener');
  chrome.runtime.onMessage.addListener(listener2);
  listenerAdded = true;
}


