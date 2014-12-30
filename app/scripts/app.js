/* exported layOutDay */

/**
 * Clears and creates new events for the current calendar day.
 *
 * This method exists in the global namespace for debugging purposes by coding challenge team.
 *
 * Sample event array structure:
 * [{start: 30, end: 150}, {start: 540, end: 600}, {start: 560, end: 620}, {start: 610, end: 670}];
 * @param Array events
 */
function layOutDay(events) {
  'use strict';

  var calendar = document.querySelector('ho-calendar');
  calendar.layoutEvents(events);
}
