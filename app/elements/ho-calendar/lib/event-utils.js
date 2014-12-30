(function (scope) {
  'use strict';

  var EventUtils = {

    /**
     * Tests if two events intersect each other in time. An event intersects
     * if they overlap either their start or end times.
     *
     * @method intersects
     * @param {Event} event1 Object with `start` and `end` that represent an event time
     * @param {Event} event2 Object with `start` and `end` that represent an event time
     * @return {Boolean} True if events intersect each other
     */
    intersects: function (event1, event2) {
      var intersect = function(a, b) {
        return (
          a.end > b.start && a.end < b.end ||
          a.start > b.start && a.start < b.end ||
          a.start === b.start && a.end === b.end
        );
      };

      return intersect(event1, event2) || intersect(event2, event1);
    },

    /**
     * Convenient utility method that tests if a given event in an array intersects
     * with at least another previous event. Method returns True as soon as the first
     * intersection is returned.
     *
     * @method intersectsWithPreviousEvent
     * @param {Array} eventsArray Array of event objects
     * @param {Number} currentIndex Index of the current event that is being inspected for interception
     * @return {Boolean} True if current event being inspected intersects with any previous event
     */
    intersectsWithPreviousEvent: function(eventsArray, currentIndex) {
      var currentEvent = eventsArray[currentIndex],
        previousEvents = eventsArray.slice(0, currentIndex);

      return previousEvents.reverse().some(function(previousEvent){
        return EventUtils.intersects(currentEvent, previousEvent);
      });
    },

    /**
     * Sorts an array of events by start and then end time.
     *
     * @method sort
     * @param {Array} events Array of event objects
     */
    sort: function (events) {
      return events.sort(function (event1, event2) {
        if (event1.start > event2.start) {
          return 1;
        }

        if (event1.start < event2.start) {
          return -1;
        }

        if (event1.end > event2.end) {
          return 1;
        }

        if (event1.end < event2.end) {
          return -1;
        }

        return 0;
      });
    }

  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = EventUtils;
  } else {
    scope.EventUtils = EventUtils;
  }

})(this);
