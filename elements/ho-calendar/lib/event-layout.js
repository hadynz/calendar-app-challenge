/* global EventUtils, CollisionGroup */
(function (scope) {
  'use strict';

  function EventLayout(rawEvents) {
    this.collisionGroups = [];
    this.processedEvents = [];
    this.rawEvents = EventUtils.sort(rawEvents);

    this._generateCollisionGroups();
    this._calculateEventLayouts();
  }

  EventLayout.prototype = {

    /**
     * Loops through all raw events that need to be laid out and groups raw events
     * that intersect each other in terms of timing into collections of `CollisionGroup` objects
     *
     * @method _generateCollisionGroups
     * @private
     */
    _generateCollisionGroups: function() {
      var me = this,
        cg;

      this.rawEvents.forEach(function(rawEvent, index, array) {
        var intersects = EventUtils.intersectsWithPreviousEvent(array, index);

        if (!intersects) {
          cg = new CollisionGroup();
          me.collisionGroups.push(cg);
        }

        cg.add(rawEvent);
      });
    },

    /**
     * Calculates the layout of events in every `CollisionGroup` and then flattens
     * all events into a single collection that is used by the UI for rendering
     *
     * @method _calculateEventLayouts
     * @private
     */
    _calculateEventLayouts: function() {
      var me = this;

      this.collisionGroups.forEach(function(cg){
        var events = cg.process();
        events.forEach(function(e){ me.processedEvents.push(e); });
      });
    },

    events: function() {
      return this.processedEvents;
    }

  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = EventLayout;
  } else {
    scope.EventLayout = EventLayout;
  }

})(this);
