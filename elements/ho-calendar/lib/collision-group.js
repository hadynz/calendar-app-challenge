/* global EventUtils */
(function (scope) {
  'use strict';

  /**
   * `CollisionGroup` constructor that is optionally passed in an array of
   * objects with `start` and `end` time key/value that represent an event.
   *
   * Important: If an array is passed, it is assumed that it has been
   * sorted by `start` and then `end`
   *
   * @param {Array} rawEvents [Optional] Array `start` and `end` objects
   * @constructor
   */
  function CollisionGroup(rawEvents) {
    this.events = [];

    if (Array.isArray(rawEvents)) {
      rawEvents.forEach(this.add.bind(this));
    }
  }

  CollisionGroup.prototype = {

    /**
     * Parses an object with `start` and `end` key/value that represent an event for processing
     * to an `Event` before adding it to an internal array of `Event` collection.
     *
     * It is important that event objects are sorted externally before being added to a
     * `CollisionGroup`. The latter is not responsible for sorting for performance reasons.
     *
     * @method add
     * @param {Object} rawEvent Object with `start` and `end`  key/values
     */
    add: function (rawEvent) {
      this.events.push(new Event(rawEvent));
    },

    /**
     * Returns the number of events that have been added to the `CollisionGroup`. This method
     * is exposed predominantly to aid in unit testing
     *
     * @method count
     * @return {Number} Number of events that exist in `CollisionGroup`
     */
    count: function () {
      return this.events.length;
    },

    /**
     * Calculates the column offset for each event in the collision group and keeps track of
     * the number of columns required to be used to lay out the events in the collision group.
     *
     * @method process
     * @return {Array} Collection of parsed and calculated `Event` objects
     */
    process: function () {
      var me = this,
        maxCol = 0,
        eventsInColumn = function(columnOffset) {
          return function(event) {
            return event.columnOffset === columnOffset;
          };
        },
        isIntersecting = function(event1) {
          return function(event2) {
            return EventUtils.intersects(event1, event2);
          };
        },
        setColumnsValue = function(columns) {
          return function(event) {
            event.columns = columns;
          };
        };

      this.events.forEach(function(currentEvent, index, array){

        // List of events that occur prior to current event
        var previousEvents = array.slice(0, index);

        // Try and find the earliest previous event that current event does not clash with to sets its column location
        for (var i = 0; i < previousEvents.length; i++) {
          var prevEvent = previousEvents[i],
            intersects = EventUtils.intersects(currentEvent, prevEvent),
            currentOrGreaterColumn = prevEvent.columnOffset >= currentEvent.columnOffset;

          // If current event intersects with previous event, position current event to the next column of previous event
          if (intersects && currentOrGreaterColumn) {
            currentEvent.columnOffset = prevEvent.columnOffset + 1;
          }

          // If the current event does not clash with any event in the previous event's column,
          // then set current events location to current previous event column
          else if(currentOrGreaterColumn) {
            var adjacentEventsToPreviousEvent = previousEvents.filter(eventsInColumn(prevEvent.columnOffset)),
              intersectsWithPreviousEventColumn = adjacentEventsToPreviousEvent.some(isIntersecting(currentEvent));

            // Event does not intersect with any other event in this column, we can use it!
            // If it does, then bugger! Column no good, let's continue finding another one
            if (!intersectsWithPreviousEventColumn) {
              currentEvent.columnOffset = prevEvent.columnOffset;
              break;
            }
          }
        }

        // Keep track of the number of columns being used
        maxCol = Math.max(maxCol, currentEvent.columnOffset + 1);
      });

      this.events.forEach(setColumnsValue(maxCol));

      return me.events;
    }
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = CollisionGroup;
  } else {
    scope.CollisionGroup = CollisionGroup;
  }

})(this);
