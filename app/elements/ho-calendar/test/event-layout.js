/* global chai, describe, it, EventLayout */
'use strict';

var assert = chai.assert;

describe('EventLayout', function () {

  describe('groupCollisions', function () {

    var collisionGroupCount = function(cg) {
      return cg.count();
    };

    it('should return three collision groups for events [9-10am, 10-11am, 2-3pm]', function () {
      var events = [
        {id: 'event1', start: 0, end: 60},
        {id: 'event2', start: 60, end: 120},
        {id: 'event3', start: 300, end: 360}
      ];

      var eventLayout = new EventLayout(events);
      assert.equal(3, eventLayout.collisionGroups.length);
      assert.deepEqual([1, 1, 1], eventLayout.collisionGroups.map(collisionGroupCount));
    });

    it('should return two collision groups for events [9-10am, 9:30-10am, 2-3pm]', function () {
      var events = [
        {id: 'event1', start: 0, end: 60},
        {id: 'event2', start: 30, end: 60},
        {id: 'event3', start: 300, end: 360}
      ];

      var eventLayout = new EventLayout(events);
      assert.equal(2, eventLayout.collisionGroups.length);
      assert.deepEqual([2, 1], eventLayout.collisionGroups.map(collisionGroupCount));
    });

    it('should return one collision groups for events [9-10am, 9:30-11am, 10-2pm, 1-2pm]', function () {
      var events = [
        {id: 'event1', start: 0, end: 60},
        {id: 'event2', start: 30, end: 120},
        {id: 'event3', start: 60, end: 300},
        {id: 'event4', start: 240, end: 300}
      ];

      var eventLayout = new EventLayout(events);
      assert.equal(1, eventLayout.collisionGroups.length);
      assert.deepEqual([4], eventLayout.collisionGroups.map(collisionGroupCount));
    });

    it('should return one collision groups for events depicted in Scenario C4', function () {
      var events = [
        {id: 'event1', start: 0, end: 240},
        {id: 'event2', start: 60, end: 300},
        {id: 'event3', start: 120, end: 360},
        {id: 'event4', start: 120, end: 360},
        {id: 'event5', start: 240, end: 300},
        {id: 'event6', start: 300, end: 360},
        {id: 'event7', start: 300, end: 420}
      ];

      var eventLayout = new EventLayout(events);
      assert.equal(1, eventLayout.collisionGroups.length);
      assert.deepEqual([7], eventLayout.collisionGroups.map(collisionGroupCount));
    });

  });

  describe('events', function () {

    var actualObject = function(event) {
      return {id: event.id, columnOffset: event.columnOffset, columns: event.columns};
    };

    it('should process the layout of unordered events in this end-to-end test for Scenario B2 + 4-5pm', function () {
      var events = [
          {id: 'event5', start: 300, end: 360},
          {id: 'event1', start: 0, end: 180},
          {id: 'event3', start: 240, end: 360},
          {id: 'event4', start: 240, end: 360},
          {id: 'event2', start: 60, end: 300},
          {id: 'event6', start: 420, end: 480}
        ],
        expected = [
          {id: 'event1', columnOffset: 0, columns: 3},
          {id: 'event2', columnOffset: 1, columns: 3},
          {id: 'event3', columnOffset: 0, columns: 3},
          {id: 'event4', columnOffset: 2, columns: 3},
          {id: 'event5', columnOffset: 1, columns: 3},
          {id: 'event6', columnOffset: 0, columns: 1}
        ];

      var eventLayout = new EventLayout(events),
        processedEvents = eventLayout.events(),
        actual = processedEvents.map(actualObject);

      assert.equal(events.length, processedEvents.length);
      assert.deepEqual(actual, expected);
    });

  });
});
