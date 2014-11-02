(function(document) {
  'use strict';

  document.addEventListener('polymer-ready', function() {
    // Perform some behaviour
    console.log('Polymer is ready to rock!');
  });

// wrap document so it plays nice with other libraries
// http://www.polymer-project.org/platform/shadow-dom.html#wrappers
})(wrap(document));


/**
 * Clears and creates new events for the current calendar day.
 *
 * This method exists in the global namespace for the debugging purposes
 * by the awesome FB FED team (#notsuckingup).
 *
 * Sample event array structure:
 * [{start: 30, end: 150}, {start: 540, end: 600}, {start: 560, end: 620}, {start: 610, end: 670}];
 * @param Array events
 */
function layOutDay(events) {
  console.log('Loading new calendar events', events);
}
